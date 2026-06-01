try:
    with open('src/vendor.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    # Locate __emval_create_invoker definition
    # It starts with 'var __emval_create_invoker=(argCount,argTypesPtr,kind)=>{'
    # and ends with 'return emval_addMethodCaller(createNamedFunction(functionName,invokerFunction))};'
    import re
    
    pattern = r'var __emval_create_invoker=\(argCount,argTypesPtr,kind\)=>\{var GenericWireTypeSize=8;.*?return emval_addMethodCaller\(createNamedFunction\(functionName,invokerFunction\)\)\};'
    match = re.search(pattern, js)
    if not match:
        raise Exception("Could not locate __emval_create_invoker in vendor.js")
        
    print("Found __emval_create_invoker block of length:", len(match.group(0)))
    
    # Custom eval-free implementation
    eval_free_invoker = """var __emval_create_invoker = (argCount, argTypesPtr, kind) => {
  var GenericWireTypeSize = 8;
  var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
  var toReturnWire = retType.toWireType.bind(retType);
  var argFromPtr = argTypes.map(type => type.readValueFromPointer.bind(type));
  argCount--;

  var invokerFunction = function (handle, methodName, destructorsRef, args) {
    var parsedArgs = argTypes.map((type, i) => {
      return argFromPtr[i](args + (i ? i * GenericWireTypeSize : 0));
    });

    var resultVal;
    var target = Emval.toValue(handle);
    switch (kind) {
      case 0:
        resultVal = target(...parsedArgs);
        break;
      case 1:
        resultVal = target[getStringOrSymbol(methodName)](...parsedArgs);
        break;
      case 2:
        resultVal = new target(...parsedArgs);
        break;
      case 3:
        // Evaluate arguments comma-style like the original Emscripten code: (arg0, arg1, ...)
        // This evaluates each argument, then returns the last one, or undefined if no arguments.
        if (parsedArgs.length > 0) {
          resultVal = parsedArgs[parsedArgs.length - 1];
        } else {
          resultVal = undefined;
        }
        break;
    }

    if (!retType.isVoid) {
      return emval_returnValue(toReturnWire, destructorsRef, resultVal);
    }
    return resultVal;
  };

  var functionName = `methodCaller<(${argTypes.map(t => t.name)}) => ${retType.name}>`;
  return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
};"""
    
    js_patched = js.replace(match.group(0), eval_free_invoker)
    
    with open('src/vendor.js', 'w', encoding='utf-8') as f:
        f.write(js_patched)
        
    print("vendor.js successfully patched to remove eval/new Function from Embind invoker!")
except Exception as e:
    print("Error:", e)
