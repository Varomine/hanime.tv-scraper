import { getSignature } from "./signature";
import { docsHtml } from "./docs";

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
    // 1. Fetch the Hanime.tv webpage HTML
    const pageUrl = `https://hanime.tv/videos/hentai/${slug}`;
    const pageRes = await fetch(pageUrl, {
      headers: {
        "User-Agent": browserUserAgent,
      },
    });

    if (!pageRes.ok) {
      return jsonResponse({ error: `Failed to fetch video page from Hanime.tv. Status: ${pageRes.status}` }, 404);
    }

    const html = await pageRes.text();

    // 2. Parse Nuxt state script
    const nuxtMatch = html.match(/<script>window\.__NUXT__\s*=\s*(.*?);<\/script>/);
    if (!nuxtMatch) {
      return jsonResponse({ error: "Could not find Nuxt state metadata in the webpage" }, 500);
    }

    // 3. Evaluate Nuxt state safely in V8 context
    let nuxtData: any;
    try {
      nuxtData = parseNuxtState(nuxtMatch[1]);
    } catch (e: any) {
      return jsonResponse({ error: `Failed to evaluate Nuxt state metadata: ${e.message}` }, 500);
    }

    const stateData = nuxtData?.state?.data;
    if (!stateData || !stateData.video || !stateData.video.hentai_video) {
      return jsonResponse({ error: "Invalid video metadata state structure" }, 500);
    }

    const hentaiVideo = stateData.video.hentai_video;
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
            url: stream.url,
          });
        }
      }
    }

    // Clean up description text (remove HTML elements)
    const rawDesc = hentaiVideo.description || "";
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // Map franchise info
    const franchise = stateData.video.hentai_franchise || {};
    const franchiseVideos = stateData.video.hentai_franchise_hentai_videos || [];

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
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  
  try {
    const searchRes = await fetch("https://search.htv-services.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": browserUserAgent,
      },
      body: JSON.stringify({
        search_text: query,
        page: page,
        blacklist: [],
        brands: [],
        tags: [],
        tags_mode: "AND",
        order_by: "title_sortable",
        ordering: "asc",
      }),
    });

    if (!searchRes.ok) {
      return jsonResponse({ error: `Search request failed. Status: ${searchRes.status}` }, 500);
    }

    const searchData: any = await searchRes.json();
    const rawHits = searchData.hits || "[]";
    const hits = JSON.parse(rawHits);

    return jsonResponse({
      success: true,
      page: searchData.page,
      nbPages: searchData.nbPages,
      nbHits: searchData.nbHits,
      hitsPerPage: searchData.hitsPerPage,
      results: hits.map((h: any) => ({
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

// Custom edge-compliant JS literal parser to avoid eval / new Function
function parseJsLiteral(text: string, paramMap: Map<string, any>): any {
  let index = 0;

  function skipWhitespace() {
    while (index < text.length && /\s/.test(text[index])) {
      index++;
    }
  }

  function parseValue(): any {
    skipWhitespace();
    if (index >= text.length) throw new Error("Unexpected end of input");

    const char = text[index];

    // String
    if (char === '"') {
      return parseString();
    }

    // Object
    if (char === '{') {
      return parseObject();
    }

    // Array
    if (char === '[') {
      return parseArray();
    }

    // Number or negative sign
    if (char === '-' || (char >= '0' && char <= '9') || char === '.') {
      return parseNumber();
    }

    // True, False, Null, or Variable
    return parseIdentifier();
  }

  function parseString(): string {
    let result = "";
    index++; // skip opening double quote
    while (index < text.length) {
      const char = text[index];
      if (char === '"') {
        index++; // skip closing double quote
        return result;
      }
      if (char === '\\') {
        index++;
        const nextChar = text[index];
        if (nextChar === 'u') {
          // Unicode escape code like \u002F
          const hex = text.substring(index + 1, index + 5);
          result += String.fromCharCode(parseInt(hex, 16));
          index += 5;
        } else {
          // Standard escape sequence
          const escapeMap: Record<string, string> = {
            'n': '\n', 'r': '\r', 't': '\t', 'f': '\f', 'b': '\b', '\\': '\\', '"': '"', '/': '/'
          };
          result += escapeMap[nextChar] || nextChar;
          index++;
        }
      } else {
        result += char;
        index++;
      }
    }
    throw new Error("Unterminated string");
  }

  function parseObject(): Record<string, any> {
    const obj: Record<string, any> = {};
    index++; // skip '{'
    skipWhitespace();

    if (text[index] === '}') {
      index++;
      return obj;
    }

    while (index < text.length) {
      skipWhitespace();
      // Parse key (can be unquoted identifier, or double-quoted string)
      let key: string;
      if (text[index] === '"') {
        key = parseString();
      } else {
        // Read unquoted key identifier
        const start = index;
        while (index < text.length && /[a-zA-Z0-9_$]/.test(text[index])) {
          index++;
        }
        key = text.substring(start, index);
      }

      skipWhitespace();
      if (text[index] !== ':') {
        throw new Error(`Expected ':' after key at index ${index}, found ${text[index]}`);
      }
      index++; // skip ':'

      const val = parseValue();
      obj[key] = val;

      skipWhitespace();
      if (text[index] === '}') {
        index++;
        return obj;
      }
      if (text[index] !== ',') {
        throw new Error(`Expected ',' or '}' at index ${index}, found ${text[index]}`);
      }
      index++; // skip ','
    }
    throw new Error("Unterminated object");
  }

  function parseArray(): any[] {
    const arr: any[] = [];
    index++; // skip '['
    skipWhitespace();

    if (text[index] === ']') {
      index++;
      return arr;
    }

    while (index < text.length) {
      const val = parseValue();
      arr.push(val);

      skipWhitespace();
      if (text[index] === ']') {
        index++;
        return arr;
      }
      if (text[index] !== ',') {
        throw new Error(`Expected ',' or ']' at index ${index}`);
      }
      index++; // skip ','
    }
    throw new Error("Unterminated array");
  }

  function parseNumber(): number {
    const start = index;
    if (text[index] === '-') index++;
    while (index < text.length && /[0-9.]/.test(text[index])) {
      index++;
    }
    const numStr = text.substring(start, index);
    return parseFloat(numStr);
  }

  function parseIdentifier(): any {
    const start = index;
    while (index < text.length && /[a-zA-Z0-9_$]/.test(text[index])) {
      index++;
    }
    const ident = text.substring(start, index);
    
    if (ident === "true") return true;
    if (ident === "false") return false;
    if (ident === "null") return null;
    if (ident === "undefined") return undefined;
    
    // Otherwise, it is a variable parameter name! Look it up in paramMap
    if (paramMap.has(ident)) {
      return paramMap.get(ident);
    }
    
    return undefined;
  }

  return parseValue();
}

function parseNuxtState(stateStr: string): any {
  const paramMatch = stateStr.match(/^\(function\(([^)]*)\)/);
  if (!paramMatch) throw new Error("Could not parse Nuxt function parameters");
  const params = paramMatch[1].split(',').map(s => s.trim());

  const returnIndex = stateStr.indexOf('return {');
  if (returnIndex === -1) throw new Error("Could not find return statement in Nuxt state");
  
  const lastIndex = stateStr.lastIndexOf('}(');
  if (lastIndex === -1) throw new Error("Could not find end of return object");
  
  const objectBodyText = stateStr.substring(returnIndex + 'return '.length, lastIndex + 1).trim();

  const argsText = stateStr.slice(lastIndex + 2, -2).trim();
  const args = JSON.parse('[' + argsText + ']');

  const paramMap = new Map<string, any>();
  for (let i = 0; i < params.length; i++) {
    paramMap.set(params[i], args[i]);
  }

  return parseJsLiteral(objectBodyText, paramMap);
}
