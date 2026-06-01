import "./preamble";
// @ts-ignore
import "./vendor.js";
import { windowObj } from "./preamble";

export async function getSignature(fetchFn: typeof fetch): Promise<{ ssignature: string; stime: number }> {
  console.log("DEBUG: windowObj keys:", Object.keys(windowObj), 
              "ssignature:", windowObj.ssignature, 
              "stime:", windowObj.stime, 
              "has_cb:", typeof (windowObj as any).eventCallback);
              
  // Wait until the initial signature is populated (typically completes instantly during isolate startup)
  for (let i = 0; i < 200; i++) {
    if (windowObj.ssignature && windowObj.stime) {
      break;
    }
    await new Promise(r => setTimeout(r, 10));
  }

  // Trigger event callback synchronously to generate a fresh signature matching the current time
  const cb = (windowObj as any).eventCallback;
  if (cb) {
    windowObj.ssignature = null;
    windowObj.stime = null;
    try {
      cb({ detail: {} });
      if (windowObj.ssignature && windowObj.stime) {
        return {
          ssignature: windowObj.ssignature,
          stime: windowObj.stime
        };
      }
    } catch (e) {
      console.error("vendor.js execution error:", e);
      // Ignore runtime warnings from Emscripten loader quirks
    }
  }

  // Fallback to whatever values are currently available in the window object
  if (windowObj.ssignature && windowObj.stime) {
    return {
      ssignature: windowObj.ssignature,
      stime: windowObj.stime
    };
  }

  throw new Error("Failed to generate signature credentials (WASM environment not initialized)");
}
