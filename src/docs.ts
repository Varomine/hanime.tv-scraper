export const docsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hanime Scraper API Documentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #080710;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-primary: #8a2be2;
      --accent-secondary: #4a00e0;
      --text-main: #f5f5f7;
      --text-muted: #86868b;
      --success: #00e676;
      --method-get: #00b0ff;
      --method-post: #00e676;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      min-height: 100/vh;
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* Gradients Background */
    .bg-glow-1 {
      position: absolute;
      top: -10%;
      left: -10%;
      width: 50%;
      height: 60%;
      background: radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%);
      filter: blur(80px);
      z-index: -1;
      pointer-events: none;
    }

    .bg-glow-2 {
      position: absolute;
      bottom: -10%;
      right: -10%;
      width: 50%;
      height: 60%;
      background: radial-gradient(circle, rgba(74, 0, 224, 0.15) 0%, transparent 70%);
      filter: blur(80px);
      z-index: -1;
      pointer-events: none;
    }

    header {
      padding: 3rem 2rem;
      text-align: center;
      border-bottom: 1px solid var(--card-border);
      backdrop-filter: blur(10px);
      background: rgba(8, 7, 16, 0.5);
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 0.5rem;
    }

    .logo-badge {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 30%, var(--text-muted) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    header p {
      color: var(--text-muted);
      margin-top: 0.5rem;
      font-size: 1.1rem;
    }

    main {
      max-width: 1200px;
      margin: 3rem auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    @media (max-width: 900px) {
      main {
        grid-template-columns: 1fr;
      }
    }

    /* Cards Styling */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 2rem;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      border-color: rgba(138, 43, 226, 0.3);
      box-shadow: 0 8px 32px 0 rgba(138, 43, 226, 0.1);
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h2::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 20px;
      background: var(--accent-primary);
      border-radius: 2px;
    }

    /* Endpoint Blocks */
    .endpoint {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 1.5rem;
    }

    .endpoint:last-child {
      border: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 0.5rem;
    }

    .method {
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }

    .method.get {
      background: rgba(0, 176, 255, 0.1);
      color: var(--method-get);
    }

    .method.post {
      background: rgba(0, 230, 118, 0.1);
      color: var(--method-post);
    }

    .path {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      color: var(--text-main);
      font-size: 0.95rem;
    }

    .endpoint-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }

    /* Parameter lists */
    .params-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .params-list {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.85rem;
    }

    .param-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding: 4px 0;
    }

    .param-item:last-child {
      border: none;
    }

    .param-name {
      font-family: 'JetBrains Mono', monospace;
      color: #ff9100;
    }

    .param-type {
      color: var(--text-muted);
      font-size: 0.8rem;
    }

    /* Code Snippets Section */
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 1rem;
    }

    .tab-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      padding: 8px 16px;
      font-family: inherit;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      position: relative;
    }

    .tab-btn.active {
      color: var(--text-main);
    }

    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--accent-primary);
    }

    .snippet-container {
      position: relative;
    }

    .copy-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.3s;
    }

    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    pre {
      background: #000000;
      border-radius: 12px;
      padding: 1.2rem;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: #33ff33;
      border: 1px solid var(--card-border);
    }

    /* Live Playground */
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 1rem;
    }

    input {
      flex: 1;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 12px 16px;
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: var(--accent-primary);
    }

    button.btn-run {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border: none;
      color: white;
      padding: 12px 24px;
      border-radius: 12px;
      font-family: inherit;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    button.btn-run:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(138, 43, 226, 0.5);
    }

    button.btn-run:active {
      transform: translateY(0);
    }

    .playground-output {
      max-height: 400px;
      overflow-y: auto;
    }

    footer {
      text-align: center;
      padding: 3rem;
      color: var(--text-muted);
      font-size: 0.9rem;
      border-top: 1px solid var(--card-border);
      margin-top: 5rem;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.14/dist/hls.min.js"></script>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>

  <header>
    <div class="logo-container">
      <div class="logo-badge">V8 Isolate</div>
      <h1>Hanime Scraper API</h1>
    </div>
    <p>Cloudflare Workers High-Performance Video Extraction API</p>
  </header>

  <main>
    <!-- Left column: API Reference -->
    <div class="card">
      <h2>Endpoints Reference</h2>
      
      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method get">GET</span>
          <span class="path">/api/video/:slug</span>
        </div>
        <div class="endpoint-desc">
          Fetches full video details including metadata (tags, brand, title) and stream formats (direct .m3u8 CDN links).
        </div>
        <div class="params-title">URL Parameters</div>
        <div class="params-list">
          <div class="param-item">
            <span class="param-name">:slug</span>
            <span class="param-type">string (Required, e.g. "itadaki-seieki")</span>
          </div>
        </div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method get">GET</span>
          <span class="path">/api/landing</span>
        </div>
        <div class="endpoint-desc">
          Retrieves the Hanime landing page contents, including Recent Uploads, New Releases, Trending, and Random.
        </div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method get">GET</span>
          <span class="path">/api/search</span>
        </div>
        <div class="endpoint-desc">
          Searches for anime matching a query text and optional filters.
        </div>
        <div class="params-title">Query Parameters</div>
        <div class="params-list">
          <div class="param-item">
            <span class="param-name">q</span>
            <span class="param-type">string (Required - search term)</span>
          </div>
          <div class="param-item">
            <span class="param-name">page</span>
            <span class="param-type">number (Optional, default 0)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right column: Live Tester & Code Snippets -->
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Live Tester -->
      <div class="card">
        <h2>Interactive Playground</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          Query endpoints live on this worker. Try querying a video slug below:
        </p>
        <div class="input-group">
          <input type="text" id="playground-input" value="itadaki-seieki" placeholder="Enter video slug (e.g. itadaki-seieki)">
          <button class="btn-run" onclick="runPlayground()">Send Request</button>
        </div>
        <div class="playground-output">
          <div id="player-container" style="display: none; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
            <video id="video-player" controls style="width: 100%; aspect-ratio: 16/9; display: block; background: #000;"></video>
            <div id="quality-selector-container" style="padding: 10px; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: space-between; font-size: 0.9rem; border-top: 1px solid var(--card-border);">
              <span>Select Format / Quality:</span>
              <select id="quality-selector" onchange="changeQuality()" style="background: rgba(0,0,0,0.8); color: var(--text-main); border: 1px solid var(--card-border); padding: 4px 8px; border-radius: 6px; font-family: inherit; font-size: 0.85rem; outline: none; cursor: pointer;"></select>
            </div>
          </div>
          <pre id="output-box">Response will appear here...</pre>
        </div>
      </div>

      <!-- Code Snippets -->
      <div class="card">
        <h2>Integration Code</h2>
        <div class="tabs">
          <button class="tab-btn active" onclick="switchTab(event, 'curl')">cURL</button>
          <button class="tab-btn" onclick="switchTab(event, 'fetch')">JavaScript</button>
          <button class="tab-btn" onclick="switchTab(event, 'python')">Python</button>
        </div>
        <div class="snippet-container">
          <button class="copy-btn" onclick="copySnippet()">Copy</button>
          <pre id="snippet-box">curl -X GET "https://[YOUR_WORKER_DOMAIN]/api/video/itadaki-seieki"</pre>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <p>Ready to deploy on Cloudflare Workers &bull; Powered by V8 WebAssembly</p>
  </footer>

  <script>
    const snippets = {
      curl: 'curl -X GET "https://' + window.location.host + '/api/video/itadaki-seieki"',
      fetch: 'fetch("https://' + window.location.host + '/api/video/itadaki-seieki")\\n  .then(res => res.json())\\n  .then(data => console.log(data));',
      python: 'import requests\\n\\nurl = "https://' + window.location.host + '/api/video/itadaki-seieki"\\nresponse = requests.get(url)\\ndata = response.json()\\nprint(data)'
    };

    let activeTab = 'curl';

    function switchTab(e, lang) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      activeTab = lang;
      
      const snippet = snippets[lang] || '';
      document.getElementById('snippet-box').textContent = snippet;
    }

    function copySnippet() {
      const code = document.getElementById('snippet-box').textContent;
      navigator.clipboard.writeText(code);
      const copyBtn = document.querySelector('.copy-btn');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    }

    let hlsInstance = null;
    let availableStreams = [];

    async function runPlayground() {
      const slug = document.getElementById('playground-input').value.trim();
      if (!slug) return;
      
      const outputBox = document.getElementById('output-box');
      const playerContainer = document.getElementById('player-container');
      const qualitySelector = document.getElementById('quality-selector');
      const video = document.getElementById('video-player');
      
      outputBox.textContent = 'Loading and generating credentials...';
      playerContainer.style.display = 'none';
      qualitySelector.innerHTML = '';
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
      video.src = '';
      
      try {
        const response = await fetch('/api/video/' + slug);
        const data = await response.json();
        outputBox.textContent = JSON.stringify(data, null, 2);
        
        if (data.success && data.streams && data.streams.length > 0) {
          availableStreams = data.streams;
          playerContainer.style.display = 'block';
          
          availableStreams.forEach((stream, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = \`\${stream.server} - \${stream.quality} (\${stream.size_mb} MB)\`;
            qualitySelector.appendChild(opt);
          });
          
          loadStream(availableStreams[0].url);
        }
      } catch (err) {
        outputBox.textContent = 'Error: ' + err.message;
      }
    }

    function loadStream(url) {
      const video = document.getElementById('video-player');
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
      
      if (Hls.isSupported()) {
        hlsInstance = new Hls();
        hlsInstance.loadSource(url);
        hlsInstance.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        alert('HLS stream playing is not supported in this browser. Please try Chrome/Firefox or use VLC/external player.');
      }
    }

    function changeQuality() {
      const selector = document.getElementById('quality-selector');
      const index = selector.value;
      if (availableStreams[index]) {
        loadStream(availableStreams[index].url);
      }
    }

    // Initialize snippet text with current domain
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById('snippet-box').textContent = snippets.curl;
    });
  </script>
</body>
</html>`;
