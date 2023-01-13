// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2iZtj":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "44ab06d39fe2884d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"cPN6L":[function(require,module,exports) {
var _orbitControlsJs = require("./OrbitControls.js");
let camera, scene, renderer;
let directionalLight1, spotLight, orbitControls, ambientLight;
let showCube = false, showSphere = false, showMultiMesh = true;
const mouse = new THREE.Vector2(1, 1);
const material = new THREE.MeshToonMaterial({
    color: 0x6C0BA9
});
let mesh;
let createdMesh = false;
const amount = parseInt(window.location.search.slice(1)) || 10;
const count = Math.pow(amount, 3);
const color = new THREE.Color();
const white = new THREE.Color().setHex(0xffffff);
let speed = 0.01, step = 0;
const gui = new dat.GUI();
initialize();
animate();
updatedSettings();
function initialize() {
    //Create a scene...
    let width = window.innerWidth;
    let height = window.innerHeight;
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog(0XFFFFF, 0, 150);
    scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);
    //Create a camera and define the perspective -> Orthographic or perspective
    camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(amount + 15, amount + 15, amount + 15);
    camera.lookAt(0, 0, 0);
    //Initialize the renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //Orbit Controls
    orbitControls = new (0, _orbitControlsJs.OrbitControls)(camera, renderer.domElement);
    //  orbitControls.listenToKeyEvents(window)
    //  orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    //  orbitControls.enableZoom = true;
    //  orbitControls.enablePan = false;
    //  orbitControls.minDistance = 10;
    //  orbitControls.maxDistance = 100;
    //Creating axes helpers...
    const axes = new THREE.AxesHelper(10);
    scene.add(axes);
    const gridHelper = new THREE.GridHelper(100, 25);
    scene.add(gridHelper);
    //#region Creating the lights
    //Create two directional Lights...
    directionalLight1 = new THREE.DirectionalLight(0x192841);
    const directionalLight1Helper = new THREE.DirectionalLightHelper(directionalLight1, 5);
    directionalLight1.position.set(-35, 40, 0);
    scene.add(directionalLight1);
    scene.add(directionalLight1Helper);
    //Create ambient light...
    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    //Create a spotlight
    spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.y = 35;
    spotLight.intensity = 0.5;
    spotLight.castShadow = true;
    const spotlightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLight);
    scene.add(spotlightHelper);
    spotLight.angle = Math.PI / 9;
    spotLight.castShadow = true;
    //#endregion
    //#region Creating scene objects
    //Create a number of objects from the same geometry...
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const phongMaterial = new THREE.MeshLambertMaterial(white);
    const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.rotation.x = -0.5 * Math.PI;
    scene.add(planeMesh);
    const geometry = new THREE.SphereGeometry(0.5, 64, 64);
    mesh = new THREE.InstancedMesh(geometry, material, count);
    let i = 0;
    const offset = (amount - 2) / 2;
    const matrix = new THREE.Matrix4();
    for(let x = 0; x < amount; x++){
        for(let y = 0; y < amount; y++)for(let z = 0; z < amount; z++){
            matrix.setPosition(offset - x, offset - y, offset - z);
            mesh.setMatrixAt(i, matrix);
            mesh.setColorAt(i, color);
            i++;
        }
    }
    mesh.castShadow = true;
    scene.add(mesh);
    //#endregion
    //GUI Handling...
    const options = {
        objectColor: "#6C0BA9",
        speed: 0.01
    };
    const geometryOptions = {
        multi: false,
        cube: false,
        sphere: false
    };
    const lightingOptions = {
        spotlightRadius: 9.0,
        spotlightPositionX: 0,
        spotlightPositionY: 0,
        spotlightPositionZ: 0,
        directionalLightPositionX: 0,
        directionalLightPositionY: 0,
        directionalLightPositionZ: 0,
        directionalLightRotationX: 0,
        directionalLightRotationY: 0,
        directionalLightRotationZ: 0,
        directionalLightIntensity: 0,
        spotlightIntensity: 0.0
    };
    var generalOptions = gui.addFolder("General Options");
    generalOptions.addColor(options, "objectColor").onChange(function(e) {
        mesh.material.color.set(e);
    });
    generalOptions.add(options, "speed", 0, 1).onChange(function(e) {
        speed = e;
    });
    var lightSettings = gui.addFolder("Lighting Settings");
    lightSettings.add(lightingOptions, "spotlightRadius", 0, 20).onChange(function(e) {
        spotLight.angle = Math.PI / e;
    });
    lightSettings.add(lightingOptions, "spotlightPositionX", -100, 100.0).onChange(function(e) {
        spotLight.position.x = e;
    });
    lightSettings.add(lightingOptions, "spotlightPositionY", -100, 100.0).onChange(function(e) {
        spotLight.position.y = e;
    });
    lightSettings.add(lightingOptions, "spotlightPositionZ", -100, 100.0).onChange(function(e) {
        spotLight.position.z = e;
    });
    lightSettings.add(lightingOptions, "directionalLightPositionX", -100, 100.0).onChange(function(e) {
        directionalLight1.position.x = e;
    });
    lightSettings.add(lightingOptions, "directionalLightPositionY", -100, 100.0).onChange(function(e) {
        directionalLight1.position.y = e;
    });
    lightSettings.add(lightingOptions, "directionalLightPositionZ", -100, 100.0).onChange(function(e) {
        directionalLight1.position.z = e;
    });
    lightSettings.add(lightingOptions, "directionalLightRotationX", 0, 360).onChange(function(e) {
        directionalLight1.rotation.x = e;
    });
    lightSettings.add(lightingOptions, "directionalLightRotationY", 0, 360).onChange(function(e) {
        directionalLight1.rotation.y = e;
    });
    lightSettings.add(lightingOptions, "directionalLightRotationZ", 0, 360).onChange(function(e) {
        directionalLight1.rotation.z = e;
    });
    lightSettings.add(lightingOptions, "spotlightIntensity", 0.0, 1.0).onChange(function(e) {
        spotLight.intensity = e;
    });
    lightSettings.add(lightingOptions, "directionalLightIntensity", 0.0, 1.0).onChange(function(e) {
        directionalLight1.intensity = e;
    });
    var geometrySettings = gui.addFolder("Geometry Settings");
    geometrySettings.add(geometryOptions, "multi").onChange(function(e) {
        setGeometryToShow(1, e);
    });
    geometrySettings.add(geometryOptions, "cube").onChange(function(e) {
        setGeometryToShow(2, e);
    });
    geometrySettings.add(geometryOptions, "sphere").onChange(function(e) {
        setGeometryToShow(3, e);
    });
    window.addEventListener("resize", onWindowResize);
    render();
}
function setGeometryToShow(geometryIndexToShow, create) {
    showMultiMesh = geometryIndexToShow === 1;
    showCube = geometryIndexToShow === 2;
    showSphere = geometryIndexToShow === 3;
    createdMesh = !create;
}
function animate(time) {
    requestAnimationFrame(animate);
    orbitControls.update();
    handleDifferentGeometry();
    step += speed;
    mesh.position.y = 10 * Math.abs(Math.sin(step));
    render();
}
function handleDifferentGeometry() {
    if (showMultiMesh) {
        if (!createdMesh) {
            scene.remove(mesh);
            const geometry = new THREE.SphereGeometry(0.5, 64, 64);
            mesh = new THREE.InstancedMesh(geometry, material, count);
            let i = 0;
            const offset = (amount - 2) / 2;
            const matrix = new THREE.Matrix4();
            for(let x = 0; x < amount; x++){
                for(let y = 0; y < amount; y++)for(let z = 0; z < amount; z++){
                    matrix.setPosition(offset - x, offset - y, offset - z);
                    mesh.setMatrixAt(i, matrix);
                    mesh.setColorAt(i, color);
                    i++;
                }
            }
            mesh.castShadow = true;
            scene.add(mesh);
            createdMesh = true;
        }
    }
    if (showCube) {
        if (!createdMesh) {
            scene.remove(mesh);
            const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
            mesh = new THREE.Mesh(cubeGeometry, material);
            scene.add(mesh);
            createdMesh = true;
        }
    }
    if (showSphere) {
        if (!createdMesh) {
            scene.remove(mesh);
            const sphereGeometry = new THREE.SphereGeometry(10, 64, 64);
            mesh = new THREE.Mesh(sphereGeometry, material);
            scene.add(mesh);
            createdMesh = true;
        }
    }
}
function render() {
    renderer.render(scene, camera);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function updatedSettings() {
    const positionSettings = {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        scaleX: 0,
        scaleY: 0,
        scaleZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        resetPosition: false,
        resetScale: false,
        resetRotation: false
    };
    var positionFolder = gui.addFolder("Mesh Transform");
    positionFolder.add(positionSettings, "positionX", -100, 100.0).onChange(function(e) {
        mesh.position.x = e;
    });
    positionFolder.add(positionSettings, "positionY", -100, 100.0).onChange(function(e) {
        mesh.position.y = e;
    });
    positionFolder.add(positionSettings, "positionZ", -100, 100.0).onChange(function(e) {
        mesh.position.z = e;
    });
    positionFolder.add(positionSettings, "scaleX", 0.0, 2.0).onChange(function(e) {
        mesh.scale.x = e;
    });
    positionFolder.add(positionSettings, "scaleY", 0.0, 2.0).onChange(function(e) {
        mesh.scale.y = e;
    });
    positionFolder.add(positionSettings, "scaleZ", 0.0, 2.0).onChange(function(e) {
        mesh.scale.z = e;
    });
    positionFolder.add(positionSettings, "rotationX", 0, Math.PI).onChange(function(e) {
        mesh.rotation.x = e;
    });
    positionFolder.add(positionSettings, "rotationY", 0, Math.PI).onChange(function(e) {
        mesh.rotation.y = e;
    });
    positionFolder.add(positionSettings, "rotationZ", 0, Math.PI).onChange(function(e) {
        mesh.rotation.z = e;
    });
    positionFolder.add(positionSettings, "resetPosition").onChange(function(e) {
        if (e) mesh.position.set(0, 0, 0);
    });
    positionFolder.add(positionSettings, "resetScale").onChange(function(e) {
        if (e) mesh.scale.set(1, 1, 1);
    });
    positionFolder.add(positionSettings, "resetRotation").onChange(function(e) {
        if (e) mesh.rotation.set(0, 0, 0);
    });
}

},{"./OrbitControls.js":"ggOw5"}]},["2iZtj","cPN6L"], "cPN6L", "parcelRequire94c2")

//# sourceMappingURL=index.9fe2884d.js.map
