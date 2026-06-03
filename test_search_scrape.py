import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

urls = [
    'https://hanime.tv/search?q=itadaki',
    'https://hanime.tv/search?query=itadaki',
    'https://hanime.tv/search?q=Kaede'
]

for url in urls:
    print(f"Testing URL: {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as res:
            print(f"  Status: {res.status}")
            html = res.read().decode('utf-8')
            
            # Find Nuxt state
            nuxt_match = re.search(r'<script>window\.__NUXT__\s*=\s*(.*?);<\/script>', html)
            if nuxt_match:
                print("  Found window.__NUXT__!")
                state_text = nuxt_match.group(1)
                print("  State Length:", len(state_text))
                # Check for keywords in state
                if "itadaki" in state_text.lower() or "kaede" in state_text.lower():
                    print("  Keyword found in Nuxt state! Search results are present in HTML!")
                else:
                    print("  Keyword NOT found in Nuxt state. Probably empty search results template.")
            else:
                print("  No window.__NUXT__ found in HTML.")
    except Exception as e:
        print(f"  Error: {e}")
