try:
    with open('src/vendor.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    target = 'var ENVIRONMENT_IS_NODE=typeof process=="object"&&process.versions?.node&&process.type!="renderer";'
    replacement = 'var ENVIRONMENT_IS_NODE=false;'
    
    if target not in js:
        raise Exception("Could not find the target environment detection statement in vendor.js")
        
    js_patched = js.replace(target, replacement)
    
    with open('src/vendor.js', 'w', encoding='utf-8') as f:
        f.write(js_patched)
        
    print("vendor.js successfully patched to force browser environment mode!")
except Exception as e:
    print("Error:", e)
