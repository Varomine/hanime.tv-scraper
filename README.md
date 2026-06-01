# Hanime Video Scraper API & Interactive Docs

A high-performance, robust scraper API for Hanime.tv designed specifically to run inside **Cloudflare Workers**. 

This worker uses an advanced V8-native WebAssembly (WASM) evaluation strategy to extract internal signature and timestamp tokens (`X-Signature` & `X-Time`) from the platform's obfuscated JavaScript runtime. It routes API requests to extract metadata and direct, playable `.m3u8` video streaming formats.

## Features

- **Root Interactive Dashboard (`/`)**: A premium dark-mode documentation dashboard with glassmorphic styling, featuring a copy-paste code generator (cURL, Javascript, Python) and an **Interactive Playground** to query endpoints directly in your browser.
- **Get Video Metadata & Streams (`/api/video/:slug`)**: Performs real-time server-side hydration parsing and signature-based manifest querying to return direct CDNs streaming formats (e.g. 1080p, 720p, 480p, 360p) with file sizes.
- **Home Landing Lists (`/api/landing`)**: Returns curated homepage lists including trending, new uploads, recent releases, and randomized items.
- **Fuzzy Search API (`/api/search?q=...`)**: Full search proxy support returning matching slugs, poster images, view counts, and likes.
- **No Third-Party Server Dependencies**: Runs fully self-contained inside Cloudflare Workers using standard ES modules and V8 isolates.

---

## Local Development

### 1. Install Dependencies
Run `npm install` to install Wrangler and TypeScript compiler:
```bash
npm install
```

### 2. Run the Local Dev Server
Start Wrangler dev server locally:
```bash
npm run dev
```
Open your browser at `http://localhost:8787` to see the interactive documentation dashboard.

---

## Deployment to Cloudflare Workers

Deploy the worker instantly to your Cloudflare account using:
```bash
npx wrangler deploy
```

---

## API Documentation

### 1. Fetch Video Stream Links
* **Endpoint**: `/api/video/:slug`
* **Method**: `GET`
* **Response**:
```json
{
  "success": true,
  "video": {
    "id": 1226,
    "name": "Itadaki! Seieki",
    "slug": "itadaki-seieki",
    "description": "...",
    "brand": "PoRO",
    "views": 482029,
    "tags": ["Creampie", "Maid", "Succubus"]
  },
  "streams": [
    {
      "server": "Shiva",
      "width": 1280,
      "height": 720,
      "quality": "720p",
      "size_mb": 240,
      "ext": "m3u8",
      "url": "https://m3u8s.highwinds-cdn.com/api/v9/m3u8s/..."
    }
  ]
}
```

### 2. Get Landing Lists
* **Endpoint**: `/api/landing`
* **Method**: `GET`

### 3. Search Videos
* **Endpoint**: `/api/search?q=query&page=0`
* **Method**: `GET`
