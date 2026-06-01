try:
    # Read the original vendor.js file again by downloading it first to ensure we clean up the previous patch
    import urllib.request
    url = 'https://hanime-cdn.com/js/vendor.0130da3e01eaf5c7d570b6ed1becb5f4.min.js'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://hanime.tv/'
    }
    req = urllib.request.Request(url, headers=headers)
    print("Re-downloading clean vendor.js...")
    with urllib.request.urlopen(req) as r:
        js = r.read().decode('utf-8')
        
    target = 'var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);'
    # Return {instance: instance} because WebAssembly.instantiate(Module) resolves directly to Instance, 
    # but Emscripten expects {instance, module} shape.
    replacement = 'var instance=await WebAssembly.instantiate(globalThis.wasmModule,imports);return {instance:instance};'
    
    if target not in js:
        raise Exception("Could not find the target WebAssembly compilation statement in vendor.js")
        
    js_patched = js.replace(target, replacement)
    
    # Set ENVIRONMENT_IS_NODE = false
    env_target = 'var ENVIRONMENT_IS_NODE=typeof process=="object"&&process.versions?.node&&process.type!="renderer";'
    env_replacement = 'var ENVIRONMENT_IS_NODE=false;'
    js_patched = js_patched.replace(env_target, env_replacement)
    
    # Strip base64 Wasm string to save bundle size
    import re
    js_patched = re.sub(r'findWasmBinary\(\)\{return base64Decode\("[^"]+"\)\}', 'findWasmBinary(){return new Uint8Array()}', js_patched)
    
    with open('src/vendor.js', 'w', encoding='utf-8') as f:
        f.write(js_patched)
        
    print("vendor.js successfully patched to run statically pre-compiled WebAssembly with correct shape!")
except Exception as e:
    print("Error:", e)
