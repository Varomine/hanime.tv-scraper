import re
import base64

try:
    with open('src/vendor.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    # Locate findWasmBinary(){return base64Decode("...")
    match = re.search(r'findWasmBinary\(\)\{return base64Decode\("([^"]+)"\)', js)
    if not match:
        raise Exception("Could not locate base64 WASM binary in vendor.js")
        
    b64_str = match.group(1)
    print("Found base64 string of length:", len(b64_str))
    
    # Decode and save to signature.wasm
    wasm_bytes = base64.b64decode(b64_str)
    with open('src/signature.wasm', 'wb') as f:
        f.write(wasm_bytes)
        
    print("WebAssembly binary successfully saved to src/signature.wasm. Size:", len(wasm_bytes), "bytes")
except Exception as e:
    print("Error:", e)
