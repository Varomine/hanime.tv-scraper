import urllib.request

url = 'https://hanime-cdn.com/js/vendor.0130da3e01eaf5c7d570b6ed1becb5f4.min.js'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://hanime.tv/'
}
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as r:
        data = r.read()
    with open('src/vendor.js', 'wb') as f:
        f.write(data)
    print("Vendor script downloaded successfully to src/vendor.js")
except Exception as e:
    print("Error downloading vendor script:", e)
