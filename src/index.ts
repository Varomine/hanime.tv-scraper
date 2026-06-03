import { getSignature } from "./signature";
import { docsHtml } from "./docs";

// Global cache for search index to avoid hitting cached.freeanimehentai.net on every request
let cachedIndex: any[] | null = null;
let cacheTime = 0;
let activeFetchPromise: Promise<any[]> | null = null;

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

  const searchUrl = "https://cached.freeanimehentai.net/api/v10/search_hvs";
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
    // 1. Fetch the Hanime.tv video metadata API directly
    const apiUrl = `https://hanime.tv/api/v8/video?id=${slug}`;
    const apiRes = await fetch(apiUrl, {
      headers: {
        "User-Agent": browserUserAgent,
        "Accept": "application/json",
      },
    });

    if (!apiRes.ok) {
      return jsonResponse({ error: `Failed to fetch video metadata from Hanime.tv API. Status: ${apiRes.status}` }, apiRes.status);
    }

    const apiData: any = await apiRes.json();
    const hentaiVideo = apiData.hentai_video;
    if (!hentaiVideo) {
      return jsonResponse({ error: "Invalid video metadata API response structure" }, 500);
    }

    const videoId = hentaiVideo.id;

    // 4. Generate signatures using Emscripten WASM runtime
    let sigs: { ssignature: string; stime: number };
    try {
      sigs = await getSignature(fetch);
    } catch (e: any) {
      return jsonResponse({ error: `Failed to compile/generate signature credentials: ${e.message}` }, 500);
    }

    // 5. Query Hanime manifest using the generated signatures
    const manifestUrl = `https://h.freeanimehentai.net/api/v8/guest/videos/${videoId}/manifest`;
    const manifestRes = await fetch(manifestUrl, {
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

    if (!manifestRes.ok) {
      return jsonResponse({ error: `Failed to fetch streaming manifest from CDN. Status: ${manifestRes.status}` }, 500);
    }

    const manifestData: any = await manifestRes.json();
    console.log("manifestData:", JSON.stringify(manifestData));

    // 6. Format streaming qualities and server manifests
    const streamsList: any[] = [];
    const servers = manifestData?.videos_manifest?.servers || [];
    
    for (const server of servers) {
      const serverName = server.name || "Unknown";
      for (const stream of server.streams || []) {
        if (stream.url) {
          streamsList.push({
            server: serverName,
            width: stream.width,
            height: stream.height,
            quality: `${stream.height}p`,
            size_mb: stream.filesize_mbs,
            ext: stream.extension || "m3u8",
            url: "https://famous-robinet-kurumi07-041dddc5.koyeb.app/proxy?url="+stream.url,
          });
        }
      }
    }

    // Clean up description text (remove HTML elements)
    const rawDesc = hentaiVideo.description || "";
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // Map franchise info
    const franchise = apiData.hentai_franchise || {};
    const franchiseVideos = apiData.hentai_franchise_hentai_videos || [];

    // Compile everything to response JSON
    return jsonResponse({
      success: true,
      video: {
        id: hentaiVideo.id,
        name: hentaiVideo.name,
        slug: hentaiVideo.slug,
        description: cleanDesc,
        brand: hentaiVideo.brand,
        views: hentaiVideo.views,
        likes: hentaiVideo.likes,
        dislikes: hentaiVideo.dislikes,
        downloads: hentaiVideo.downloads,
        monthly_rank: hentaiVideo.monthly_rank,
        released_at: hentaiVideo.released_at,
        created_at: hentaiVideo.created_at,
        poster_url: hentaiVideo.poster_url,
        cover_url: hentaiVideo.cover_url,
        tags: (hentaiVideo.hentai_tags || []).map((t: any) => t.text),
      },
      franchise: {
        id: franchise.id || null,
        title: franchise.title || null,
        slug: franchise.slug || null,
        videos: franchiseVideos.map((v: any) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          poster_url: v.poster_url,
        })),
      },
      streams: streamsList,
      debug: {
        x_signature: sigs.ssignature,
        x_time: sigs.stime,
      }
    });

  } catch (err: any) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}

// Handler for Landing Page lists
async function handleLandingRequest(): Promise<Response> {
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  
  try {
    const landingRes = await fetch("https://hanime.tv/api/v8/landing", {
      headers: {
        "Accept": "application/json",
        "Origin": "https://hanime.tv",
        "Referer": "https://hanime.tv/",
        "User-Agent": browserUserAgent,
      },
    });

    if (!landingRes.ok) {
      return jsonResponse({ error: `Failed to retrieve landing lists. Status: ${landingRes.status}` }, 500);
    }

    const landingData: any = await landingRes.json();
    const sections = landingData.sections || [];
    const responseSections: any[] = [];

    for (const section of sections) {
      const sectionVideos = section.hentai_videos || [];
      responseSections.push({
        title: section.title,
        videos: sectionVideos.map((v: any) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          brand: v.brand,
          views: v.views,
          likes: v.likes,
          poster_url: v.poster_url,
          cover_url: v.cover_url,
        })),
      });
    }

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


