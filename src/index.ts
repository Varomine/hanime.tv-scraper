import { getSignature } from "./signature";
import { docsHtml } from "./docs";

// Global cache for search index to avoid hitting cached.freeanimehentai.net on every request
let cachedIndex: any[] | null = null;
let cacheTime = 0;
let activeFetchPromise: Promise<any[]> | null = null;

// --- Cryptography Helpers for secure handshake ---
const handshakeSecret = "htv-insecure-handshake-v1";
const aadSecret = "htv-insecure-v1";

function base64urlDecode(str: string): Uint8Array {
  let n = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(str.length / 4) * 4, "=");
  let binary = atob(n);
  let bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function base64urlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function getCryptoKey(usages: KeyUsage[]): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(handshakeSecret);
  const hash = await crypto.subtle.digest("SHA-256", keyBytes);
  return await crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, usages);
}

async function encryptPayload(payload: any): Promise<string> {
  const encoder = new TextEncoder();
  const plaintext = typeof payload === "string" ? payload : JSON.stringify(payload);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getCryptoKey(["encrypt"]);
  
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv, additionalData: encoder.encode(aadSecret), tagLength: 128 },
    key,
    encoder.encode(plaintext)
  );
  
  const totalBytes = new Uint8Array(encrypted);
  const ciphertext = totalBytes.slice(0, -16);
  const tag = totalBytes.slice(-16);
  
  const envelope = {
    v: 1,
    alg: "AES-256-GCM",
    iv: base64urlEncode(iv),
    tag: base64urlEncode(tag),
    data: base64urlEncode(ciphertext)
  };
  
  return base64urlEncode(encoder.encode(JSON.stringify(envelope)));
}

async function decryptToken(token: string): Promise<string> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const envelopeBytes = base64urlDecode(token);
  const envelopeStr = decoder.decode(envelopeBytes);
  const envelope = JSON.parse(envelopeStr);
  
  const key = await getCryptoKey(["decrypt"]);
  const iv = base64urlDecode(envelope.iv);
  const tag = base64urlDecode(envelope.tag);
  const ciphertext = base64urlDecode(envelope.data);
  
  // Reconstruct ciphertext + tag
  const total = new Uint8Array(ciphertext.length + tag.length);
  total.set(ciphertext, 0);
  total.set(tag, ciphertext.length);
  
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv, additionalData: encoder.encode(aadSecret), tagLength: 128 },
    key,
    total
  );
  
  return decoder.decode(decrypted);
}

async function fetchSearchIndex(fetchFn: typeof fetch): Promise<any[]> {
  const now = Date.now();
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  
  // Generate signatures using WASM environment
  let sigs: { ssignature: string; stime: number };
  try {
    sigs = await getSignature(fetchFn);
  } catch (e: any) {
    if (cachedIndex) {
      console.warn("Signature generation failed, falling back to expired search index cache:", e);
      return cachedIndex;
    }
    throw new Error(`Failed to generate signature credentials for search index: ${e.message}`);
  }

    const searchUrl = "https://guest.freeanimehentai.net/api/v11/search_hvs";
    const searchRes = await fetchFn(searchUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Origin": "https://hanime.tv",
        "Referer": "https://hanime.tv/",
        "X-Signature": sigs.ssignature,
        "X-Time": String(sigs.stime),
        "X-Signature-Version": "web2",
        "User-Agent": browserUserAgent,
      },
    });

  if (!searchRes.ok) {
    if (cachedIndex) {
      console.warn(`Fetch search index failed with status ${searchRes.status}, falling back to expired cache`);
      return cachedIndex;
    }
    throw new Error(`Failed to fetch search index from CDN. Status: ${searchRes.status}`);
  }

  const searchData: any = await searchRes.json();
  const allVideos = Object.values(searchData);
  cachedIndex = allVideos;
  cacheTime = now;
  return allVideos;
}

async function getSearchIndex(fetchFn: typeof fetch): Promise<any[]> {
  const now = Date.now();
  // Cache search index for 1 hour
  if (cachedIndex && (now - cacheTime < 3600000)) {
    return cachedIndex;
  }
  if (activeFetchPromise) {
    return activeFetchPromise;
  }
  activeFetchPromise = fetchSearchIndex(fetchFn).finally(() => {
    activeFetchPromise = null;
  });
  return activeFetchPromise;
}

// Helper to return CORS headers
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Signature, X-Time, X-Signature-Version",
    "Access-Control-Max-Age": "86400",
  };
}

// Helper to construct JSON responses
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}

// Router interface
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;

    // Handle OPTIONS preflight requests
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    // Serve HTML Documentation Dashboard at root
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(docsHtml, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...corsHeaders(),
        },
      });
    }



    // Route: GET /api/video/:slug
    if (url.pathname.startsWith("/api/video/")) {
      const slug = url.pathname.substring("/api/video/".length).trim();
      if (!slug) {
        return jsonResponse({ error: "Missing video slug parameter" }, 400);
      }
      return handleVideoRequest(slug);
    }

    // Route: GET /api/landing
    if (url.pathname === "/api/landing") {
      return handleLandingRequest();
    }

    // Route: GET /api/search
    if (url.pathname === "/api/search") {
      const query = url.searchParams.get("q") || "";
      const pageStr = url.searchParams.get("page") || "0";
      const page = parseInt(pageStr, 10) || 0;
      
      if (!query) {
        return jsonResponse({ error: "Missing search query parameter 'q'" }, 400);
      }
      return handleSearchRequest(query, page);
    }

    // Default 404
    return jsonResponse({ error: "Route not found" }, 404);
  },
};

// Handler for Video request
async function handleVideoRequest(slug: string): Promise<Response> {
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  
  try {
    // 1. Get search index to lookup video metadata
    const allVideos = await getSearchIndex(fetch);
    const videoEntry = allVideos.find((v: any) => v.slug === slug);
    if (!videoEntry) {
      return jsonResponse({ error: `Video with slug "${slug}" not found` }, 404);
    }

    // 2. Generate signatures using WASM environment
    let sigs: { ssignature: string; stime: number };
    try {
      sigs = await getSignature(fetch);
    } catch (e: any) {
      return jsonResponse({ error: `Failed to compile/generate signature credentials: ${e.message}` }, 500);
    }

    // 3. Fetch CSRF token from ct.hanime.tv
    const csrfRes = await fetch("https://ct.hanime.tv/csrf-token", {
      headers: {
        "Accept": "application/json",
        "Origin": "https://hanime.tv",
        "Referer": "https://hanime.tv/",
        "X-Signature": sigs.ssignature,
        "X-Time": String(sigs.stime),
        "X-Signature-Version": "web2",
        "User-Agent": browserUserAgent,
      },
    });

    if (!csrfRes.ok) {
      return jsonResponse({ error: `Failed to fetch CSRF token. Status: ${csrfRes.status}` }, 500);
    }

    const csrfData: any = await csrfRes.json();
    const csrf = csrfData.csrf_token;

    // Parse htv_csrf_proof cookie from Set-Cookie header
    const setCookie = csrfRes.headers.get("set-cookie") || "";
    const cookieMatch = setCookie.match(/htv_csrf_proof=[^;]+/);
    const cookie = cookieMatch ? cookieMatch[0] : "";

    // 4. Encrypt the handshake payload
    const payload = {
      timestamp_unix: Math.floor(Date.now() / 1000),
      directive: "htv_player_handshake",
      slug: slug,
    };
    const encryptedToken = await encryptPayload(payload);

    // 5. Send POST request to handshake on auth.hanime.tv
    const handshakeRes = await fetch("https://auth.hanime.tv/api/v11/handshake", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Origin": "https://hanime.tv",
        "Referer": "https://hanime.tv/",
        "X-Signature": sigs.ssignature,
        "X-Time": String(sigs.stime),
        "X-Signature-Version": "web2",
        "X-CSRF-Token": csrf,
        ...(cookie ? { "Cookie": cookie } : {}),
        "User-Agent": browserUserAgent,
      },
      body: JSON.stringify({ token: encryptedToken }),
    });

    if (!handshakeRes.ok) {
      return jsonResponse({ error: `Handshake failed with status: ${handshakeRes.status}` }, 500);
    }

    const xToken = handshakeRes.headers.get("x-token");
    if (!xToken) {
      return jsonResponse({ error: "Handshake response missing x-token header" }, 500);
    }

    // 6. Decrypt the streaming sources
    const decrypted = await decryptToken(xToken);
    const parsedSources = JSON.parse(decrypted);

    const streamsList: any[] = [];
    for (const source of parsedSources.sources || []) {
      if (source.src && source.kind === "normal") {
        streamsList.push({
          server: "Highwinds",
          width: source.width || 0,
          height: source.height || 0,
          quality: source.label || `${source.height}p`,
          size_mb: 0,
          ext: "m3u8",
          url: `https://streamrelay.sapis.workers.dev/proxy?url=${encodeURIComponent(
            source.src.startsWith("http") ? source.src : `https://hanime.tv${source.src}`
          )}`,
        });
      }
    }

    // Clean up description text (remove HTML elements)
    const rawDesc = videoEntry.description || "";
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // Map franchise info using same brand videos from our index
    const brandName = videoEntry.brand;
    const franchiseVideos = brandName
      ? allVideos.filter((v: any) => v.brand === brandName && v.id !== videoEntry.id)
      : [];

    // Compile everything to response JSON
    return jsonResponse({
      success: true,
      video: {
        id: videoEntry.id,
        name: videoEntry.name,
        slug: videoEntry.slug,
        description: cleanDesc,
        brand: videoEntry.brand,
        views: videoEntry.views || 0,
        likes: videoEntry.likes || 0,
        dislikes: videoEntry.dislikes || 0,
        downloads: videoEntry.downloads || 0,
        monthly_rank: videoEntry.monthly_rank || 0,
        released_at: videoEntry.released_at || "",
        created_at: videoEntry.created_at || "",
        poster_url: videoEntry.poster_url || "",
        cover_url: videoEntry.cover_url || "",
        tags: videoEntry.tags || [],
      },
      franchise: {
        id: null,
        title: brandName || null,
        slug: brandName ? brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-") : null,
        videos: franchiseVideos.slice(0, 10).map((v: any) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          poster_url: v.poster_url,
        })),
      },
      streams: streamsList,
    });

  } catch (err: any) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}

// Handler for Landing Page lists
async function handleLandingRequest(): Promise<Response> {
  try {
    const allVideos = await getSearchIndex(fetch);

    // 1. Trending: sort by views descending
    const trendingList = [...allVideos]
      .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
      .slice(0, 24);

    // 2. New Releases: sort by released_at descending
    const newReleasesList = [...allVideos]
      .sort((a: any, b: any) => {
        const dateA = a.released_at ? new Date(a.released_at).getTime() : 0;
        const dateB = b.released_at ? new Date(b.released_at).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 24);

    // 3. Most Liked: sort by likes descending
    const mostLikedList = [...allVideos]
      .sort((a: any, b: any) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 24);

    const responseSections = [
      {
        title: "Trending",
        videos: trendingList.map((v: any) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          brand: v.brand,
          views: v.views,
          likes: v.likes,
          poster_url: v.poster_url,
          cover_url: v.cover_url,
        })),
      },
      {
        title: "New Releases",
        videos: newReleasesList.map((v: any) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          brand: v.brand,
          views: v.views,
          likes: v.likes,
          poster_url: v.poster_url,
          cover_url: v.cover_url,
        })),
      },
      {
        title: "Most Liked",
        videos: mostLikedList.map((v: any) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          brand: v.brand,
          views: v.views,
          likes: v.likes,
          poster_url: v.poster_url,
          cover_url: v.cover_url,
        })),
      },
    ];

    return jsonResponse({
      success: true,
      sections: responseSections,
    });
  } catch (err: any) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}

// Handler for Search queries
async function handleSearchRequest(query: string, page: number): Promise<Response> {
  try {
    const allVideos = await getSearchIndex(fetch);
    const queryLower = query.toLowerCase().trim();
    
    // Perform search filtering on cached metadata index
    let filtered = allVideos.filter((v: any) => {
      return (
        (v.name && v.name.toLowerCase().includes(queryLower)) ||
        (v.search_titles && v.search_titles.toLowerCase().includes(queryLower)) ||
        (v.brand && v.brand.toLowerCase().includes(queryLower)) ||
        (v.slug && v.slug.toLowerCase().includes(queryLower)) ||
        (v.tags && v.tags.some((t: string) => t.toLowerCase().includes(queryLower)))
      );
    });

    // Sort results by relevance (prefix match first) and then by views descending
    filtered.sort((a: any, b: any) => {
      const aName = (a.name || "").toLowerCase();
      const bName = (b.name || "").toLowerCase();
      const aStarts = aName.startsWith(queryLower);
      const bStarts = bName.startsWith(queryLower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return (b.views || 0) - (a.views || 0);
    });

    const hitsPerPage = 24;
    const totalHits = filtered.length;
    const nbPages = Math.ceil(totalHits / hitsPerPage);
    
    // Support 0-indexed page querying
    const startIndex = page * hitsPerPage;
    const paginatedResults = filtered.slice(startIndex, startIndex + hitsPerPage);

    return jsonResponse({
      success: true,
      page: page,
      nbPages: nbPages,
      nbHits: totalHits,
      hitsPerPage: hitsPerPage,
      results: paginatedResults.map((h: any) => ({
        id: h.id,
        name: h.name,
        slug: h.slug,
        brand: h.brand,
        views: h.views,
        likes: h.likes,
        released_at: h.released_at,
        poster_url: h.poster_url,
        cover_url: h.cover_url,
      })),
    });
  } catch (err: any) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}


