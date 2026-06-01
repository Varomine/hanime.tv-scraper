// @ts-ignore
import wasmModule from "./signature.wasm";
console.log("wasmModule type:", typeof wasmModule, "constructor:", wasmModule?.constructor?.name);

const locationObj = {
  origin: "https://hanime.tv",
  href: "https://hanime.tv/"
};

export const windowObj = {
  top: { location: locationObj },
  location: locationObj,
  addEventListener: (eventName: string, cb: Function) => {
    if (eventName === "e") {
      (windowObj as any).eventCallback = cb;
    }
  },
  ssignature: null as string | null,
  stime: null as number | null,
  eventCallback: null as Function | null
};

// Set browser environment mock globals
(globalThis as any).window = windowObj;
(globalThis as any).self = windowObj;
(globalThis as any).global = windowObj;
(globalThis as any).location = locationObj;

// Expose the statically compiled WebAssembly module for vendor.js loader
(globalThis as any).wasmModule = wasmModule;

// Disable Node.js identifiers to force Emscripten browser path
(globalThis as any).require = undefined;
(globalThis as any).exports = undefined;
(globalThis as any).module = undefined;
(globalThis as any).process = undefined;
