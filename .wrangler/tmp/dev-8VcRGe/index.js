var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-Nqc0Br/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
var init_strip_cf_connecting_ip_header = __esm({
  ".wrangler/tmp/bundle-Nqc0Br/strip-cf-connecting-ip-header.js"() {
    "use strict";
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
function notImplementedAsync(name) {
  const fn = notImplemented(name);
  fn.__promisify__ = () => notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    __name(PerformanceEntry, "PerformanceEntry");
    PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    }, "PerformanceMark");
    PerformanceMeasure = class extends PerformanceEntry {
      entryType = "measure";
    };
    __name(PerformanceMeasure, "PerformanceMeasure");
    PerformanceResourceTiming = class extends PerformanceEntry {
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    __name(PerformanceResourceTiming, "PerformanceResourceTiming");
    PerformanceObserverEntryList = class {
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    __name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
    Performance = class {
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    __name(Performance, "Performance");
    PerformanceObserver = class {
      __unenv__ = true;
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    __name(PerformanceObserver, "PerformanceObserver");
    __publicField(PerformanceObserver, "supportedEntryTypes", []);
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream;
var init_read_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class extends Socket {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      isRaw = false;
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
      isTTY = false;
    };
    __name(ReadStream, "ReadStream");
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream;
var init_write_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class extends Socket2 {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      columns = 80;
      rows = 24;
      isTTY = false;
    };
    __name(WriteStream, "WriteStream");
  }
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    Process = class extends EventEmitter {
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return "";
      }
      get versions() {
        return {};
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: () => 0 });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    __name(Process, "Process");
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, exit, platform, nextTick, unenvProcess, abort, addListener, allowedNodeEnvironmentFlags, hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback, loadEnvFile, sourceMapsEnabled, arch, argv, argv0, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, dlopen, disconnect, emit, emitWarning, env, eventNames, execArgv, execPath, finalization, features, getActiveResourcesInfo, getMaxListeners, hrtime3, kill, listeners, listenerCount, memoryUsage, on, off, once, pid, ppid, prependListener, prependOnceListener, rawListeners, release, removeAllListeners, removeListener, report, resourceUsage, setMaxListeners, setSourceMapsEnabled, stderr, stdin, stdout, title, throwDeprecation, traceDeprecation, umask, uptime, version, versions, domain, initgroups, moduleLoadList, reallyExit, openStdin, assert2, binding, send, exitCode, channel, getegid, geteuid, getgid, getgroups, getuid, setegid, seteuid, setgid, setgroups, setuid, permission, mainModule, _events, _eventsCount, _exiting, _maxListeners, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _disconnect, _handleQueue, _pendingMessage, _channel, _send, _linkedBinding, _process, process_default;
var init_process2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    ({ exit, platform, nextTick } = getBuiltinModule(
      "node:process"
    ));
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      nextTick
    });
    ({
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      finalization,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      on,
      off,
      once,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// node_modules/unenv/dist/runtime/node/fs.mjs
var fs_default;
var init_fs2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node-built-in-modules:fs
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_fs2();
    module.exports = fs_default;
  }
});

// src/vendor.js
var require_vendor = __commonJS({
  "src/vendor.js"(exports, module) {
    "use strict";
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Module = typeof Module != "undefined" ? Module : {};
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
    var ENVIRONMENT_IS_NODE = false;
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = /* @__PURE__ */ __name((status, toThrow) => {
      throw toThrow;
    }, "quit_");
    var _scriptName = typeof document != "undefined" ? document.currentScript?.src : void 0;
    if (typeof __filename != "undefined") {
      _scriptName = __filename;
    } else if (ENVIRONMENT_IS_WORKER) {
      _scriptName = self.location.href;
    }
    var scriptDirectory = "";
    var readAsync;
    var readBinary;
    if (ENVIRONMENT_IS_NODE) {
      fs = require_fs();
      scriptDirectory = __dirname + "/";
      readBinary = /* @__PURE__ */ __name((filename) => {
        filename = isFileURI(filename) ? new URL(filename) : filename;
        var ret = fs.readFileSync(filename);
        return ret;
      }, "readBinary");
      readAsync = /* @__PURE__ */ __name(async (filename, binary = true) => {
        filename = isFileURI(filename) ? new URL(filename) : filename;
        var ret = fs.readFileSync(filename, binary ? void 0 : "utf8");
        return ret;
      }, "readAsync");
      if (process.argv.length > 1) {
        thisProgram = process.argv[1].replace(/\\/g, "/");
      }
      arguments_ = process.argv.slice(2);
      if (typeof module != "undefined") {
        module["exports"] = Module;
      }
      quit_ = /* @__PURE__ */ __name((status, toThrow) => {
        process.exitCode = status;
        throw toThrow;
      }, "quit_");
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      try {
        scriptDirectory = new URL(".", _scriptName).href;
      } catch {
      }
      {
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = /* @__PURE__ */ __name((url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          }, "readBinary");
        }
        readAsync = /* @__PURE__ */ __name(async (url) => {
          if (isFileURI(url)) {
            return new Promise((resolve, reject) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.responseType = "arraybuffer";
              xhr.onload = () => {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                  resolve(xhr.response);
                  return;
                }
                reject(xhr.status);
              };
              xhr.onerror = reject;
              xhr.send(null);
            });
          }
          var response = await fetch(url, { credentials: "same-origin" });
          if (response.ok) {
            return response.arrayBuffer();
          }
          throw new Error(response.status + " : " + response.url);
        }, "readAsync");
      }
    } else {
    }
    var fs;
    var out = console.log.bind(console);
    var err = console.error.bind(console);
    var wasmBinary;
    var ABORT = false;
    var EXITSTATUS;
    var isFileURI = /* @__PURE__ */ __name((filename) => filename.startsWith("file://"), "isFileURI");
    var wasmMemory;
    var HEAP8;
    var HEAPU8;
    var HEAP16;
    var HEAPU16;
    var HEAP32;
    var HEAPU32;
    var HEAPF32;
    var HEAPF64;
    var HEAP64;
    var HEAPU64;
    var runtimeInitialized = false;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      HEAP8 = new Int8Array(b);
      HEAP16 = new Int16Array(b);
      HEAPU8 = new Uint8Array(b);
      HEAPU16 = new Uint16Array(b);
      HEAP32 = new Int32Array(b);
      HEAPU32 = new Uint32Array(b);
      HEAPF32 = new Float32Array(b);
      HEAPF64 = new Float64Array(b);
      HEAP64 = new BigInt64Array(b);
      HEAPU64 = new BigUint64Array(b);
    }
    __name(updateMemoryViews, "updateMemoryViews");
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(onPreRuns);
    }
    __name(preRun, "preRun");
    function initRuntime() {
      runtimeInitialized = true;
      wasmExports["A"]();
    }
    __name(initRuntime, "initRuntime");
    function preMain() {
    }
    __name(preMain, "preMain");
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(onPostRuns);
    }
    __name(postRun, "postRun");
    var runDependencies = 0;
    var dependenciesFulfilled = null;
    function addRunDependency(id) {
      runDependencies++;
      Module["monitorRunDependencies"]?.(runDependencies);
    }
    __name(addRunDependency, "addRunDependency");
    function removeRunDependency(id) {
      runDependencies--;
      Module["monitorRunDependencies"]?.(runDependencies);
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    __name(removeRunDependency, "removeRunDependency");
    function abort2(what) {
      Module["onAbort"]?.(what);
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      throw e;
    }
    __name(abort2, "abort");
    var wasmBinaryFile;
    function findWasmBinary() {
      return new Uint8Array();
    }
    __name(findWasmBinary, "findWasmBinary");
    async function instantiateArrayBuffer(binaryFile, imports) {
      try {
        var instance = await WebAssembly.instantiate(globalThis.wasmModule, imports);
        return { instance };
        return instance;
      } catch (reason) {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort2(reason);
      }
    }
    __name(instantiateArrayBuffer, "instantiateArrayBuffer");
    async function instantiateAsync(binary, binaryFile, imports) {
      return instantiateArrayBuffer(binaryFile, imports);
    }
    __name(instantiateAsync, "instantiateAsync");
    function getWasmImports() {
      return { a: wasmImports };
    }
    __name(getWasmImports, "getWasmImports");
    async function createWasm() {
      function receiveInstance(instance, module2) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["z"];
        updateMemoryViews();
        assignWasmExports(wasmExports);
        removeRunDependency("wasm-instantiate");
        return wasmExports;
      }
      __name(receiveInstance, "receiveInstance");
      addRunDependency("wasm-instantiate");
      function receiveInstantiationResult(result2) {
        return receiveInstance(result2["instance"]);
      }
      __name(receiveInstantiationResult, "receiveInstantiationResult");
      var info3 = getWasmImports();
      if (Module["instantiateWasm"]) {
        return new Promise((resolve, reject) => {
          Module["instantiateWasm"](info3, (mod, inst) => {
            resolve(receiveInstance(mod, inst));
          });
        });
      }
      wasmBinaryFile ??= findWasmBinary();
      var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info3);
      var exports2 = receiveInstantiationResult(result);
      return exports2;
    }
    __name(createWasm, "createWasm");
    var ExitStatus = class {
      name = "ExitStatus";
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    };
    __name(ExitStatus, "ExitStatus");
    var callRuntimeCallbacks = /* @__PURE__ */ __name((callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    }, "callRuntimeCallbacks");
    var onPostRuns = [];
    var addOnPostRun = /* @__PURE__ */ __name((cb) => onPostRuns.push(cb), "addOnPostRun");
    var onPreRuns = [];
    var addOnPreRun = /* @__PURE__ */ __name((cb) => onPreRuns.push(cb), "addOnPreRun");
    var noExitRuntime = true;
    var stackRestore = /* @__PURE__ */ __name((val) => __emscripten_stack_restore(val), "stackRestore");
    var stackSave = /* @__PURE__ */ __name(() => _emscripten_stack_get_current(), "stackSave");
    var ExceptionInfo = class {
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
      set_type(type) {
        HEAPU32[this.ptr + 4 >> 2] = type;
      }
      get_type() {
        return HEAPU32[this.ptr + 4 >> 2];
      }
      set_destructor(destructor) {
        HEAPU32[this.ptr + 8 >> 2] = destructor;
      }
      get_destructor() {
        return HEAPU32[this.ptr + 8 >> 2];
      }
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[this.ptr + 12] = caught;
      }
      get_caught() {
        return HEAP8[this.ptr + 12] != 0;
      }
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[this.ptr + 13] = rethrown;
      }
      get_rethrown() {
        return HEAP8[this.ptr + 13] != 0;
      }
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
      }
      get_adjusted_ptr() {
        return HEAPU32[this.ptr + 16 >> 2];
      }
    };
    __name(ExceptionInfo, "ExceptionInfo");
    var exceptionLast = 0;
    var uncaughtExceptionCount = 0;
    var ___cxa_throw = /* @__PURE__ */ __name((ptr, type, destructor) => {
      var info3 = new ExceptionInfo(ptr);
      info3.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      throw exceptionLast;
    }, "___cxa_throw");
    var __abort_js = /* @__PURE__ */ __name(() => abort2(""), "__abort_js");
    var AsciiToString = /* @__PURE__ */ __name((ptr) => {
      var str = "";
      while (1) {
        var ch = HEAPU8[ptr++];
        if (!ch)
          return str;
        str += String.fromCharCode(ch);
      }
    }, "AsciiToString");
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var BindingError = /* @__PURE__ */ __name(class BindingError extends Error {
      constructor(message) {
        super(message);
        this.name = "BindingError";
      }
    }, "BindingError");
    var throwBindingError = /* @__PURE__ */ __name((message) => {
      throw new BindingError(message);
    }, "throwBindingError");
    function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
    __name(sharedRegisterType, "sharedRegisterType");
    function registerType(rawType, registeredInstance, options = {}) {
      return sharedRegisterType(rawType, registeredInstance, options);
    }
    __name(registerType, "registerType");
    var integerReadValueFromPointer = /* @__PURE__ */ __name((name, width, signed) => {
      switch (width) {
        case 1:
          return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
        case 2:
          return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
        case 4:
          return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
        case 8:
          return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
        default:
          throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    }, "integerReadValueFromPointer");
    var __embind_register_bigint = /* @__PURE__ */ __name((primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
      const isUnsignedType = minRange === 0n;
      let fromWireType = /* @__PURE__ */ __name((value) => value, "fromWireType");
      if (isUnsignedType) {
        const bitSize = size * 8;
        fromWireType = /* @__PURE__ */ __name((value) => BigInt.asUintN(bitSize, value), "fromWireType");
        maxRange = fromWireType(maxRange);
      }
      registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => {
        if (typeof value == "number") {
          value = BigInt(value);
        }
        return value;
      }, readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType), destructorFunction: null });
    }, "__embind_register_bigint");
    var __embind_register_bool = /* @__PURE__ */ __name((rawType, name, trueValue, falseValue) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: function(wt) {
        return !!wt;
      }, toWireType: function(destructors, o) {
        return o ? trueValue : falseValue;
      }, readValueFromPointer: function(pointer) {
        return this.fromWireType(HEAPU8[pointer]);
      }, destructorFunction: null });
    }, "__embind_register_bool");
    var emval_freelist = [];
    var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
    var __emval_decref = /* @__PURE__ */ __name((handle) => {
      if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        emval_handles[handle] = void 0;
        emval_freelist.push(handle);
      }
    }, "__emval_decref");
    var Emval = { toValue: (handle) => {
      if (!handle) {
        throwBindingError(`Cannot use deleted val. handle = ${handle}`);
      }
      return emval_handles[handle];
    }, toHandle: (value) => {
      switch (value) {
        case void 0:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default: {
          const handle = emval_freelist.pop() || emval_handles.length;
          emval_handles[handle] = value;
          emval_handles[handle + 1] = 1;
          return handle;
        }
      }
    } };
    function readPointer(pointer) {
      return this.fromWireType(HEAPU32[pointer >> 2]);
    }
    __name(readPointer, "readPointer");
    var EmValType = { name: "emscripten::val", fromWireType: (handle) => {
      var rv = Emval.toValue(handle);
      __emval_decref(handle);
      return rv;
    }, toWireType: (destructors, value) => Emval.toHandle(value), readValueFromPointer: readPointer, destructorFunction: null };
    var __embind_register_emval = /* @__PURE__ */ __name((rawType) => registerType(rawType, EmValType), "__embind_register_emval");
    var floatReadValueFromPointer = /* @__PURE__ */ __name((name, width) => {
      switch (width) {
        case 4:
          return function(pointer) {
            return this.fromWireType(HEAPF32[pointer >> 2]);
          };
        case 8:
          return function(pointer) {
            return this.fromWireType(HEAPF64[pointer >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    }, "floatReadValueFromPointer");
    var __embind_register_float = /* @__PURE__ */ __name((rawType, name, size) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: (value) => value, toWireType: (destructors, value) => value, readValueFromPointer: floatReadValueFromPointer(name, size), destructorFunction: null });
    }, "__embind_register_float");
    var __embind_register_integer = /* @__PURE__ */ __name((primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
      const isUnsignedType = minRange === 0;
      let fromWireType = /* @__PURE__ */ __name((value) => value, "fromWireType");
      if (isUnsignedType) {
        var bitshift = 32 - 8 * size;
        fromWireType = /* @__PURE__ */ __name((value) => value << bitshift >>> bitshift, "fromWireType");
        maxRange = fromWireType(maxRange);
      }
      registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => value, readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0), destructorFunction: null });
    }, "__embind_register_integer");
    var __embind_register_memory_view = /* @__PURE__ */ __name((rawType, dataTypeIndex, name) => {
      var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
      var TA = typeMapping[dataTypeIndex];
      function decodeMemoryView(handle) {
        var size = HEAPU32[handle >> 2];
        var data = HEAPU32[handle + 4 >> 2];
        return new TA(HEAP8.buffer, data, size);
      }
      __name(decodeMemoryView, "decodeMemoryView");
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: decodeMemoryView, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
    }, "__embind_register_memory_view");
    var stringToUTF8Array = /* @__PURE__ */ __name((str, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0))
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var u = str.codePointAt(i2);
        if (u <= 127) {
          if (outIdx >= endIdx)
            break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx)
            break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx)
            break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx)
            break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
          i2++;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }, "stringToUTF8Array");
    var stringToUTF8 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite), "stringToUTF8");
    var lengthBytesUTF8 = /* @__PURE__ */ __name((str) => {
      var len = 0;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var c = str.charCodeAt(i2);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i2;
        } else {
          len += 3;
        }
      }
      return len;
    }, "lengthBytesUTF8");
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
    var findStringEnd = /* @__PURE__ */ __name((heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul)
        return maxIdx;
      while (heapOrArray[idx] && !(idx >= maxIdx))
        ++idx;
      return idx;
    }, "findStringEnd");
    var UTF8ArrayToString = /* @__PURE__ */ __name((heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str;
    }, "UTF8ArrayToString");
    var UTF8ToString = /* @__PURE__ */ __name((ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "", "UTF8ToString");
    var __embind_register_std_string = /* @__PURE__ */ __name((rawType, name) => {
      name = AsciiToString(name);
      var stdStringIsUTF8 = true;
      registerType(rawType, { name, fromWireType(value) {
        var length = HEAPU32[value >> 2];
        var payload = value + 4;
        var str;
        if (stdStringIsUTF8) {
          str = UTF8ToString(payload, length, true);
        } else {
          str = "";
          for (var i2 = 0; i2 < length; ++i2) {
            str += String.fromCharCode(HEAPU8[payload + i2]);
          }
        }
        _free(value);
        return str;
      }, toWireType(destructors, value) {
        if (value instanceof ArrayBuffer) {
          value = new Uint8Array(value);
        }
        var length;
        var valueIsOfTypeString = typeof value == "string";
        if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
          throwBindingError("Cannot pass non-string to std::string");
        }
        if (stdStringIsUTF8 && valueIsOfTypeString) {
          length = lengthBytesUTF8(value);
        } else {
          length = value.length;
        }
        var base = _malloc(4 + length + 1);
        var ptr = base + 4;
        HEAPU32[base >> 2] = length;
        if (valueIsOfTypeString) {
          if (stdStringIsUTF8) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            for (var i2 = 0; i2 < length; ++i2) {
              var charCode = value.charCodeAt(i2);
              if (charCode > 255) {
                _free(base);
                throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
              }
              HEAPU8[ptr + i2] = charCode;
            }
          }
        } else {
          HEAPU8.set(value, ptr);
        }
        if (destructors !== null) {
          destructors.push(_free, base);
        }
        return base;
      }, readValueFromPointer: readPointer, destructorFunction(ptr) {
        _free(ptr);
      } });
    }, "__embind_register_std_string");
    var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
    var UTF16ToString = /* @__PURE__ */ __name((ptr, maxBytesToRead, ignoreNul) => {
      var idx = ptr >> 1;
      var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
      if (endIdx - idx > 16 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
      var str = "";
      for (var i2 = idx; i2 < endIdx; ++i2) {
        var codeUnit = HEAPU16[i2];
        str += String.fromCharCode(codeUnit);
      }
      return str;
    }, "UTF16ToString");
    var stringToUTF16 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => {
      maxBytesToWrite ??= 2147483647;
      if (maxBytesToWrite < 2)
        return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
        var codeUnit = str.charCodeAt(i2);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    }, "stringToUTF16");
    var lengthBytesUTF16 = /* @__PURE__ */ __name((str) => str.length * 2, "lengthBytesUTF16");
    var UTF32ToString = /* @__PURE__ */ __name((ptr, maxBytesToRead, ignoreNul) => {
      var str = "";
      var startIdx = ptr >> 2;
      for (var i2 = 0; !(i2 >= maxBytesToRead / 4); i2++) {
        var utf32 = HEAPU32[startIdx + i2];
        if (!utf32 && !ignoreNul)
          break;
        str += String.fromCodePoint(utf32);
      }
      return str;
    }, "UTF32ToString");
    var stringToUTF32 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => {
      maxBytesToWrite ??= 2147483647;
      if (maxBytesToWrite < 4)
        return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var codePoint = str.codePointAt(i2);
        if (codePoint > 65535) {
          i2++;
        }
        HEAP32[outPtr >> 2] = codePoint;
        outPtr += 4;
        if (outPtr + 4 > endPtr)
          break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    }, "stringToUTF32");
    var lengthBytesUTF32 = /* @__PURE__ */ __name((str) => {
      var len = 0;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var codePoint = str.codePointAt(i2);
        if (codePoint > 65535) {
          i2++;
        }
        len += 4;
      }
      return len;
    }, "lengthBytesUTF32");
    var __embind_register_std_wstring = /* @__PURE__ */ __name((rawType, charSize, name) => {
      name = AsciiToString(name);
      var decodeString, encodeString, lengthBytesUTF;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
      } else {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
      }
      registerType(rawType, { name, fromWireType: (value) => {
        var length = HEAPU32[value >> 2];
        var str = decodeString(value + 4, length * charSize, true);
        _free(value);
        return str;
      }, toWireType: (destructors, value) => {
        if (!(typeof value == "string")) {
          throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
        }
        var length = lengthBytesUTF(value);
        var ptr = _malloc(4 + length + charSize);
        HEAPU32[ptr >> 2] = length / charSize;
        encodeString(value, ptr + 4, length + charSize);
        if (destructors !== null) {
          destructors.push(_free, ptr);
        }
        return ptr;
      }, readValueFromPointer: readPointer, destructorFunction(ptr) {
        _free(ptr);
      } });
    }, "__embind_register_std_wstring");
    var __embind_register_void = /* @__PURE__ */ __name((rawType, name) => {
      name = AsciiToString(name);
      registerType(rawType, { isVoid: true, name, fromWireType: () => void 0, toWireType: (destructors, o) => void 0 });
    }, "__embind_register_void");
    var emval_methodCallers = [];
    var emval_addMethodCaller = /* @__PURE__ */ __name((caller) => {
      var id = emval_methodCallers.length;
      emval_methodCallers.push(caller);
      return id;
    }, "emval_addMethodCaller");
    var getTypeName = /* @__PURE__ */ __name((type) => {
      var ptr = ___getTypeName(type);
      var rv = AsciiToString(ptr);
      _free(ptr);
      return rv;
    }, "getTypeName");
    var requireRegisteredType = /* @__PURE__ */ __name((rawType, humanName) => {
      var impl = registeredTypes[rawType];
      if (void 0 === impl) {
        throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
      }
      return impl;
    }, "requireRegisteredType");
    var emval_lookupTypes = /* @__PURE__ */ __name((argCount, argTypes) => {
      var a = new Array(argCount);
      for (var i2 = 0; i2 < argCount; ++i2) {
        a[i2] = requireRegisteredType(HEAPU32[argTypes + i2 * 4 >> 2], `parameter ${i2}`);
      }
      return a;
    }, "emval_lookupTypes");
    var createNamedFunction = /* @__PURE__ */ __name((name, func) => Object.defineProperty(func, "name", { value: name }), "createNamedFunction");
    var emval_returnValue = /* @__PURE__ */ __name((toReturnWire, destructorsRef, handle) => {
      var destructors = [];
      var result = toReturnWire(destructors, handle);
      if (destructors.length) {
        HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
      }
      return result;
    }, "emval_returnValue");
    var emval_symbols = {};
    var getStringOrSymbol = /* @__PURE__ */ __name((address) => {
      var symbol = emval_symbols[address];
      if (symbol === void 0) {
        return AsciiToString(address);
      }
      return symbol;
    }, "getStringOrSymbol");
    var __emval_create_invoker = /* @__PURE__ */ __name((argCount, argTypesPtr, kind) => {
      var GenericWireTypeSize = 8;
      var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
      var toReturnWire = retType.toWireType.bind(retType);
      var argFromPtr = argTypes.map((type) => type.readValueFromPointer.bind(type));
      argCount--;
      var invokerFunction = /* @__PURE__ */ __name(function(handle, methodName, destructorsRef, args) {
        var parsedArgs = argTypes.map((type, i2) => {
          return argFromPtr[i2](args + (i2 ? i2 * GenericWireTypeSize : 0));
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
            if (parsedArgs.length > 0) {
              resultVal = parsedArgs[parsedArgs.length - 1];
            } else {
              resultVal = void 0;
            }
            break;
        }
        if (!retType.isVoid) {
          return emval_returnValue(toReturnWire, destructorsRef, resultVal);
        }
        return resultVal;
      }, "invokerFunction");
      var functionName = `methodCaller<(${argTypes.map((t) => t.name)}) => ${retType.name}>`;
      return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
    }, "__emval_create_invoker");
    var emval_get_global = /* @__PURE__ */ __name(() => globalThis, "emval_get_global");
    var __emval_get_global = /* @__PURE__ */ __name((name) => {
      if (name === 0) {
        return Emval.toHandle(emval_get_global());
      } else {
        name = getStringOrSymbol(name);
        return Emval.toHandle(emval_get_global()[name]);
      }
    }, "__emval_get_global");
    var __emval_get_property = /* @__PURE__ */ __name((handle, key) => {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      return Emval.toHandle(handle[key]);
    }, "__emval_get_property");
    var __emval_incref = /* @__PURE__ */ __name((handle) => {
      if (handle > 9) {
        emval_handles[handle + 1] += 1;
      }
    }, "__emval_incref");
    var __emval_invoke = /* @__PURE__ */ __name((caller, handle, methodName, destructorsRef, args) => emval_methodCallers[caller](handle, methodName, destructorsRef, args), "__emval_invoke");
    var __emval_new_cstring = /* @__PURE__ */ __name((v) => Emval.toHandle(getStringOrSymbol(v)), "__emval_new_cstring");
    var runDestructors = /* @__PURE__ */ __name((destructors) => {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    }, "runDestructors");
    var __emval_run_destructors = /* @__PURE__ */ __name((handle) => {
      var destructors = Emval.toValue(handle);
      runDestructors(destructors);
      __emval_decref(handle);
    }, "__emval_run_destructors");
    var __tzset_js = /* @__PURE__ */ __name((timezone, daylight, std_name, dst_name) => {
      var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      var extractZone = /* @__PURE__ */ __name((timezoneOffset) => {
        var sign = timezoneOffset >= 0 ? "-" : "+";
        var absOffset = Math.abs(timezoneOffset);
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
        return `UTC${sign}${hours}${minutes}`;
      }, "extractZone");
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    }, "__tzset_js");
    var readEmAsmArgsArray = [];
    var readEmAsmArgs = /* @__PURE__ */ __name((sigPtr, buf) => {
      readEmAsmArgsArray.length = 0;
      var ch;
      while (ch = HEAPU8[sigPtr++]) {
        var wide = ch != 105;
        wide &= ch != 112;
        buf += wide && buf % 8 ? 4 : 0;
        readEmAsmArgsArray.push(ch == 112 ? HEAPU32[buf >> 2] : ch == 106 ? HEAP64[buf >> 3] : ch == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]);
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    }, "readEmAsmArgs");
    var runEmAsmFunction = /* @__PURE__ */ __name((code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      return ASM_CONSTS[code](...args);
    }, "runEmAsmFunction");
    var _emscripten_asm_const_int = /* @__PURE__ */ __name((code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf), "_emscripten_asm_const_int");
    var abortOnCannotGrowMemory = /* @__PURE__ */ __name((requestedSize) => {
      abort2("OOM");
    }, "abortOnCannotGrowMemory");
    var _emscripten_resize_heap = /* @__PURE__ */ __name((requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    }, "_emscripten_resize_heap");
    var ENV = {};
    var getExecutableName = /* @__PURE__ */ __name(() => thisProgram || "./this.program", "getExecutableName");
    var getEnvStrings = /* @__PURE__ */ __name(() => {
      if (!getEnvStrings.strings) {
        var lang = (typeof navigator == "object" && navigator.language || "C").replace("-", "_") + ".UTF-8";
        var env2 = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: lang, _: getExecutableName() };
        for (var x in ENV) {
          if (ENV[x] === void 0)
            delete env2[x];
          else
            env2[x] = ENV[x];
        }
        var strings = [];
        for (var x in env2) {
          strings.push(`${x}=${env2[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }, "getEnvStrings");
    var _environ_get = /* @__PURE__ */ __name((__environ, environ_buf) => {
      var bufSize = 0;
      var envp = 0;
      for (var string of getEnvStrings()) {
        var ptr = environ_buf + bufSize;
        HEAPU32[__environ + envp >> 2] = ptr;
        bufSize += stringToUTF8(string, ptr, Infinity) + 1;
        envp += 4;
      }
      return 0;
    }, "_environ_get");
    var _environ_sizes_get = /* @__PURE__ */ __name((penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      for (var string of strings) {
        bufSize += lengthBytesUTF8(string) + 1;
      }
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    }, "_environ_sizes_get");
    var runtimeKeepaliveCounter = 0;
    var keepRuntimeAlive = /* @__PURE__ */ __name(() => noExitRuntime || runtimeKeepaliveCounter > 0, "keepRuntimeAlive");
    var _proc_exit = /* @__PURE__ */ __name((code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module["onExit"]?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    }, "_proc_exit");
    var exitJS = /* @__PURE__ */ __name((status, implicit) => {
      EXITSTATUS = status;
      _proc_exit(status);
    }, "exitJS");
    var handleException = /* @__PURE__ */ __name((e) => {
      if (e instanceof ExitStatus || e == "unwind") {
        return EXITSTATUS;
      }
      quit_(1, e);
    }, "handleException");
    var getCFunc = /* @__PURE__ */ __name((ident) => {
      var func = Module["_" + ident];
      return func;
    }, "getCFunc");
    var writeArrayToMemory = /* @__PURE__ */ __name((array, buffer) => {
      HEAP8.set(array, buffer);
    }, "writeArrayToMemory");
    var stackAlloc = /* @__PURE__ */ __name((sz) => __emscripten_stack_alloc(sz), "stackAlloc");
    var stringToUTF8OnStack = /* @__PURE__ */ __name((str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    }, "stringToUTF8OnStack");
    var ccall = /* @__PURE__ */ __name((ident, returnType, argTypes, args, opts) => {
      var toC = { string: (str) => {
        var ret2 = 0;
        if (str !== null && str !== void 0 && str !== 0) {
          ret2 = stringToUTF8OnStack(str);
        }
        return ret2;
      }, array: (arr) => {
        var ret2 = stackAlloc(arr.length);
        writeArrayToMemory(arr, ret2);
        return ret2;
      } };
      function convertReturnValue(ret2) {
        if (returnType === "string") {
          return UTF8ToString(ret2);
        }
        if (returnType === "boolean")
          return Boolean(ret2);
        return ret2;
      }
      __name(convertReturnValue, "convertReturnValue");
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i2 = 0; i2 < args.length; i2++) {
          var converter = toC[argTypes[i2]];
          if (converter) {
            if (stack === 0)
              stack = stackSave();
            cArgs[i2] = converter(args[i2]);
          } else {
            cArgs[i2] = args[i2];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret2) {
        if (stack !== 0)
          stackRestore(stack);
        return convertReturnValue(ret2);
      }
      __name(onDone, "onDone");
      ret = onDone(ret);
      return ret;
    }, "ccall");
    for (base64ReverseLookup = new Uint8Array(123), i = 25; i >= 0; --i) {
      base64ReverseLookup[48 + i] = 52 + i;
      base64ReverseLookup[65 + i] = i;
      base64ReverseLookup[97 + i] = 26 + i;
    }
    var base64ReverseLookup;
    var i;
    base64ReverseLookup[43] = 62;
    base64ReverseLookup[47] = 63;
    {
      if (Module["noExitRuntime"])
        noExitRuntime = Module["noExitRuntime"];
      if (Module["print"])
        out = Module["print"];
      if (Module["printErr"])
        err = Module["printErr"];
      if (Module["wasmBinary"])
        wasmBinary = Module["wasmBinary"];
      if (Module["arguments"])
        arguments_ = Module["arguments"];
      if (Module["thisProgram"])
        thisProgram = Module["thisProgram"];
    }
    Module["ccall"] = ccall;
    var ASM_CONSTS = { 17392: () => parseInt((/* @__PURE__ */ new Date()).getTime() / 1e3), 17442: ($0, $1) => {
      window.ssignature = UTF8ToString($0);
      window.stime = $1;
    } };
    function window_on(ev_cstr) {
      var ev = UTF8ToString(ev_cstr);
      var handler = /* @__PURE__ */ __name(function(e) {
        var data = e && "detail" in e ? e.detail : {};
        var s = typeof data === "string" ? data : JSON.stringify(data || {});
        Module.ccall("on_window_event", null, ["string", "string"], [ev, s]);
      }, "handler");
      window.addEventListener(ev, handler);
    }
    __name(window_on, "window_on");
    var _on_window_event;
    var _main;
    var ___getTypeName;
    var _malloc;
    var _free;
    var __emscripten_stack_restore;
    var __emscripten_stack_alloc;
    var _emscripten_stack_get_current;
    function assignWasmExports(wasmExports2) {
      Module["_on_window_event"] = _on_window_event = wasmExports2["B"];
      Module["_main"] = _main = wasmExports2["C"];
      ___getTypeName = wasmExports2["D"];
      _malloc = wasmExports2["E"];
      _free = wasmExports2["F"];
      __emscripten_stack_restore = wasmExports2["G"];
      __emscripten_stack_alloc = wasmExports2["H"];
      _emscripten_stack_get_current = wasmExports2["I"];
    }
    __name(assignWasmExports, "assignWasmExports");
    var wasmImports = { x: ___cxa_throw, v: __abort_js, f: __embind_register_bigint, q: __embind_register_bool, n: __embind_register_emval, e: __embind_register_float, b: __embind_register_integer, a: __embind_register_memory_view, o: __embind_register_std_string, d: __embind_register_std_wstring, r: __embind_register_void, k: __emval_create_invoker, c: __emval_decref, p: __emval_get_global, l: __emval_get_property, j: __emval_incref, i: __emval_invoke, m: __emval_new_cstring, h: __emval_run_destructors, s: __tzset_js, g: _emscripten_asm_const_int, w: _emscripten_resize_heap, t: _environ_get, u: _environ_sizes_get, y: window_on };
    var wasmExports;
    createWasm();
    function callMain() {
      var entryFunction = _main;
      var argc = 0;
      var argv2 = 0;
      try {
        var ret = entryFunction(argc, argv2);
        exitJS(ret, true);
        return ret;
      } catch (e) {
        return handleException(e);
      }
    }
    __name(callMain, "callMain");
    function run() {
      if (runDependencies > 0) {
        dependenciesFulfilled = run;
        return;
      }
      preRun();
      if (runDependencies > 0) {
        dependenciesFulfilled = run;
        return;
      }
      function doRun() {
        Module["calledRun"] = true;
        if (ABORT)
          return;
        initRuntime();
        preMain();
        Module["onRuntimeInitialized"]?.();
        var noInitialRun = Module["noInitialRun"] || false;
        if (!noInitialRun)
          callMain();
        postRun();
      }
      __name(doRun, "doRun");
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(() => {
          setTimeout(() => Module["setStatus"](""), 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    __name(run, "run");
    function preInit() {
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
          Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].shift()();
        }
      }
    }
    __name(preInit, "preInit");
    preInit();
    run();
  }
});

// .wrangler/tmp/bundle-Nqc0Br/middleware-loader.entry.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .wrangler/tmp/bundle-Nqc0Br/middleware-insertion-facade.js
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/index.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/signature.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/preamble.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import wasmModule from "./1f1f331c5324b499e9a356903f286ab1df6bbe6a-signature.wasm";
console.log("wasmModule type:", typeof wasmModule, "constructor:", wasmModule?.constructor?.name);
var locationObj = {
  origin: "https://hanime.tv",
  href: "https://hanime.tv/"
};
var windowObj = {
  top: { location: locationObj },
  location: locationObj,
  addEventListener: (eventName, cb) => {
    if (eventName === "e") {
      windowObj.eventCallback = cb;
    }
  },
  ssignature: null,
  stime: null,
  eventCallback: null
};
globalThis.window = windowObj;
globalThis.self = windowObj;
globalThis.global = windowObj;
globalThis.location = locationObj;
globalThis.wasmModule = wasmModule;
globalThis.require = void 0;
globalThis.exports = void 0;
globalThis.module = void 0;
globalThis.process = void 0;

// src/signature.ts
var import_vendor = __toESM(require_vendor());
async function getSignature(fetchFn) {
  console.log(
    "DEBUG: windowObj keys:",
    Object.keys(windowObj),
    "ssignature:",
    windowObj.ssignature,
    "stime:",
    windowObj.stime,
    "has_cb:",
    typeof windowObj.eventCallback
  );
  for (let i = 0; i < 200; i++) {
    if (windowObj.ssignature && windowObj.stime) {
      break;
    }
    await new Promise((r) => setTimeout(r, 10));
  }
  const cb = windowObj.eventCallback;
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
    }
  }
  if (windowObj.ssignature && windowObj.stime) {
    return {
      ssignature: windowObj.ssignature,
      stime: windowObj.stime
    };
  }
  throw new Error("Failed to generate signature credentials (WASM environment not initialized)");
}
__name(getSignature, "getSignature");

// src/docs.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var docsHtml = `<!DOCTYPE html>
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
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.14/dist/hls.min.js"><\/script>
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
  <\/script>
</body>
</html>`;

// src/index.ts
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Signature, X-Time, X-Signature-Version",
    "Access-Control-Max-Age": "86400"
  };
}
__name(corsHeaders, "corsHeaders");
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}
__name(jsonResponse, "jsonResponse");
var src_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const method = request.method;
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(docsHtml, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...corsHeaders()
        }
      });
    }
    if (url.pathname.startsWith("/api/video/")) {
      const slug = url.pathname.substring("/api/video/".length).trim();
      if (!slug) {
        return jsonResponse({ error: "Missing video slug parameter" }, 400);
      }
      return handleVideoRequest(slug);
    }
    if (url.pathname === "/api/landing") {
      return handleLandingRequest();
    }
    if (url.pathname === "/api/search") {
      const query = url.searchParams.get("q") || "";
      const pageStr = url.searchParams.get("page") || "0";
      const page = parseInt(pageStr, 10) || 0;
      if (!query) {
        return jsonResponse({ error: "Missing search query parameter 'q'" }, 400);
      }
      return handleSearchRequest(query, page);
    }
    return jsonResponse({ error: "Route not found" }, 404);
  }
};
async function handleVideoRequest(slug) {
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  try {
    const pageUrl = `https://hanime.tv/videos/hentai/${slug}`;
    const pageRes = await fetch(pageUrl, {
      headers: {
        "User-Agent": browserUserAgent
      }
    });
    if (!pageRes.ok) {
      return jsonResponse({ error: `Failed to fetch video page from Hanime.tv. Status: ${pageRes.status}` }, 404);
    }
    const html = await pageRes.text();
    const nuxtMatch = html.match(/<script>window\.__NUXT__\s*=\s*(.*?);<\/script>/);
    if (!nuxtMatch) {
      return jsonResponse({ error: "Could not find Nuxt state metadata in the webpage" }, 500);
    }
    let nuxtData;
    try {
      nuxtData = parseNuxtState(nuxtMatch[1]);
    } catch (e) {
      return jsonResponse({ error: `Failed to evaluate Nuxt state metadata: ${e.message}` }, 500);
    }
    const stateData = nuxtData?.state?.data;
    if (!stateData || !stateData.video || !stateData.video.hentai_video) {
      return jsonResponse({ error: "Invalid video metadata state structure" }, 500);
    }
    const hentaiVideo = stateData.video.hentai_video;
    const videoId = hentaiVideo.id;
    let sigs;
    try {
      sigs = await getSignature(fetch);
    } catch (e) {
      return jsonResponse({ error: `Failed to compile/generate signature credentials: ${e.message}` }, 500);
    }
    const manifestUrl = `https://h.freeanimehentai.net/api/v8/guest/videos/${videoId}/manifest`;
    const manifestRes = await fetch(manifestUrl, {
      headers: {
        "Accept": "application/json",
        "Origin": "https://hanime.tv",
        "Referer": "https://hanime.tv/",
        "X-Signature": sigs.ssignature,
        "X-Time": String(sigs.stime),
        "X-Signature-Version": "web2",
        "User-Agent": browserUserAgent
      }
    });
    if (!manifestRes.ok) {
      return jsonResponse({ error: `Failed to fetch streaming manifest from CDN. Status: ${manifestRes.status}` }, 500);
    }
    const manifestData = await manifestRes.json();
    const streamsList = [];
    const servers = manifestData?.videos_manifest?.servers || [];
    for (const server of servers) {
      const serverName = server.name || "Unknown";
      for (const stream of server.streams || []) {
        if (stream.url) {
          streamsList.push({
            server: serverName,
            width: stream.width,
            height: stream.height,
            quality: `${stream.height}p`,
            size_mb: stream.filesize_mbs,
            ext: stream.extension || "m3u8",
            url: stream.url
          });
        }
      }
    }
    const rawDesc = hentaiVideo.description || "";
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const franchise = stateData.video.hentai_franchise || {};
    const franchiseVideos = stateData.video.hentai_franchise_hentai_videos || [];
    return jsonResponse({
      success: true,
      video: {
        id: hentaiVideo.id,
        name: hentaiVideo.name,
        slug: hentaiVideo.slug,
        description: cleanDesc,
        brand: hentaiVideo.brand,
        views: hentaiVideo.views,
        likes: hentaiVideo.likes,
        dislikes: hentaiVideo.dislikes,
        downloads: hentaiVideo.downloads,
        monthly_rank: hentaiVideo.monthly_rank,
        released_at: hentaiVideo.released_at,
        created_at: hentaiVideo.created_at,
        poster_url: hentaiVideo.poster_url,
        cover_url: hentaiVideo.cover_url,
        tags: (hentaiVideo.hentai_tags || []).map((t) => t.text)
      },
      franchise: {
        id: franchise.id || null,
        title: franchise.title || null,
        slug: franchise.slug || null,
        videos: franchiseVideos.map((v) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          poster_url: v.poster_url
        }))
      },
      streams: streamsList,
      debug: {
        x_signature: sigs.ssignature,
        x_time: sigs.stime
      }
    });
  } catch (err) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}
__name(handleVideoRequest, "handleVideoRequest");
async function handleLandingRequest() {
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  try {
    const landingRes = await fetch("https://hanime.tv/api/v8/landing", {
      headers: {
        "User-Agent": browserUserAgent
      }
    });
    if (!landingRes.ok) {
      return jsonResponse({ error: `Failed to retrieve landing lists. Status: ${landingRes.status}` }, 500);
    }
    const landingData = await landingRes.json();
    const sections = landingData.sections || [];
    const responseSections = [];
    for (const section of sections) {
      const sectionVideos = section.hentai_videos || [];
      responseSections.push({
        title: section.title,
        videos: sectionVideos.map((v) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          brand: v.brand,
          views: v.views,
          likes: v.likes,
          poster_url: v.poster_url,
          cover_url: v.cover_url
        }))
      });
    }
    return jsonResponse({
      success: true,
      sections: responseSections
    });
  } catch (err) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}
__name(handleLandingRequest, "handleLandingRequest");
async function handleSearchRequest(query, page) {
  const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  try {
    const searchRes = await fetch("https://search.htv-services.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": browserUserAgent
      },
      body: JSON.stringify({
        search_text: query,
        page,
        blacklist: [],
        brands: [],
        tags: [],
        tags_mode: "AND",
        order_by: "title_sortable",
        ordering: "asc"
      })
    });
    if (!searchRes.ok) {
      return jsonResponse({ error: `Search request failed. Status: ${searchRes.status}` }, 500);
    }
    const searchData = await searchRes.json();
    const rawHits = searchData.hits || "[]";
    const hits = JSON.parse(rawHits);
    return jsonResponse({
      success: true,
      page: searchData.page,
      nbPages: searchData.nbPages,
      nbHits: searchData.nbHits,
      hitsPerPage: searchData.hitsPerPage,
      results: hits.map((h) => ({
        id: h.id,
        name: h.name,
        slug: h.slug,
        brand: h.brand,
        views: h.views,
        likes: h.likes,
        released_at: h.released_at,
        poster_url: h.poster_url,
        cover_url: h.cover_url
      }))
    });
  } catch (err) {
    return jsonResponse({ error: `Internal Server Error: ${err.message}` }, 500);
  }
}
__name(handleSearchRequest, "handleSearchRequest");
function parseJsLiteral(text, paramMap) {
  let index = 0;
  function skipWhitespace() {
    while (index < text.length && /\s/.test(text[index])) {
      index++;
    }
  }
  __name(skipWhitespace, "skipWhitespace");
  function parseValue() {
    skipWhitespace();
    if (index >= text.length)
      throw new Error("Unexpected end of input");
    const char = text[index];
    if (char === '"') {
      return parseString();
    }
    if (char === "{") {
      return parseObject();
    }
    if (char === "[") {
      return parseArray();
    }
    if (char === "-" || char >= "0" && char <= "9" || char === ".") {
      return parseNumber();
    }
    return parseIdentifier();
  }
  __name(parseValue, "parseValue");
  function parseString() {
    let result = "";
    index++;
    while (index < text.length) {
      const char = text[index];
      if (char === '"') {
        index++;
        return result;
      }
      if (char === "\\") {
        index++;
        const nextChar = text[index];
        if (nextChar === "u") {
          const hex = text.substring(index + 1, index + 5);
          result += String.fromCharCode(parseInt(hex, 16));
          index += 5;
        } else {
          const escapeMap = {
            "n": "\n",
            "r": "\r",
            "t": "	",
            "f": "\f",
            "b": "\b",
            "\\": "\\",
            '"': '"',
            "/": "/"
          };
          result += escapeMap[nextChar] || nextChar;
          index++;
        }
      } else {
        result += char;
        index++;
      }
    }
    throw new Error("Unterminated string");
  }
  __name(parseString, "parseString");
  function parseObject() {
    const obj = {};
    index++;
    skipWhitespace();
    if (text[index] === "}") {
      index++;
      return obj;
    }
    while (index < text.length) {
      skipWhitespace();
      let key;
      if (text[index] === '"') {
        key = parseString();
      } else {
        const start = index;
        while (index < text.length && /[a-zA-Z0-9_$]/.test(text[index])) {
          index++;
        }
        key = text.substring(start, index);
      }
      skipWhitespace();
      if (text[index] !== ":") {
        throw new Error(`Expected ':' after key at index ${index}, found ${text[index]}`);
      }
      index++;
      const val = parseValue();
      obj[key] = val;
      skipWhitespace();
      if (text[index] === "}") {
        index++;
        return obj;
      }
      if (text[index] !== ",") {
        throw new Error(`Expected ',' or '}' at index ${index}, found ${text[index]}`);
      }
      index++;
    }
    throw new Error("Unterminated object");
  }
  __name(parseObject, "parseObject");
  function parseArray() {
    const arr = [];
    index++;
    skipWhitespace();
    if (text[index] === "]") {
      index++;
      return arr;
    }
    while (index < text.length) {
      const val = parseValue();
      arr.push(val);
      skipWhitespace();
      if (text[index] === "]") {
        index++;
        return arr;
      }
      if (text[index] !== ",") {
        throw new Error(`Expected ',' or ']' at index ${index}`);
      }
      index++;
    }
    throw new Error("Unterminated array");
  }
  __name(parseArray, "parseArray");
  function parseNumber() {
    const start = index;
    if (text[index] === "-")
      index++;
    while (index < text.length && /[0-9.]/.test(text[index])) {
      index++;
    }
    const numStr = text.substring(start, index);
    return parseFloat(numStr);
  }
  __name(parseNumber, "parseNumber");
  function parseIdentifier() {
    const start = index;
    while (index < text.length && /[a-zA-Z0-9_$]/.test(text[index])) {
      index++;
    }
    const ident = text.substring(start, index);
    if (ident === "true")
      return true;
    if (ident === "false")
      return false;
    if (ident === "null")
      return null;
    if (ident === "undefined")
      return void 0;
    if (paramMap.has(ident)) {
      return paramMap.get(ident);
    }
    return void 0;
  }
  __name(parseIdentifier, "parseIdentifier");
  return parseValue();
}
__name(parseJsLiteral, "parseJsLiteral");
function parseNuxtState(stateStr) {
  const paramMatch = stateStr.match(/^\(function\(([^)]*)\)/);
  if (!paramMatch)
    throw new Error("Could not parse Nuxt function parameters");
  const params = paramMatch[1].split(",").map((s) => s.trim());
  const returnIndex = stateStr.indexOf("return {");
  if (returnIndex === -1)
    throw new Error("Could not find return statement in Nuxt state");
  const lastIndex = stateStr.lastIndexOf("}(");
  if (lastIndex === -1)
    throw new Error("Could not find end of return object");
  const objectBodyText = stateStr.substring(returnIndex + "return ".length, lastIndex + 1).trim();
  const argsText = stateStr.slice(lastIndex + 2, -2).trim();
  const args = JSON.parse("[" + argsText + "]");
  const paramMap = /* @__PURE__ */ new Map();
  for (let i = 0; i < params.length; i++) {
    paramMap.set(params[i], args[i]);
  }
  return parseJsLiteral(objectBodyText, paramMap);
}
__name(parseNuxtState, "parseNuxtState");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-Nqc0Br/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-Nqc0Br/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
