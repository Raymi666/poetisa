//#region frontend/desktop.js
function e(e, t = 0) {
	return /iPhone|iPad|iPod/.test(e) || /Macintosh/.test(e) && t > 1 ? "ios" : /Android/.test(e) ? "android" : /Macintosh|Mac OS X/.test(e) ? "mac" : /Windows/.test(e) ? "windows" : "other";
}
function t(e) {
	return /Edg\//.test(e) ? "edge" : /Chrome\//.test(e) ? "chrome" : /Safari\//.test(e) && !/CriOS|FxiOS/.test(e) ? "safari" : "other";
}
function n(e, t) {
	return e === "ios" ? {
		title: "En tu iPhone o iPad",
		steps: [
			"Abre PoetisA en Safari.",
			"Pulsa Compartir. Si no lo ves, abre primero el menú de los tres puntos.",
			"Elige Agregar a Inicio. Si no aparece, búscalo en Editar acciones.",
			"Deja Abrir como app web activado, si aparece, y pulsa Agregar. Abre el nuevo icono."
		],
		note: "Para los avisos necesitas iOS o iPadOS 16.4 o posterior y abrir PoetisA desde su icono."
	} : e === "mac" && t === "safari" ? {
		title: "En tu Mac con Safari",
		steps: [
			"Abre PoetisA en Safari.",
			"En la barra superior del Mac, elige Archivo y luego Agregar al Dock.",
			"Confirma el nombre PoetisA y pulsa Agregar.",
			"Abre PoetisA desde su icono en el Dock. Inicia sesión si te lo pide."
		],
		note: "Disponible desde macOS Sonoma 14. También puedes instalarla con Chrome o Edge."
	} : t === "edge" ? {
		title: e === "mac" ? "En tu Mac con Edge" : "En Windows con Edge",
		steps: [
			"Abre PoetisA en Microsoft Edge.",
			"Pulsa el icono de instalar de la barra de direcciones. También puedes abrir el menú de tres puntos, Más herramientas y Aplicaciones.",
			"Elige Instalar este sitio como una aplicación y confirma Instalar.",
			e === "mac" ? "Abre PoetisA desde su nuevo icono. Puedes conservarlo en el Dock." : "Abre PoetisA desde su nuevo icono. Puedes anclarlo a Inicio o a la barra de tareas."
		],
		note: "Si aparece el botón Instalar ahora aquí abajo, puedes comenzar directamente desde él."
	} : e === "android" ? {
		title: "En tu teléfono Android",
		steps: [
			"Abre PoetisA en Chrome.",
			"Abre el menú de tres puntos y elige Instalar aplicación o Agregar a la pantalla principal.",
			"Confirma la instalación y abre PoetisA desde el icono."
		],
		note: "El nombre de la opción puede variar según la versión de Chrome."
	} : {
		title: e === "mac" ? "En tu Mac con Chrome" : "En tu laptop con Chrome",
		steps: [
			"Abre PoetisA en Google Chrome.",
			"Pulsa el icono de instalar de la barra de direcciones. También puedes abrir el menú de tres puntos y Transmitir, guardar y compartir.",
			"Elige Instalar página como aplicación y confirma Instalar.",
			"Abre PoetisA desde su nuevo icono. Tu cuenta y tu cuaderno siguen siendo los mismos."
		],
		note: t === "other" ? "Para instalar el piloto usa Chrome o Edge. En Mac también puedes usar Safari desde macOS Sonoma 14." : "Si aparece el botón Instalar ahora aquí abajo, puedes comenzar directamente desde él."
	};
}
function r(e, t, n) {
	let r;
	return Promise.race([e, new Promise((e, i) => {
		r = setTimeout(() => i(Error(n)), t);
	})]).finally(() => clearTimeout(r));
}
//#endregion
//#region ../../sites/wavecito-poeta/node_modules/@firebase/util/dist/postinstall.mjs
var i = () => void 0, a = function(e) {
	let t = [], n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e.charCodeAt(r);
		i < 128 ? t[n++] = i : i < 2048 ? (t[n++] = i >> 6 | 192, t[n++] = i & 63 | 128) : (i & 64512) == 55296 && r + 1 < e.length && (e.charCodeAt(r + 1) & 64512) == 56320 ? (i = 65536 + ((i & 1023) << 10) + (e.charCodeAt(++r) & 1023), t[n++] = i >> 18 | 240, t[n++] = i >> 12 & 63 | 128, t[n++] = i >> 6 & 63 | 128, t[n++] = i & 63 | 128) : (t[n++] = i >> 12 | 224, t[n++] = i >> 6 & 63 | 128, t[n++] = i & 63 | 128);
	}
	return t;
}, o = function(e) {
	let t = [], n = 0, r = 0;
	for (; n < e.length;) {
		let i = e[n++];
		if (i < 128) t[r++] = String.fromCharCode(i);
		else if (i > 191 && i < 224) {
			let a = e[n++];
			t[r++] = String.fromCharCode((i & 31) << 6 | a & 63);
		} else if (i > 239 && i < 365) {
			let a = e[n++], o = e[n++], s = e[n++], c = ((i & 7) << 18 | (a & 63) << 12 | (o & 63) << 6 | s & 63) - 65536;
			t[r++] = String.fromCharCode(55296 + (c >> 10)), t[r++] = String.fromCharCode(56320 + (c & 1023));
		} else {
			let a = e[n++], o = e[n++];
			t[r++] = String.fromCharCode((i & 15) << 12 | (a & 63) << 6 | o & 63);
		}
	}
	return t.join("");
}, s = {
	byteToCharMap_: null,
	charToByteMap_: null,
	byteToCharMapWebSafe_: null,
	charToByteMapWebSafe_: null,
	ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	get ENCODED_VALS() {
		return this.ENCODED_VALS_BASE + "+/=";
	},
	get ENCODED_VALS_WEBSAFE() {
		return this.ENCODED_VALS_BASE + "-_.";
	},
	HAS_NATIVE_SUPPORT: typeof atob == "function",
	encodeByteArray(e, t) {
		if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
		this.init_();
		let n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [];
		for (let t = 0; t < e.length; t += 3) {
			let i = e[t], a = t + 1 < e.length, o = a ? e[t + 1] : 0, s = t + 2 < e.length, c = s ? e[t + 2] : 0, l = i >> 2, u = (i & 3) << 4 | o >> 4, d = (o & 15) << 2 | c >> 6, ee = c & 63;
			s || (ee = 64, a || (d = 64)), r.push(n[l], n[u], n[d], n[ee]);
		}
		return r.join("");
	},
	encodeString(e, t) {
		return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(a(e), t);
	},
	decodeString(e, t) {
		return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : o(this.decodeStringToByteArray(e, t));
	},
	decodeStringToByteArray(e, t) {
		this.init_();
		let n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [];
		for (let t = 0; t < e.length;) {
			let i = n[e.charAt(t++)], a = t < e.length ? n[e.charAt(t)] : 0;
			++t;
			let o = t < e.length ? n[e.charAt(t)] : 64;
			++t;
			let s = t < e.length ? n[e.charAt(t)] : 64;
			if (++t, i == null || a == null || o == null || s == null) throw new c();
			let l = i << 2 | a >> 4;
			if (r.push(l), o !== 64) {
				let e = a << 4 & 240 | o >> 2;
				if (r.push(e), s !== 64) {
					let e = o << 6 & 192 | s;
					r.push(e);
				}
			}
		}
		return r;
	},
	init_() {
		if (!this.byteToCharMap_) {
			this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
			for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e);
		}
	}
}, c = class extends Error {
	constructor() {
		super(...arguments), this.name = "DecodeBase64StringError";
	}
}, l = function(e) {
	let t = a(e);
	return s.encodeByteArray(t, !0);
}, u = function(e) {
	return l(e).replace(/\./g, "");
}, d = function(e) {
	try {
		return s.decodeString(e, !0);
	} catch (e) {
		console.error("base64Decode failed: ", e);
	}
	return null;
};
function ee() {
	if (typeof self < "u") return self;
	if (typeof window < "u") return window;
	if (typeof global < "u") return global;
	throw Error("Unable to locate global object.");
}
var te = () => ee().__FIREBASE_DEFAULTS__, ne = () => {
	if (typeof process > "u" || process.env === void 0) return;
	let e = process.env.__FIREBASE_DEFAULTS__;
	if (e) return JSON.parse(e);
}, re = () => {
	if (typeof document > "u") return;
	let e;
	try {
		e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
	} catch {
		return;
	}
	let t = e && d(e[1]);
	return t && JSON.parse(t);
}, ie = () => {
	try {
		return i() || te() || ne() || re();
	} catch (e) {
		console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
		return;
	}
}, ae = (e) => ie()?.emulatorHosts?.[e], oe = () => ie()?.config, se = (e) => ie()?.[`_${e}`], ce = class {
	constructor() {
		this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise((e, t) => {
			this.resolve = e, this.reject = t;
		});
	}
	wrapCallback(e) {
		return (t, n) => {
			t ? this.reject(t) : this.resolve(n), typeof e == "function" && (this.promise.catch(() => {}), e.length === 1 ? e(t) : e(t, n));
		};
	}
};
function f() {
	return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : "";
}
function le() {
	return typeof window < "u" && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(f());
}
function ue() {
	return typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers";
}
function de() {
	let e = typeof chrome == "object" ? chrome.runtime : typeof browser == "object" ? browser.runtime : void 0;
	return typeof e == "object" && e.id !== void 0;
}
function fe() {
	return typeof navigator == "object" && navigator.product === "ReactNative";
}
function pe() {
	let e = f();
	return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0;
}
function me() {
	try {
		return typeof indexedDB == "object";
	} catch {
		return !1;
	}
}
function he() {
	return new Promise((e, t) => {
		try {
			let n = !0, r = "validate-browser-context-for-indexeddb-analytics-module", i = self.indexedDB.open(r);
			i.onsuccess = () => {
				i.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
			}, i.onupgradeneeded = () => {
				n = !1;
			}, i.onerror = () => {
				t(i.error?.message || "");
			};
		} catch (e) {
			t(e);
		}
	});
}
var ge = "FirebaseError", p = class e extends Error {
	constructor(t, n, r) {
		super(n), this.code = t, this.customData = r, this.name = ge, Object.setPrototypeOf(this, e.prototype), Error.captureStackTrace && Error.captureStackTrace(this, _e.prototype.create);
	}
}, _e = class {
	constructor(e, t, n) {
		this.service = e, this.serviceName = t, this.errors = n;
	}
	create(e, ...t) {
		let n = t[0] || {}, r = `${this.service}/${e}`, i = this.errors[e], a = i ? ve(i, n) : "Error";
		return new p(r, `${this.serviceName}: ${a} (${r}).`, n);
	}
};
function ve(e, t) {
	try {
		let n = 0, r = "";
		for (; n < e.length;) {
			let i = e.indexOf("{$", n);
			if (i === -1) {
				r += e.substring(n);
				break;
			}
			let a = e.indexOf("}", i + 2);
			if (a === -1) {
				r += e.substring(n);
				break;
			}
			let o = e.substring(i + 2, a), s = t[o];
			r += e.substring(n, i) + (s == null ? `<${o}?>` : String(s)), n = a + 1;
		}
		return r;
	} catch {
		return e;
	}
}
function ye(e) {
	for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}
function m(e, t) {
	if (e === t) return !0;
	let n = Object.keys(e), r = Object.keys(t);
	for (let i of n) {
		if (!r.includes(i)) return !1;
		let n = e[i], a = t[i];
		if (be(n) && be(a)) {
			if (!m(n, a)) return !1;
		} else if (n !== a) return !1;
	}
	for (let e of r) if (!n.includes(e)) return !1;
	return !0;
}
function be(e) {
	return typeof e == "object" && !!e;
}
function xe(e) {
	let t = [];
	for (let [n, r] of Object.entries(e)) Array.isArray(r) ? r.forEach((e) => {
		t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e));
	}) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
	return t.length ? "&" + t.join("&") : "";
}
function Se(e) {
	let t = {};
	return e.replace(/^\?/, "").split("&").forEach((e) => {
		if (e) {
			let [n, r] = e.split("=");
			t[decodeURIComponent(n)] = decodeURIComponent(r);
		}
	}), t;
}
function Ce(e) {
	let t = e.indexOf("?");
	if (!t) return "";
	let n = e.indexOf("#", t);
	return e.substring(t, n > 0 ? n : void 0);
}
function we(e, t) {
	let n = new Te(e, t);
	return n.subscribe.bind(n);
}
var Te = class {
	constructor(e, t) {
		this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then(() => {
			e(this);
		}).catch((e) => {
			this.error(e);
		});
	}
	next(e) {
		this.forEachObserver((t) => {
			t.next(e);
		});
	}
	error(e) {
		this.forEachObserver((t) => {
			t.error(e);
		}), this.close(e);
	}
	complete() {
		this.forEachObserver((e) => {
			e.complete();
		}), this.close();
	}
	subscribe(e, t, n) {
		let r;
		if (e === void 0 && t === void 0 && n === void 0) throw Error("Missing Observer.");
		r = Ee(e, [
			"next",
			"error",
			"complete"
		]) ? e : {
			next: e,
			error: t,
			complete: n
		}, r.next === void 0 && (r.next = De), r.error === void 0 && (r.error = De), r.complete === void 0 && (r.complete = De);
		let i = this.unsubscribeOne.bind(this, this.observers.length);
		return this.finalized && this.task.then(() => {
			try {
				this.finalError ? r.error(this.finalError) : r.complete();
			} catch {}
		}), this.observers.push(r), i;
	}
	unsubscribeOne(e) {
		this.observers === void 0 || this.observers[e] === void 0 || (delete this.observers[e], --this.observerCount, this.observerCount === 0 && this.onNoObservers !== void 0 && this.onNoObservers(this));
	}
	forEachObserver(e) {
		if (!this.finalized) for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
	}
	sendOne(e, t) {
		this.task.then(() => {
			if (this.observers !== void 0 && this.observers[e] !== void 0) try {
				t(this.observers[e]);
			} catch (e) {
				typeof console < "u" && console.error && console.error(e);
			}
		});
	}
	close(e) {
		this.finalized || (this.finalized = !0, e !== void 0 && (this.finalError = e), this.task.then(() => {
			this.observers = void 0, this.onNoObservers = void 0;
		}));
	}
};
function Ee(e, t) {
	if (typeof e != "object" || !e) return !1;
	for (let n of t) if (n in e && typeof e[n] == "function") return !0;
	return !1;
}
function De() {}
function h(e) {
	return e && e._delegate ? e._delegate : e;
}
function Oe(e) {
	try {
		return (e.startsWith("http://") || e.startsWith("https://") ? new URL(e).hostname : e).endsWith(".cloudworkstations.dev");
	} catch {
		return !1;
	}
}
async function ke(e) {
	return (await fetch(e, { credentials: "include" })).ok;
}
//#endregion
//#region ../../sites/wavecito-poeta/node_modules/@firebase/component/dist/esm/index.esm.js
var Ae = class {
	constructor(e, t, n) {
		this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
	}
	setInstantiationMode(e) {
		return this.instantiationMode = e, this;
	}
	setMultipleInstances(e) {
		return this.multipleInstances = e, this;
	}
	setServiceProps(e) {
		return this.serviceProps = e, this;
	}
	setInstanceCreatedCallback(e) {
		return this.onInstanceCreated = e, this;
	}
}, g = "[DEFAULT]", je = class {
	constructor(e, t) {
		this.name = e, this.container = t, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
	}
	get(e) {
		let t = this.normalizeInstanceIdentifier(e);
		if (!this.instancesDeferred.has(t)) {
			let e = new ce();
			if (this.instancesDeferred.set(t, e), this.isInitialized(t) || this.shouldAutoInitialize()) try {
				let n = this.getOrInitializeService({ instanceIdentifier: t });
				n && e.resolve(n);
			} catch {}
		}
		return this.instancesDeferred.get(t).promise;
	}
	getImmediate(e) {
		let t = this.normalizeInstanceIdentifier(e?.identifier), n = e?.optional ?? !1;
		if (this.isInitialized(t) || this.shouldAutoInitialize()) try {
			return this.getOrInitializeService({ instanceIdentifier: t });
		} catch (e) {
			if (n) return null;
			throw e;
		}
		else if (n) return null;
		else throw Error(`Service ${this.name} is not available`);
	}
	getComponent() {
		return this.component;
	}
	setComponent(e) {
		if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
		if (this.component) throw Error(`Component for ${this.name} has already been provided`);
		if (this.component = e, this.shouldAutoInitialize()) {
			if (Ne(e)) try {
				this.getOrInitializeService({ instanceIdentifier: g });
			} catch {}
			for (let [e, t] of this.instancesDeferred.entries()) {
				let n = this.normalizeInstanceIdentifier(e);
				try {
					let e = this.getOrInitializeService({ instanceIdentifier: n });
					t.resolve(e);
				} catch {}
			}
		}
	}
	clearInstance(e = g) {
		this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
	}
	async delete() {
		let e = Array.from(this.instances.values());
		await Promise.all([...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()), ...e.filter((e) => "_delete" in e).map((e) => e._delete())]);
	}
	isComponentSet() {
		return this.component != null;
	}
	isInitialized(e = g) {
		return this.instances.has(e);
	}
	getOptions(e = g) {
		return this.instancesOptions.get(e) || {};
	}
	initialize(e = {}) {
		let { options: t = {} } = e, n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
		if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
		if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
		let r = this.getOrInitializeService({
			instanceIdentifier: n,
			options: t
		});
		for (let [e, t] of this.instancesDeferred.entries()) n === this.normalizeInstanceIdentifier(e) && t.resolve(r);
		return r;
	}
	onInit(e, t) {
		let n = this.normalizeInstanceIdentifier(t), r = this.onInitCallbacks.get(n) ?? /* @__PURE__ */ new Set();
		r.add(e), this.onInitCallbacks.set(n, r);
		let i = this.instances.get(n);
		return i && e(i, n), () => {
			r.delete(e);
		};
	}
	invokeOnInitCallbacks(e, t) {
		let n = this.onInitCallbacks.get(t);
		if (n) for (let r of n) try {
			r(e, t);
		} catch {}
	}
	getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
		let n = this.instances.get(e);
		if (!n && this.component && (n = this.component.instanceFactory(this.container, {
			instanceIdentifier: Me(e),
			options: t
		}), this.instances.set(e, n), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(n, e), this.component.onInstanceCreated)) try {
			this.component.onInstanceCreated(this.container, e, n);
		} catch {}
		return n || null;
	}
	normalizeInstanceIdentifier(e = g) {
		return this.component ? this.component.multipleInstances ? e : g : e;
	}
	shouldAutoInitialize() {
		return !!this.component && this.component.instantiationMode !== "EXPLICIT";
	}
};
function Me(e) {
	return e === g ? void 0 : e;
}
function Ne(e) {
	return e.instantiationMode === "EAGER";
}
var Pe = class {
	constructor(e) {
		this.name = e, this.providers = /* @__PURE__ */ new Map();
	}
	addComponent(e) {
		let t = this.getProvider(e.name);
		if (t.isComponentSet()) throw Error(`Component ${e.name} has already been registered with ${this.name}`);
		t.setComponent(e);
	}
	addOrOverwriteComponent(e) {
		this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
	}
	getProvider(e) {
		if (this.providers.has(e)) return this.providers.get(e);
		let t = new je(e, this);
		return this.providers.set(e, t), t;
	}
	getProviders() {
		return Array.from(this.providers.values());
	}
}, Fe = [], _;
(function(e) {
	e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT";
})(_ ||= {});
var Ie = {
	debug: _.DEBUG,
	verbose: _.VERBOSE,
	info: _.INFO,
	warn: _.WARN,
	error: _.ERROR,
	silent: _.SILENT
}, Le = _.INFO, Re = {
	[_.DEBUG]: "log",
	[_.VERBOSE]: "log",
	[_.INFO]: "info",
	[_.WARN]: "warn",
	[_.ERROR]: "error"
}, ze = (e, t, ...n) => {
	if (t < e.logLevel) return;
	let r = (/* @__PURE__ */ new Date()).toISOString(), i = Re[t];
	if (i) console[i](`[${r}]  ${e.name}:`, ...n);
	else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`);
}, Be = class {
	constructor(e) {
		this.name = e, this._logLevel = Le, this._logHandler = ze, this._userLogHandler = null, Fe.push(this);
	}
	get logLevel() {
		return this._logLevel;
	}
	set logLevel(e) {
		if (!(e in _)) throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
		this._logLevel = e;
	}
	setLogLevel(e) {
		this._logLevel = typeof e == "string" ? Ie[e] : e;
	}
	get logHandler() {
		return this._logHandler;
	}
	set logHandler(e) {
		if (typeof e != "function") throw TypeError("Value assigned to `logHandler` must be a function");
		this._logHandler = e;
	}
	get userLogHandler() {
		return this._userLogHandler;
	}
	set userLogHandler(e) {
		this._userLogHandler = e;
	}
	debug(...e) {
		this._userLogHandler && this._userLogHandler(this, _.DEBUG, ...e), this._logHandler(this, _.DEBUG, ...e);
	}
	log(...e) {
		this._userLogHandler && this._userLogHandler(this, _.VERBOSE, ...e), this._logHandler(this, _.VERBOSE, ...e);
	}
	info(...e) {
		this._userLogHandler && this._userLogHandler(this, _.INFO, ...e), this._logHandler(this, _.INFO, ...e);
	}
	warn(...e) {
		this._userLogHandler && this._userLogHandler(this, _.WARN, ...e), this._logHandler(this, _.WARN, ...e);
	}
	error(...e) {
		this._userLogHandler && this._userLogHandler(this, _.ERROR, ...e), this._logHandler(this, _.ERROR, ...e);
	}
}, Ve = (e, t) => t.some((t) => e instanceof t), He, Ue;
function We() {
	return He ||= [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	];
}
function Ge() {
	return Ue ||= [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	];
}
var Ke = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap();
function Ze(e) {
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("success", i), e.removeEventListener("error", a);
		}, i = () => {
			t(v(e.result)), r();
		}, a = () => {
			n(e.error), r();
		};
		e.addEventListener("success", i), e.addEventListener("error", a);
	});
	return t.then((t) => {
		t instanceof IDBCursor && Ke.set(t, e);
	}).catch(() => {}), Xe.set(t, e), t;
}
function Qe(e) {
	if (qe.has(e)) return;
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("complete", i), e.removeEventListener("error", a), e.removeEventListener("abort", a);
		}, i = () => {
			t(), r();
		}, a = () => {
			n(e.error || new DOMException("AbortError", "AbortError")), r();
		};
		e.addEventListener("complete", i), e.addEventListener("error", a), e.addEventListener("abort", a);
	});
	qe.set(e, t);
}
var $e = {
	get(e, t, n) {
		if (e instanceof IDBTransaction) {
			if (t === "done") return qe.get(e);
			if (t === "objectStoreNames") return e.objectStoreNames || Je.get(e);
			if (t === "store") return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
		}
		return v(e[t]);
	},
	set(e, t, n) {
		return e[t] = n, !0;
	},
	has(e, t) {
		return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
	}
};
function et(e) {
	$e = e($e);
}
function tt(e) {
	return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
		let r = e.call(rt(this), t, ...n);
		return Je.set(r, t.sort ? t.sort() : [t]), v(r);
	} : Ge().includes(e) ? function(...t) {
		return e.apply(rt(this), t), v(Ke.get(this));
	} : function(...t) {
		return v(e.apply(rt(this), t));
	};
}
function nt(e) {
	return typeof e == "function" ? tt(e) : (e instanceof IDBTransaction && Qe(e), Ve(e, We()) ? new Proxy(e, $e) : e);
}
function v(e) {
	if (e instanceof IDBRequest) return Ze(e);
	if (Ye.has(e)) return Ye.get(e);
	let t = nt(e);
	return t !== e && (Ye.set(e, t), Xe.set(t, e)), t;
}
var rt = (e) => Xe.get(e);
//#endregion
//#region ../../sites/wavecito-poeta/node_modules/idb/build/index.js
function it(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
	let o = indexedDB.open(e, t), s = v(o);
	return r && o.addEventListener("upgradeneeded", (e) => {
		r(v(o.result), e.oldVersion, e.newVersion, v(o.transaction), e);
	}), n && o.addEventListener("blocked", (e) => n(e.oldVersion, e.newVersion, e)), s.then((e) => {
		a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", (e) => i(e.oldVersion, e.newVersion, e));
	}).catch(() => {}), s;
}
var at = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
], ot = [
	"put",
	"add",
	"delete",
	"clear"
], st = /* @__PURE__ */ new Map();
function ct(e, t) {
	if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
	if (st.get(t)) return st.get(t);
	let n = t.replace(/FromIndex$/, ""), r = t !== n, i = ot.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || at.includes(n))) return;
	let a = async function(e, ...t) {
		let a = this.transaction(e, i ? "readwrite" : "readonly"), o = a.store;
		return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0];
	};
	return st.set(t, a), a;
}
et((e) => ({
	...e,
	get: (t, n, r) => ct(t, n) || e.get(t, n, r),
	has: (t, n) => !!ct(t, n) || e.has(t, n)
}));
//#endregion
//#region ../../sites/wavecito-poeta/node_modules/@firebase/app/dist/esm/index.esm.js
var lt = class {
	constructor(e) {
		this.container = e;
	}
	getPlatformInfoString() {
		return this.container.getProviders().map((e) => {
			if (ut(e)) {
				let t = e.getImmediate();
				return `${t.library}/${t.version}`;
			} else return null;
		}).filter((e) => e).join(" ");
	}
};
function ut(e) {
	return e.getComponent()?.type === "VERSION";
}
var dt = "@firebase/app", ft = "0.16.2", y = new Be("@firebase/app"), pt = "@firebase/app-compat", mt = "@firebase/analytics-compat", ht = "@firebase/analytics", gt = "@firebase/app-check-compat", _t = "@firebase/app-check", vt = "@firebase/auth", yt = "@firebase/auth-compat", bt = "@firebase/database", xt = "@firebase/data-connect", St = "@firebase/database-compat", Ct = "@firebase/functions", wt = "@firebase/functions-compat", Tt = "@firebase/installations", Et = "@firebase/installations-compat", Dt = "@firebase/messaging", Ot = "@firebase/messaging-compat", kt = "@firebase/performance", At = "@firebase/performance-compat", jt = "@firebase/remote-config", Mt = "@firebase/remote-config-compat", Nt = "@firebase/storage", Pt = "@firebase/storage-compat", Ft = "@firebase/firestore", It = "@firebase/ai", Lt = "@firebase/firestore-compat", Rt = "firebase", zt = "12.19.0", Bt = "[DEFAULT]", Vt = {
	[dt]: "fire-core",
	[pt]: "fire-core-compat",
	[ht]: "fire-analytics",
	[mt]: "fire-analytics-compat",
	[_t]: "fire-app-check",
	[gt]: "fire-app-check-compat",
	[vt]: "fire-auth",
	[yt]: "fire-auth-compat",
	[bt]: "fire-rtdb",
	[xt]: "fire-data-connect",
	[St]: "fire-rtdb-compat",
	[Ct]: "fire-fn",
	[wt]: "fire-fn-compat",
	[Tt]: "fire-iid",
	[Et]: "fire-iid-compat",
	[Dt]: "fire-fcm",
	[Ot]: "fire-fcm-compat",
	[kt]: "fire-perf",
	[At]: "fire-perf-compat",
	[jt]: "fire-rc",
	[Mt]: "fire-rc-compat",
	[Nt]: "fire-gcs",
	[Pt]: "fire-gcs-compat",
	[Ft]: "fire-fst",
	[Lt]: "fire-fst-compat",
	[It]: "fire-vertex",
	"fire-js": "fire-js",
	[Rt]: "fire-js-all"
}, Ht = /* @__PURE__ */ new Map(), Ut = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ new Map();
function Gt(e, t) {
	try {
		e.container.addComponent(t);
	} catch (n) {
		y.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
	}
}
function Kt(e) {
	let t = e.name;
	if (Wt.has(t)) return y.debug(`There were multiple attempts to register component ${t}.`), !1;
	Wt.set(t, e);
	for (let t of Ht.values()) Gt(t, e);
	for (let t of Ut.values()) Gt(t, e);
	return !0;
}
function qt(e, t) {
	let n = e.container.getProvider("heartbeat").getImmediate({ optional: !0 });
	return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
function b(e) {
	return e == null ? !1 : e.settings !== void 0;
}
var x = new _e("app", "Firebase", {
	"no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
	"bad-app-name": "Illegal App name: '{$appName}'",
	"duplicate-app": "Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.",
	"app-deleted": "Firebase App named '{$appName}' already deleted",
	"server-app-deleted": "Firebase Server App has been deleted",
	"no-options": "Need to provide options, when not being deployed to hosting via source.",
	"invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
	"invalid-log-argument": "First argument to `onLog` must be null or a function.",
	"idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
	"idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
	"idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
	"idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
	"finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
	"invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}), Jt = class {
	constructor(e, t, n) {
		this._isDeleted = !1, this._options = { ...e }, this._config = { ...t }, this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new Ae("app", () => this, "PUBLIC"));
	}
	get automaticDataCollectionEnabled() {
		return this.checkDestroyed(), this._automaticDataCollectionEnabled;
	}
	set automaticDataCollectionEnabled(e) {
		this.checkDestroyed(), this._automaticDataCollectionEnabled = e;
	}
	get name() {
		return this.checkDestroyed(), this._name;
	}
	get options() {
		return this.checkDestroyed(), this._options;
	}
	get config() {
		return this.checkDestroyed(), this._config;
	}
	get container() {
		return this._container;
	}
	get isDeleted() {
		return this._isDeleted;
	}
	set isDeleted(e) {
		this._isDeleted = e;
	}
	checkDestroyed() {
		if (this.isDeleted) throw x.create("app-deleted", { appName: this._name });
	}
}, Yt = zt;
function Xt(e, t = {}) {
	let n = e;
	typeof t != "object" && (t = { name: t });
	let r = {
		name: Bt,
		automaticDataCollectionEnabled: !0,
		...t
	}, i = r.name;
	if (typeof i != "string" || !i) throw x.create("bad-app-name", { appName: String(i) });
	if (n ||= oe(), !n) throw x.create("no-options");
	let a = Ht.get(i);
	if (a) {
		if (!m(n, a.options)) throw x.create("duplicate-app", {
			appName: i,
			mismatchedParam: "options",
			oldValue: JSON.stringify(a.options),
			newValue: JSON.stringify(n)
		});
		if (m(r, a.config)) return a;
		throw x.create("duplicate-app", {
			appName: i,
			mismatchedParam: "config",
			oldValue: JSON.stringify(a.config),
			newValue: JSON.stringify(r)
		});
	}
	let o = new Pe(i);
	for (let e of Wt.values()) o.addComponent(e);
	let s = new Jt(n, r, o);
	return Ht.set(i, s), s;
}
function Zt(e = Bt) {
	let t = Ht.get(e);
	if (!t && e === "[DEFAULT]" && oe()) return Xt();
	if (!t) throw x.create("no-app", { appName: e });
	return t;
}
function Qt(e, t, n) {
	let r = Vt[e] ?? e;
	n && (r += `-${n}`);
	let i = r.match(/\s|\//), a = t.match(/\s|\//);
	if (i || a) {
		let e = [`Unable to register library "${r}" with version "${t}":`];
		i && e.push(`library name "${r}" contains illegal characters (whitespace or "/")`), i && a && e.push("and"), a && e.push(`version name "${t}" contains illegal characters (whitespace or "/")`), y.warn(e.join(" "));
		return;
	}
	Kt(new Ae(`${r}-version`, () => ({
		library: r,
		version: t
	}), "VERSION"));
}
var $t = "firebase-heartbeat-database", en = 1, tn = "firebase-heartbeat-store", nn = null;
function rn() {
	return nn ||= it($t, en, { upgrade: (e, t) => {
		switch (t) {
			case 0: try {
				e.createObjectStore(tn);
			} catch (e) {
				console.warn(e);
			}
		}
	} }).catch((e) => {
		throw x.create("idb-open", { originalErrorMessage: e.message });
	}), nn;
}
async function an(e) {
	try {
		let t = (await rn()).transaction(tn), n = await t.objectStore(tn).get(sn(e));
		return await t.done, n;
	} catch (e) {
		if (e instanceof p) y.warn(e.message);
		else {
			let t = x.create("idb-get", { originalErrorMessage: e?.message });
			y.warn(t.message);
		}
	}
}
async function on(e, t) {
	try {
		let n = (await rn()).transaction(tn, "readwrite");
		await n.objectStore(tn).put(t, sn(e)), await n.done;
	} catch (e) {
		if (e instanceof p) y.warn(e.message);
		else {
			let t = x.create("idb-set", { originalErrorMessage: e?.message });
			y.warn(t.message);
		}
	}
}
function sn(e) {
	return `${e.name}!${e.options.appId}`;
}
var cn = 1024, ln = 30, un = class {
	constructor(e) {
		this.container = e, this._heartbeatsCache = null;
		let t = this.container.getProvider("app").getImmediate();
		this._storage = new pn(t), this._heartbeatsCachePromise = this._storage.read().then((e) => (this._heartbeatsCache = e, e));
	}
	async triggerHeartbeat() {
		try {
			let e = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), t = dn();
			if (this._heartbeatsCache?.heartbeats == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, this._heartbeatsCache?.heartbeats == null) || this._heartbeatsCache.lastSentHeartbeatDate === t || this._heartbeatsCache.heartbeats.some((e) => e.date === t)) return;
			if (this._heartbeatsCache.heartbeats.push({
				date: t,
				agent: e
			}), this._heartbeatsCache.heartbeats.length > ln) {
				let e = hn(this._heartbeatsCache.heartbeats);
				this._heartbeatsCache.heartbeats.splice(e, 1);
			}
			return this._storage.overwrite(this._heartbeatsCache);
		} catch (e) {
			y.warn(e);
		}
	}
	async getHeartbeatsHeader() {
		try {
			if (this._heartbeatsCache === null && await this._heartbeatsCachePromise, this._heartbeatsCache?.heartbeats == null || this._heartbeatsCache.heartbeats.length === 0) return "";
			let e = dn(), { heartbeatsToSend: t, unsentEntries: n } = fn(this._heartbeatsCache.heartbeats), r = u(JSON.stringify({
				version: 2,
				heartbeats: t
			}));
			return this._heartbeatsCache.lastSentHeartbeatDate = e, n.length > 0 ? (this._heartbeatsCache.heartbeats = n, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), r;
		} catch (e) {
			return y.warn(e), "";
		}
	}
};
function dn() {
	return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function fn(e, t = cn) {
	let n = [], r = e.slice();
	for (let i of e) {
		let e = n.find((e) => e.agent === i.agent);
		if (!e) {
			if (n.push({
				agent: i.agent,
				dates: [i.date]
			}), mn(n) > t) {
				n.pop();
				break;
			}
		} else if (e.dates.push(i.date), mn(n) > t) {
			e.dates.pop();
			break;
		}
		r = r.slice(1);
	}
	return {
		heartbeatsToSend: n,
		unsentEntries: r
	};
}
var pn = class {
	constructor(e) {
		this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
	}
	async runIndexedDBEnvironmentCheck() {
		return me() ? he().then(() => !0).catch(() => !1) : !1;
	}
	async read() {
		if (await this._canUseIndexedDBPromise) {
			let e = await an(this.app);
			return e?.heartbeats ? e : { heartbeats: [] };
		} else return { heartbeats: [] };
	}
	async overwrite(e) {
		if (await this._canUseIndexedDBPromise) {
			let t = await this.read();
			return on(this.app, {
				lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? t.lastSentHeartbeatDate,
				heartbeats: e.heartbeats
			});
		} else return;
	}
	async add(e) {
		if (await this._canUseIndexedDBPromise) {
			let t = await this.read();
			return on(this.app, {
				lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? t.lastSentHeartbeatDate,
				heartbeats: [...t.heartbeats, ...e.heartbeats]
			});
		} else return;
	}
};
function mn(e) {
	return u(JSON.stringify({
		version: 2,
		heartbeats: e
	})).length;
}
function hn(e) {
	if (e.length === 0) return -1;
	let t = 0, n = e[0].date;
	for (let r = 1; r < e.length; r++) e[r].date < n && (n = e[r].date, t = r);
	return t;
}
function gn(e) {
	Kt(new Ae("platform-logger", (e) => new lt(e), "PRIVATE")), Kt(new Ae("heartbeat", (e) => new un(e), "PRIVATE")), Qt(dt, ft, e), Qt(dt, ft, "esm2020"), Qt("fire-js", "");
}
//#endregion
//#region ../../sites/wavecito-poeta/node_modules/firebase/app/dist/esm/index.esm.js
gn(""), Qt("firebase", "12.19.0", "app");
//#endregion
//#region ../../sites/wavecito-poeta/node_modules/@firebase/auth/dist/esm/index-4NFEPWkC.js
function _n() {
	return { "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK." };
}
var vn = _n, yn = new _e("auth", "Firebase", _n()), bn = new Be("@firebase/auth");
function xn(e, ...t) {
	bn.logLevel <= _.WARN && bn.warn(`Auth (${Yt}): ${e}`, ...t);
}
function Sn(e, ...t) {
	bn.logLevel <= _.ERROR && bn.error(`Auth (${Yt}): ${e}`, ...t);
}
function S(e, ...t) {
	throw wn(e, ...t);
}
function C(e, ...t) {
	return wn(e, ...t);
}
function Cn(e, t, n) {
	return new _e("auth", "Firebase", {
		...vn(),
		[t]: n
	}).create(t, { appName: e.name });
}
function w(e) {
	return Cn(e, "operation-not-supported-in-this-environment", "Operations that alter the current user are not supported in conjunction with FirebaseServerApp");
}
function wn(e, ...t) {
	if (typeof e != "string") {
		let n = t[0], r = [...t.slice(1)];
		return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r);
	}
	return yn.create(e, ...t);
}
function T(e, t, ...n) {
	if (!e) throw wn(t, ...n);
}
function E(e) {
	let t = "INTERNAL ASSERTION FAILED: " + e;
	throw Sn(t), Error(t);
}
function D(e, t) {
	e || E(t);
}
function Tn() {
	return typeof self < "u" && self.location?.href || "";
}
function En() {
	return Dn() === "http:" || Dn() === "https:";
}
function Dn() {
	return typeof self < "u" && self.location?.protocol || null;
}
function On() {
	return typeof navigator < "u" && navigator && "onLine" in navigator && typeof navigator.onLine == "boolean" && (En() || de() || "connection" in navigator) ? navigator.onLine : !0;
}
function kn() {
	if (typeof navigator > "u") return null;
	let e = navigator;
	return e.languages && e.languages[0] || e.language || null;
}
var An = class {
	constructor(e, t) {
		this.shortDelay = e, this.longDelay = t, D(t > e, "Short delay should be less than long delay!"), this.isMobile = le() || fe();
	}
	get() {
		return On() ? this.isMobile ? this.longDelay : this.shortDelay : Math.min(5e3, this.shortDelay);
	}
};
function jn(e, t) {
	D(e.emulator, "Emulator should always be set here");
	let { url: n } = e.emulator;
	return t ? `${n}${t.startsWith("/") ? t.slice(1) : t}` : n;
}
var Mn = class {
	static initialize(e, t, n) {
		this.fetchImpl = e, t && (this.headersImpl = t), n && (this.responseImpl = n);
	}
	static fetch() {
		if (this.fetchImpl) return this.fetchImpl;
		if (typeof self < "u" && "fetch" in self) return self.fetch;
		if (typeof globalThis < "u" && globalThis.fetch) return globalThis.fetch;
		if (typeof fetch < "u") return fetch;
		E("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static headers() {
		if (this.headersImpl) return this.headersImpl;
		if (typeof self < "u" && "Headers" in self) return self.Headers;
		if (typeof globalThis < "u" && globalThis.Headers) return globalThis.Headers;
		if (typeof Headers < "u") return Headers;
		E("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static response() {
		if (this.responseImpl) return this.responseImpl;
		if (typeof self < "u" && "Response" in self) return self.Response;
		if (typeof globalThis < "u" && globalThis.Response) return globalThis.Response;
		if (typeof Response < "u") return Response;
		E("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
}, Nn = {
	CREDENTIAL_MISMATCH: "custom-token-mismatch",
	MISSING_CUSTOM_TOKEN: "internal-error",
	INVALID_IDENTIFIER: "invalid-email",
	MISSING_CONTINUE_URI: "internal-error",
	INVALID_PASSWORD: "wrong-password",
	MISSING_PASSWORD: "missing-password",
	INVALID_LOGIN_CREDENTIALS: "invalid-credential",
	EMAIL_EXISTS: "email-already-in-use",
	PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
	INVALID_IDP_RESPONSE: "invalid-credential",
	INVALID_PENDING_TOKEN: "invalid-credential",
	FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
	MISSING_REQ_TYPE: "internal-error",
	EMAIL_NOT_FOUND: "user-not-found",
	RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
	EXPIRED_OOB_CODE: "expired-action-code",
	INVALID_OOB_CODE: "invalid-action-code",
	MISSING_OOB_CODE: "internal-error",
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
	INVALID_ID_TOKEN: "invalid-user-token",
	TOKEN_EXPIRED: "user-token-expired",
	USER_NOT_FOUND: "user-token-expired",
	TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
	PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
	INVALID_CODE: "invalid-verification-code",
	INVALID_SESSION_INFO: "invalid-verification-id",
	INVALID_TEMPORARY_PROOF: "invalid-credential",
	MISSING_SESSION_INFO: "missing-verification-id",
	SESSION_EXPIRED: "code-expired",
	MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
	UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
	INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
	ADMIN_ONLY_OPERATION: "admin-restricted-operation",
	INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
	MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
	MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
	MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
	SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
	SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
	BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
	RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
	MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
	INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
	INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
	MISSING_CLIENT_TYPE: "missing-client-type",
	MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
	INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
	INVALID_REQ_TYPE: "invalid-req-type"
}, Pn = [
	"/v1/accounts:signInWithCustomToken",
	"/v1/accounts:signInWithEmailLink",
	"/v1/accounts:signInWithIdp",
	"/v1/accounts:signInWithPassword",
	"/v1/accounts:signInWithPhoneNumber",
	"/v1/token"
], Fn = new An(3e4, 6e4);
function O(e, t) {
	return e.tenantId && !t.tenantId ? {
		...t,
		tenantId: e.tenantId
	} : t;
}
async function k(e, t, n, r, i = {}) {
	return In(e, i, async () => {
		let i = {}, a = {};
		r && (t === "GET" ? a = r : i = { body: JSON.stringify(r) });
		let o = xe({
			...a,
			key: e.config.apiKey
		}).slice(1), s = await e._getAdditionalHeaders();
		s["Content-Type"] = "application/json", e.languageCode && (s["X-Firebase-Locale"] = e.languageCode);
		let c = {
			method: t,
			headers: s,
			...i
		};
		return ue() || (c.referrerPolicy = "strict-origin-when-cross-origin"), e.emulatorConfig && Oe(e.emulatorConfig.host) && (c.credentials = "include"), Mn.fetch()(await Ln(e, e.config.apiHost, n, o), c);
	});
}
async function In(e, t, n) {
	e._canInitEmulator = !1;
	let r = {
		...Nn,
		...t
	};
	try {
		let t = new zn(e), i = await Promise.race([n(), t.promise]);
		t.clearNetworkTimeout();
		let a = await i.json();
		if ("needConfirmation" in a) throw Bn(e, "account-exists-with-different-credential", a);
		if (i.ok && !("errorMessage" in a)) return a;
		{
			let [t, n] = (i.ok ? a.errorMessage : a.error.message).split(" : ");
			if (t === "FEDERATED_USER_ID_ALREADY_LINKED") throw Bn(e, "credential-already-in-use", a);
			if (t === "EMAIL_EXISTS") throw Bn(e, "email-already-in-use", a);
			if (t === "USER_DISABLED") throw Bn(e, "user-disabled", a);
			let o = r[t] || t.toLowerCase().replace(/[_\s]+/g, "-");
			if (n) throw Cn(e, o, n);
			S(e, o);
		}
	} catch (t) {
		if (t instanceof p) throw t;
		S(e, "network-request-failed", { message: String(t) });
	}
}
async function A(e, t, n, r, i = {}) {
	let a = await k(e, t, n, r, i);
	return "mfaPendingCredential" in a && S(e, "multi-factor-auth-required", { _serverResponse: a }), a;
}
async function Ln(e, t, n, r) {
	let i = `${t}${n}?${r}`, a = e, o = a.config.emulator ? jn(e.config, i) : `${e.config.apiScheme}://${i}`;
	return Pn.includes(n) && (await a._persistenceManagerAvailable, a._getPersistenceType() === "COOKIE") ? a._getPersistence()._getFinalTarget(o).toString() : o;
}
function Rn(e) {
	switch (e) {
		case "ENFORCE": return "ENFORCE";
		case "AUDIT": return "AUDIT";
		case "OFF": return "OFF";
		default: return "ENFORCEMENT_STATE_UNSPECIFIED";
	}
}
var zn = class {
	clearNetworkTimeout() {
		clearTimeout(this.timer);
	}
	constructor(e) {
		this.auth = e, this.timer = null, this.promise = new Promise((e, t) => {
			this.timer = setTimeout(() => t(C(this.auth, "network-request-failed")), Fn.get());
		});
	}
};
function Bn(e, t, n) {
	let r = { appName: e.name };
	n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
	let i = C(e, t, r);
	return i.customData._tokenResponse = n, i;
}
function Vn(e) {
	return e !== void 0 && e.enterprise !== void 0;
}
var Hn = class {
	constructor(e) {
		if (this.siteKey = "", this.recaptchaEnforcementState = [], e.recaptchaKey === void 0) throw Error("recaptchaKey undefined");
		this.siteKey = e.recaptchaKey.split("/")[3], this.recaptchaEnforcementState = e.recaptchaEnforcementState;
	}
	getProviderEnforcementState(e) {
		if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
		for (let t of this.recaptchaEnforcementState) if (t.provider && t.provider === e) return Rn(t.enforcementState);
		return null;
	}
	isProviderEnabled(e) {
		return this.getProviderEnforcementState(e) === "ENFORCE" || this.getProviderEnforcementState(e) === "AUDIT";
	}
	isAnyProviderEnabled() {
		return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") || this.isProviderEnabled("PHONE_PROVIDER");
	}
};
async function Un(e, t) {
	return k(e, "GET", "/v2/recaptchaConfig", O(e, t));
}
async function Wn(e, t) {
	return k(e, "POST", "/v1/accounts:delete", t);
}
async function Gn(e, t) {
	return k(e, "POST", "/v1/accounts:lookup", t);
}
function Kn(e) {
	if (e) try {
		let t = new Date(Number(e));
		if (!isNaN(t.getTime())) return t.toUTCString();
	} catch {}
}
function qn(e, t = !1) {
	return h(e).getIdToken(t);
}
async function Jn(e, t = !1) {
	let n = h(e), r = await n.getIdToken(t), i = Xn(r);
	T(i && i.exp && i.auth_time && i.iat, n.auth, "internal-error");
	let a = typeof i.firebase == "object" ? i.firebase : void 0, o = a?.sign_in_provider;
	return {
		claims: i,
		token: r,
		authTime: Kn(Yn(i.auth_time)),
		issuedAtTime: Kn(Yn(i.iat)),
		expirationTime: Kn(Yn(i.exp)),
		signInProvider: o || null,
		signInSecondFactor: a?.sign_in_second_factor || null
	};
}
function Yn(e) {
	return Number(e) * 1e3;
}
function Xn(e) {
	let [t, n, r] = e.split(".");
	if (t === void 0 || n === void 0 || r === void 0) return Sn("JWT malformed, contained fewer than 3 sections"), null;
	try {
		let e = d(n);
		return e ? JSON.parse(e) : (Sn("Failed to decode base64 JWT payload"), null);
	} catch (e) {
		return Sn("Caught error parsing JWT payload as JSON", e?.toString()), null;
	}
}
function Zn(e) {
	let t = Xn(e);
	return T(t, "internal-error"), T(t.exp !== void 0, "internal-error"), T(t.iat !== void 0, "internal-error"), Number(t.exp) - Number(t.iat);
}
async function Qn(e, t, n = !1) {
	if (n) return t;
	try {
		return await t;
	} catch (t) {
		throw t instanceof p && $n(t) && e.auth.currentUser === e && await e.auth.signOut(), t;
	}
}
function $n({ code: e }) {
	return e === "auth/user-disabled" || e === "auth/user-token-expired";
}
var er = class {
	constructor(e) {
		this.user = e, this.isRunning = !1, this.timerId = null, this.errorBackoff = 3e4;
	}
	_start() {
		this.isRunning || (this.isRunning = !0, this.schedule());
	}
	_stop() {
		this.isRunning && (this.isRunning = !1, this.timerId !== null && clearTimeout(this.timerId));
	}
	getInterval(e) {
		if (e) {
			let e = this.errorBackoff;
			return this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4), e;
		} else {
			this.errorBackoff = 3e4;
			let e = (this.user.stsTokenManager.expirationTime ?? 0) - Date.now() - 3e5;
			return Math.max(0, e);
		}
	}
	schedule(e = !1) {
		if (!this.isRunning) return;
		let t = this.getInterval(e);
		this.timerId = setTimeout(async () => {
			await this.iteration();
		}, t);
	}
	async iteration() {
		try {
			await this.user.getIdToken(!0);
		} catch (e) {
			e?.code === "auth/network-request-failed" && this.schedule(!0);
			return;
		}
		this.schedule();
	}
}, tr = class {
	constructor(e, t) {
		this.createdAt = e, this.lastLoginAt = t, this._initializeTime();
	}
	_initializeTime() {
		this.lastSignInTime = Kn(this.lastLoginAt), this.creationTime = Kn(this.createdAt);
	}
	_copy(e) {
		this.createdAt = e.createdAt, this.lastLoginAt = e.lastLoginAt, this._initializeTime();
	}
	toJSON() {
		return {
			createdAt: this.createdAt,
			lastLoginAt: this.lastLoginAt
		};
	}
};
async function nr(e) {
	let t = e.auth, n = await Qn(e, Gn(t, { idToken: await e.getIdToken() }));
	T(n?.users.length, t, "internal-error");
	let r = n.users[0];
	e._notifyReloadListener(r);
	let i = r.providerUserInfo?.length ? ar(r.providerUserInfo) : [], a = ir(e.providerData, i), o = e.isAnonymous, s = !(e.email && r.passwordHash) && !a?.length, c = o ? s : !1, l = {
		uid: r.localId,
		displayName: r.displayName || null,
		photoURL: r.photoUrl || null,
		email: r.email || null,
		emailVerified: r.emailVerified || !1,
		phoneNumber: r.phoneNumber || null,
		tenantId: r.tenantId || null,
		providerData: a,
		metadata: new tr(r.createdAt, r.lastLoginAt),
		isAnonymous: c
	};
	Object.assign(e, l);
}
async function rr(e) {
	let t = h(e);
	await nr(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t);
}
function ir(e, t) {
	return [...e.filter((e) => !t.some((t) => t.providerId === e.providerId)), ...t];
}
function ar(e) {
	return e.map(({ providerId: e, ...t }) => ({
		providerId: e,
		uid: t.rawId || "",
		displayName: t.displayName || null,
		email: t.email || null,
		phoneNumber: t.phoneNumber || null,
		photoURL: t.photoUrl || null
	}));
}
async function or(e, t) {
	let n = await In(e, {}, async () => {
		let n = xe({
			grant_type: "refresh_token",
			refresh_token: t
		}).slice(1), { tokenApiHost: r, apiKey: i } = e.config, a = await Ln(e, r, "/v1/token", `key=${i}`), o = await e._getAdditionalHeaders();
		o["Content-Type"] = "application/x-www-form-urlencoded";
		let s = {
			method: "POST",
			headers: o,
			body: n
		};
		return e.emulatorConfig && Oe(e.emulatorConfig.host) && (s.credentials = "include"), Mn.fetch()(a, s);
	});
	return {
		accessToken: n.access_token,
		expiresIn: n.expires_in,
		refreshToken: n.refresh_token
	};
}
async function sr(e, t) {
	return k(e, "POST", "/v2/accounts:revokeToken", O(e, t));
}
var cr = class e {
	constructor() {
		this.refreshToken = null, this.accessToken = null, this.expirationTime = null;
	}
	get isExpired() {
		return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
	}
	updateFromServerResponse(e) {
		T(e.idToken, "internal-error"), T(e.idToken !== void 0, "internal-error"), T(e.refreshToken !== void 0, "internal-error");
		let t = "expiresIn" in e && e.expiresIn !== void 0 ? Number(e.expiresIn) : Zn(e.idToken);
		this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
	}
	updateFromIdToken(e) {
		T(e.length !== 0, "internal-error");
		let t = Zn(e);
		this.updateTokensAndExpiration(e, null, t);
	}
	async getToken(e, t = !1) {
		return !t && this.accessToken && !this.isExpired ? this.accessToken : (T(this.refreshToken, e, "user-token-expired"), this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null);
	}
	clearRefreshToken() {
		this.refreshToken = null;
	}
	async refresh(e, t) {
		let { accessToken: n, refreshToken: r, expiresIn: i } = await or(e, t);
		this.updateTokensAndExpiration(n, r, Number(i));
	}
	updateTokensAndExpiration(e, t, n) {
		this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + n * 1e3;
	}
	static fromJSON(t, n) {
		let { refreshToken: r, accessToken: i, expirationTime: a } = n, o = new e();
		return r && (T(typeof r == "string", "internal-error", { appName: t }), o.refreshToken = r), i && (T(typeof i == "string", "internal-error", { appName: t }), o.accessToken = i), a && (T(typeof a == "number", "internal-error", { appName: t }), o.expirationTime = a), o;
	}
	toJSON() {
		return {
			refreshToken: this.refreshToken,
			accessToken: this.accessToken,
			expirationTime: this.expirationTime
		};
	}
	_assign(e) {
		this.accessToken = e.accessToken, this.refreshToken = e.refreshToken, this.expirationTime = e.expirationTime;
	}
	_clone() {
		return Object.assign(new e(), this.toJSON());
	}
	_performRefresh() {
		return E("not implemented");
	}
};
function j(e, t) {
	T(typeof e == "string" || e === void 0, "internal-error", { appName: t });
}
var lr = class e {
	constructor({ uid: e, auth: t, stsTokenManager: n, ...r }) {
		this.providerId = "firebase", this.proactiveRefresh = new er(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = e, this.auth = t, this.stsTokenManager = n, this.accessToken = n.accessToken, this.displayName = r.displayName || null, this.email = r.email || null, this.emailVerified = r.emailVerified || !1, this.phoneNumber = r.phoneNumber || null, this.photoURL = r.photoURL || null, this.isAnonymous = r.isAnonymous || !1, this.tenantId = r.tenantId || null, this.providerData = r.providerData ? [...r.providerData] : [], this.metadata = new tr(r.createdAt || void 0, r.lastLoginAt || void 0);
	}
	async getIdToken(e) {
		let t = await Qn(this, this.stsTokenManager.getToken(this.auth, e));
		return T(t, this.auth, "internal-error"), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t;
	}
	getIdTokenResult(e) {
		return Jn(this, e);
	}
	reload() {
		return rr(this);
	}
	_assign(e) {
		this !== e && (T(this.uid === e.uid, this.auth, "internal-error"), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map((e) => ({ ...e })), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager));
	}
	_clone(t) {
		let n = new e({
			...this,
			auth: t,
			stsTokenManager: this.stsTokenManager._clone()
		});
		return n.metadata._copy(this.metadata), n;
	}
	_onReload(e) {
		T(!this.reloadListener, this.auth, "internal-error"), this.reloadListener = e, this.reloadUserInfo &&= (this._notifyReloadListener(this.reloadUserInfo), null);
	}
	_notifyReloadListener(e) {
		this.reloadListener ? this.reloadListener(e) : this.reloadUserInfo = e;
	}
	_startProactiveRefresh() {
		this.proactiveRefresh._start();
	}
	_stopProactiveRefresh() {
		this.proactiveRefresh._stop();
	}
	async _updateTokensIfNecessary(e, t = !1) {
		let n = !1;
		e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), n = !0), t && await nr(this), await this.auth._persistUserIfCurrent(this), n && this.auth._notifyListenersIfCurrent(this);
	}
	async delete() {
		if (b(this.auth.app)) return Promise.reject(w(this.auth));
		let e = await this.getIdToken();
		return await Qn(this, Wn(this.auth, { idToken: e })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut();
	}
	toJSON() {
		return {
			uid: this.uid,
			email: this.email || void 0,
			emailVerified: this.emailVerified,
			displayName: this.displayName || void 0,
			isAnonymous: this.isAnonymous,
			photoURL: this.photoURL || void 0,
			phoneNumber: this.phoneNumber || void 0,
			tenantId: this.tenantId || void 0,
			providerData: this.providerData.map((e) => ({ ...e })),
			stsTokenManager: this.stsTokenManager.toJSON(),
			_redirectEventId: this._redirectEventId,
			...this.metadata.toJSON(),
			apiKey: this.auth.config.apiKey,
			appName: this.auth.name
		};
	}
	get refreshToken() {
		return this.stsTokenManager.refreshToken || "";
	}
	static _fromJSON(t, n) {
		let r = n.displayName ?? void 0, i = n.email ?? void 0, a = n.phoneNumber ?? void 0, o = n.photoURL ?? void 0, s = n.tenantId ?? void 0, c = n._redirectEventId ?? void 0, l = n.createdAt ?? void 0, u = n.lastLoginAt ?? void 0, { uid: d, emailVerified: ee, isAnonymous: te, providerData: ne, stsTokenManager: re } = n;
		T(d && re, t, "internal-error");
		let ie = cr.fromJSON(this.name, re);
		T(typeof d == "string", t, "internal-error"), j(r, t.name), j(i, t.name), T(typeof ee == "boolean", t, "internal-error"), T(typeof te == "boolean", t, "internal-error"), j(a, t.name), j(o, t.name), j(s, t.name), j(c, t.name), j(l, t.name), j(u, t.name);
		let ae = new e({
			uid: d,
			auth: t,
			email: i,
			emailVerified: ee,
			displayName: r,
			isAnonymous: te,
			photoURL: o,
			phoneNumber: a,
			tenantId: s,
			stsTokenManager: ie,
			createdAt: l,
			lastLoginAt: u
		});
		return ne && Array.isArray(ne) && (ae.providerData = ne.map((e) => ({ ...e }))), c && (ae._redirectEventId = c), ae;
	}
	static async _fromIdTokenResponse(t, n, r = !1) {
		let i = new cr();
		i.updateFromServerResponse(n);
		let a = new e({
			uid: n.localId,
			auth: t,
			stsTokenManager: i,
			isAnonymous: r
		});
		return await nr(a), a;
	}
	static async _fromGetAccountInfoResponse(t, n, r) {
		let i = n.users[0];
		T(i.localId !== void 0, "internal-error");
		let a = i.providerUserInfo === void 0 ? [] : ar(i.providerUserInfo), o = !(i.email && i.passwordHash) && !a?.length, s = new cr();
		s.updateFromIdToken(r);
		let c = new e({
			uid: i.localId,
			auth: t,
			stsTokenManager: s,
			isAnonymous: o
		}), l = {
			uid: i.localId,
			displayName: i.displayName || null,
			photoURL: i.photoUrl || null,
			email: i.email || null,
			emailVerified: i.emailVerified || !1,
			phoneNumber: i.phoneNumber || null,
			tenantId: i.tenantId || null,
			providerData: a,
			metadata: new tr(i.createdAt, i.lastLoginAt),
			isAnonymous: !(i.email && i.passwordHash) && !a?.length
		};
		return Object.assign(c, l), c;
	}
}, ur = /* @__PURE__ */ new Map();
function M(e) {
	D(e instanceof Function, "Expected a class definition");
	let t = ur.get(e);
	return t ? (D(t instanceof e, "Instance stored in cache mismatched with class"), t) : (t = new e(), ur.set(e, t), t);
}
var dr = class {
	constructor() {
		this.type = "NONE", this.storage = {};
	}
	async _isAvailable() {
		return !0;
	}
	async _set(e, t) {
		this.storage[e] = t;
	}
	async _get(e) {
		let t = this.storage[e];
		return t === void 0 ? null : t;
	}
	async _remove(e) {
		delete this.storage[e];
	}
	_addListener(e, t) {}
	_removeListener(e, t) {}
};
dr.type = "NONE";
var fr = dr;
function pr(e, t, n) {
	return `firebase:${e}:${t}:${n}`;
}
var mr = class e {
	constructor(e, t, n) {
		this.persistence = e, this.auth = t, this.userKey = n;
		let { config: r, name: i } = this.auth;
		this.fullUserKey = pr(this.userKey, r.apiKey, i), this.fullPersistenceKey = pr("persistence", r.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t);
		try {
			this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
		} catch {}
	}
	setCurrentUser(e) {
		return this.persistence._set(this.fullUserKey, e.toJSON());
	}
	async getCurrentUser() {
		let e = await this.persistence._get(this.fullUserKey);
		if (!e) return null;
		if (typeof e == "string") {
			let t = await Gn(this.auth, { idToken: e }).catch(() => void 0);
			return t ? lr._fromGetAccountInfoResponse(this.auth, t, e) : null;
		}
		return lr._fromJSON(this.auth, e);
	}
	removeCurrentUser() {
		return this.persistence._remove(this.fullUserKey);
	}
	savePersistenceForRedirect() {
		return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
	}
	async setPersistence(e) {
		if (this.persistence === e) return;
		let t = await this.getCurrentUser();
		if (await this.removeCurrentUser(), this.persistence = e, t) return this.setCurrentUser(t);
	}
	delete() {
		try {
			this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
		} catch {}
	}
	static async create(t, n, r = "authUser") {
		if (!n.length) return new e(M(fr), t, r);
		let i = (await Promise.all(n.map(async (e) => {
			try {
				if (await e._isAvailable()) return e;
			} catch {
				return;
			}
		}))).filter((e) => e), a = i[0] || M(fr), o = pr(r, t.config.apiKey, t.name), s = null;
		for (let e of n) try {
			let n = await e._get(o);
			if (n) {
				let r;
				if (typeof n == "string") {
					let e = await Gn(t, { idToken: n }).catch(() => void 0);
					if (!e) break;
					r = await lr._fromGetAccountInfoResponse(t, e, n);
				} else r = lr._fromJSON(t, n);
				e !== a && (s = r), a = e;
				break;
			}
		} catch {}
		let c = i.filter((e) => e._shouldAllowMigration);
		return !a._shouldAllowMigration || !c.length ? new e(a, t, r) : (a = c[0], s && await a._set(o, s.toJSON()), await Promise.all(n.map(async (e) => {
			if (e !== a) try {
				await e._remove(o);
			} catch {}
		})), new e(a, t, r));
	}
};
function hr(e) {
	let t = e.toLowerCase();
	if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/")) return "Opera";
	if (yr(t)) return "IEMobile";
	if (t.includes("msie") || t.includes("trident/")) return "IE";
	if (t.includes("edge/")) return "Edge";
	if (gr(t)) return "Firefox";
	if (t.includes("silk/")) return "Silk";
	if (xr(t)) return "Blackberry";
	if (Sr(t)) return "Webos";
	if (_r(t)) return "Safari";
	if ((t.includes("chrome/") || vr(t)) && !t.includes("edge/")) return "Chrome";
	if (br(t)) return "Android";
	{
		let t = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
		if (t?.length === 2) return t[1];
	}
	return "Other";
}
function gr(e = f()) {
	return /firefox\//i.test(e);
}
function _r(e = f()) {
	let t = e.toLowerCase();
	return t.includes("safari/") && !t.includes("chrome/") && !t.includes("crios/") && !t.includes("android");
}
function vr(e = f()) {
	return /crios\//i.test(e);
}
function yr(e = f()) {
	return /iemobile/i.test(e);
}
function br(e = f()) {
	return /android/i.test(e);
}
function xr(e = f()) {
	return /blackberry/i.test(e);
}
function Sr(e = f()) {
	return /webos/i.test(e);
}
function Cr(e = f()) {
	return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e);
}
function wr(e = f()) {
	return Cr(e) && !!window.navigator?.standalone;
}
function Tr() {
	return pe() && document.documentMode === 10;
}
function Er(e = f()) {
	return Cr(e) || br(e) || Sr(e) || xr(e) || /windows phone/i.test(e) || yr(e);
}
function Dr(e, t = []) {
	let n;
	switch (e) {
		case "Browser":
			n = hr(f());
			break;
		case "Worker":
			n = `${hr(f())}-${e}`;
			break;
		default: n = e;
	}
	let r = t.length ? t.join(",") : "FirebaseCore-web";
	return `${n}/JsCore/${Yt}/${r}`;
}
var Or = class {
	constructor(e) {
		this.auth = e, this.queue = [];
	}
	pushCallback(e, t) {
		let n = (t) => new Promise((n, r) => {
			try {
				n(e(t));
			} catch (e) {
				r(e);
			}
		});
		n.onAbort = t, this.queue.push(n);
		let r = this.queue.length - 1;
		return () => {
			this.queue[r] = () => Promise.resolve();
		};
	}
	async runMiddleware(e) {
		if (this.auth.currentUser === e) return;
		let t = [];
		try {
			for (let n of this.queue) await n(e), n.onAbort && t.push(n.onAbort);
		} catch (e) {
			t.reverse();
			for (let e of t) try {
				e();
			} catch {}
			throw this.auth._errorFactory.create("login-blocked", { originalMessage: e?.message });
		}
	}
};
async function kr(e, t = {}) {
	return k(e, "GET", "/v2/passwordPolicy", O(e, t));
}
var Ar = 6, jr = class {
	constructor(e) {
		let t = e.customStrengthOptions;
		this.customStrengthOptions = {}, this.customStrengthOptions.minPasswordLength = t.minPasswordLength ?? Ar, t.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = t.maxPasswordLength), t.containsLowercaseCharacter !== void 0 && (this.customStrengthOptions.containsLowercaseLetter = t.containsLowercaseCharacter), t.containsUppercaseCharacter !== void 0 && (this.customStrengthOptions.containsUppercaseLetter = t.containsUppercaseCharacter), t.containsNumericCharacter !== void 0 && (this.customStrengthOptions.containsNumericCharacter = t.containsNumericCharacter), t.containsNonAlphanumericCharacter !== void 0 && (this.customStrengthOptions.containsNonAlphanumericCharacter = t.containsNonAlphanumericCharacter), this.enforcementState = e.enforcementState, this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED" && (this.enforcementState = "OFF"), this.allowedNonAlphanumericCharacters = e.allowedNonAlphanumericCharacters?.join("") ?? "", this.forceUpgradeOnSignin = e.forceUpgradeOnSignin ?? !1, this.schemaVersion = e.schemaVersion;
	}
	validatePassword(e) {
		let t = {
			isValid: !0,
			passwordPolicy: this
		};
		return this.validatePasswordLengthOptions(e, t), this.validatePasswordCharacterOptions(e, t), t.isValid &&= t.meetsMinPasswordLength ?? !0, t.isValid &&= t.meetsMaxPasswordLength ?? !0, t.isValid &&= t.containsLowercaseLetter ?? !0, t.isValid &&= t.containsUppercaseLetter ?? !0, t.isValid &&= t.containsNumericCharacter ?? !0, t.isValid &&= t.containsNonAlphanumericCharacter ?? !0, t;
	}
	validatePasswordLengthOptions(e, t) {
		let n = this.customStrengthOptions.minPasswordLength, r = this.customStrengthOptions.maxPasswordLength;
		n && (t.meetsMinPasswordLength = e.length >= n), r && (t.meetsMaxPasswordLength = e.length <= r);
	}
	validatePasswordCharacterOptions(e, t) {
		this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
		let n;
		for (let r = 0; r < e.length; r++) n = e.charAt(r), this.updatePasswordCharacterOptionsStatuses(t, n >= "a" && n <= "z", n >= "A" && n <= "Z", n >= "0" && n <= "9", this.allowedNonAlphanumericCharacters.includes(n));
	}
	updatePasswordCharacterOptionsStatuses(e, t, n, r, i) {
		this.customStrengthOptions.containsLowercaseLetter && (e.containsLowercaseLetter ||= t), this.customStrengthOptions.containsUppercaseLetter && (e.containsUppercaseLetter ||= n), this.customStrengthOptions.containsNumericCharacter && (e.containsNumericCharacter ||= r), this.customStrengthOptions.containsNonAlphanumericCharacter && (e.containsNonAlphanumericCharacter ||= i);
	}
}, Mr = class {
	constructor(e, t, n, r) {
		this.app = e, this.heartbeatServiceProvider = t, this.appCheckServiceProvider = n, this.config = r, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new Nr(this), this.idTokenSubscription = new Nr(this), this.beforeStateQueue = new Or(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = yn, this._agentRecaptchaConfig = null, this._tenantRecaptchaConfigs = {}, this._projectPasswordPolicy = null, this._tenantPasswordPolicies = {}, this._resolvePersistenceManagerAvailable = void 0, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = { appVerificationDisabledForTesting: !1 }, this.frameworks = [], this.name = e.name, this.clientVersion = r.sdkClientVersion, this._persistenceManagerAvailable = new Promise((e) => this._resolvePersistenceManagerAvailable = e);
	}
	_initializeWithPersistence(e, t) {
		return t && (this._popupRedirectResolver = M(t)), this._initializationPromise = this.queue(async () => {
			if (!this._deleted) {
				try {
					this.persistenceManager = await mr.create(this, e);
				} catch (e) {
					xn(`Failed to initialize persistence: ${e}`), this.persistenceManager = await mr.create(this, []);
				} finally {
					this._resolvePersistenceManagerAvailable?.();
				}
				if (!this._deleted) {
					if (this._popupRedirectResolver?._shouldInitProactively) try {
						await this._popupRedirectResolver._initialize(this);
					} catch {}
					try {
						await this.initializeCurrentUser(t);
					} catch (e) {
						xn(`Failed to initialize current user: ${e}`), await this.directlySetCurrentUser(null).catch(() => {});
					}
					this.lastNotifiedUid = this.currentUser?.uid || null, !this._deleted && (this._isInitialized = !0);
				}
			}
		}), this._initializationPromise;
	}
	async _onStorageEvent() {
		if (this._deleted) return;
		let e = await this.assertedPersistence.getCurrentUser();
		if (!(!this.currentUser && !e)) {
			if (this.currentUser && e && this.currentUser.uid === e.uid) {
				this._currentUser._assign(e), await this.currentUser.getIdToken();
				return;
			}
			await this._updateCurrentUser(e, !0);
		}
	}
	async initializeCurrentUserFromIdToken(e) {
		try {
			let t = await Gn(this, { idToken: e }), n = await lr._fromGetAccountInfoResponse(this, t, e);
			await this.directlySetCurrentUser(n);
		} catch (e) {
			console.warn("FirebaseServerApp could not login user with provided authIdToken: ", e), await this.directlySetCurrentUser(null);
		}
	}
	async initializeCurrentUser(e) {
		if (b(this.app)) {
			let e = this.app.settings.authIdToken;
			return e ? new Promise((t) => {
				setTimeout(() => this.initializeCurrentUserFromIdToken(e).then(t, t));
			}) : this.directlySetCurrentUser(null);
		}
		let t = await this.assertedPersistence.getCurrentUser(), n = t, r = !1;
		if (e && this.config.authDomain) {
			await this.getOrInitRedirectPersistenceManager();
			let t = this.redirectUser?._redirectEventId, i = n?._redirectEventId, a = await this.tryRedirectSignIn(e);
			(!t || t === i) && a?.user && (n = a.user, r = !0);
		}
		if (!n) return this.directlySetCurrentUser(null);
		if (!n._redirectEventId) {
			if (r) try {
				await this.beforeStateQueue.runMiddleware(n);
			} catch (e) {
				n = t, this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
			}
			return n ? this.reloadAndSetCurrentUserOrClear(n) : this.directlySetCurrentUser(null);
		}
		return T(this._popupRedirectResolver, this, "argument-error"), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === n._redirectEventId ? this.directlySetCurrentUser(n) : this.reloadAndSetCurrentUserOrClear(n);
	}
	async tryRedirectSignIn(e) {
		let t = null;
		try {
			t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
		} catch {
			await this._setRedirectUser(null);
		}
		return t;
	}
	async reloadAndSetCurrentUserOrClear(e) {
		try {
			await nr(e);
		} catch (e) {
			if (e?.code !== "auth/network-request-failed") return this.directlySetCurrentUser(null);
		}
		return this.directlySetCurrentUser(e);
	}
	useDeviceLanguage() {
		this.languageCode = kn();
	}
	async _delete() {
		this._deleted = !0;
	}
	async updateCurrentUser(e) {
		if (b(this.app)) return Promise.reject(w(this));
		let t = e ? h(e) : null;
		return t && T(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"), this._updateCurrentUser(t && t._clone(this));
	}
	async _updateCurrentUser(e, t = !1) {
		if (!this._deleted) return e && T(this.tenantId === e.tenantId, this, "tenant-id-mismatch"), t || await this.beforeStateQueue.runMiddleware(e), this.queue(async () => {
			await this.directlySetCurrentUser(e), this.notifyAuthListeners();
		});
	}
	async signOut() {
		return b(this.app) ? Promise.reject(w(this)) : (await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0));
	}
	setPersistence(e) {
		return b(this.app) ? Promise.reject(w(this)) : this.queue(async () => {
			await this.assertedPersistence.setPersistence(M(e));
		});
	}
	_getRecaptchaConfig() {
		return this.tenantId == null ? this._agentRecaptchaConfig : this._tenantRecaptchaConfigs[this.tenantId];
	}
	async validatePassword(e) {
		this._getPasswordPolicyInternal() || await this._updatePasswordPolicy();
		let t = this._getPasswordPolicyInternal();
		return t.schemaVersion === this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION ? t.validatePassword(e) : Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version", {}));
	}
	_getPasswordPolicyInternal() {
		return this.tenantId === null ? this._projectPasswordPolicy : this._tenantPasswordPolicies[this.tenantId];
	}
	async _updatePasswordPolicy() {
		let e = new jr(await kr(this));
		this.tenantId === null ? this._projectPasswordPolicy = e : this._tenantPasswordPolicies[this.tenantId] = e;
	}
	_getPersistenceType() {
		return this.assertedPersistence.persistence.type;
	}
	_getPersistence() {
		return this.assertedPersistence.persistence;
	}
	_updateErrorMap(e) {
		this._errorFactory = new _e("auth", "Firebase", e());
	}
	onAuthStateChanged(e, t, n) {
		return this.registerStateListener(this.authStateSubscription, e, t, n);
	}
	beforeAuthStateChanged(e, t) {
		return this.beforeStateQueue.pushCallback(e, t);
	}
	onIdTokenChanged(e, t, n) {
		return this.registerStateListener(this.idTokenSubscription, e, t, n);
	}
	authStateReady() {
		return new Promise((e, t) => {
			if (this.currentUser) e();
			else {
				let n = this.onAuthStateChanged(() => {
					n(), e();
				}, t);
			}
		});
	}
	async revokeAccessToken(e) {
		if (this.currentUser) {
			let t = {
				providerId: "apple.com",
				tokenType: "ACCESS_TOKEN",
				token: e,
				idToken: await this.currentUser.getIdToken()
			};
			this.tenantId != null && (t.tenantId = this.tenantId), await sr(this, t);
		}
	}
	toJSON() {
		return {
			apiKey: this.config.apiKey,
			authDomain: this.config.authDomain,
			appName: this.name,
			currentUser: this._currentUser?.toJSON()
		};
	}
	async _setRedirectUser(e, t) {
		let n = await this.getOrInitRedirectPersistenceManager(t);
		return e === null ? n.removeCurrentUser() : n.setCurrentUser(e);
	}
	async getOrInitRedirectPersistenceManager(e) {
		if (!this.redirectPersistenceManager) {
			let t = e && M(e) || this._popupRedirectResolver;
			T(t, this, "argument-error"), this.redirectPersistenceManager = await mr.create(this, [M(t._redirectPersistence)], "redirectUser"), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
		}
		return this.redirectPersistenceManager;
	}
	async _redirectUserForId(e) {
		return this._isInitialized && await this.queue(async () => {}), this._currentUser?._redirectEventId === e ? this._currentUser : this.redirectUser?._redirectEventId === e ? this.redirectUser : null;
	}
	async _persistUserIfCurrent(e) {
		if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e));
	}
	_notifyListenersIfCurrent(e) {
		e === this.currentUser && this.notifyAuthListeners();
	}
	_key() {
		return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
	}
	_startProactiveRefresh() {
		this.isProactiveRefreshEnabled = !0, this.currentUser && this._currentUser._startProactiveRefresh();
	}
	_stopProactiveRefresh() {
		this.isProactiveRefreshEnabled = !1, this.currentUser && this._currentUser._stopProactiveRefresh();
	}
	get _currentUser() {
		return this.currentUser;
	}
	notifyAuthListeners() {
		if (!this._isInitialized) return;
		this.idTokenSubscription.next(this.currentUser);
		let e = this.currentUser?.uid ?? null;
		this.lastNotifiedUid !== e && (this.lastNotifiedUid = e, this.authStateSubscription.next(this.currentUser));
	}
	registerStateListener(e, t, n, r) {
		if (this._deleted) return () => {};
		let i = typeof t == "function" ? t : t.next.bind(t), a = !1, o = this._isInitialized ? Promise.resolve() : this._initializationPromise;
		if (T(o, this, "internal-error"), o.then(() => {
			a || i(this.currentUser);
		}).catch((e) => {
			if (!a) if (typeof t != "function" && t.error) t.error(e);
			else if (n) n(e);
			else throw e;
		}), typeof t == "function") {
			let i = e.addObserver(t, n, r);
			return () => {
				a = !0, i();
			};
		} else {
			let n = e.addObserver(t);
			return () => {
				a = !0, n();
			};
		}
	}
	async directlySetCurrentUser(e) {
		if (this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(), this.currentUser = e, this.persistenceManager) try {
			e ? await this.persistenceManager.setCurrentUser(e) : await this.persistenceManager.removeCurrentUser();
		} catch (e) {
			let t = e?.message || String(e), n = Cn(this, "internal-error", `An internal AuthError has occurred: ${t}`);
			throw n.customData = { originalError: e }, n;
		}
	}
	queue(e) {
		return this.operations = this.operations.then(e, e), this.operations;
	}
	get assertedPersistence() {
		return T(this.persistenceManager, this, "internal-error"), this.persistenceManager;
	}
	_logFramework(e) {
		!e || this.frameworks.includes(e) || (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = Dr(this.config.clientPlatform, this._getFrameworks()));
	}
	_getFrameworks() {
		return this.frameworks;
	}
	async _getAdditionalHeaders() {
		let e = { "X-Client-Version": this.clientVersion };
		this.app.options.appId && (e["X-Firebase-gmpid"] = this.app.options.appId);
		let t = await this.heartbeatServiceProvider.getImmediate({ optional: !0 })?.getHeartbeatsHeader();
		t && (e["X-Firebase-Client"] = t);
		let n = await this._getAppCheckToken();
		return n && (e["X-Firebase-AppCheck"] = n), e;
	}
	async _getAppCheckToken() {
		if (b(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
		let e = await this.appCheckServiceProvider.getImmediate({ optional: !0 })?.getToken();
		return e?.error && xn(`Error while retrieving App Check token: ${e.error}`), e?.token;
	}
};
function N(e) {
	return h(e);
}
var Nr = class {
	constructor(e) {
		this.auth = e, this.observer = null, this.addObserver = we((e) => this.observer = e);
	}
	get next() {
		return T(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer);
	}
}, Pr = {
	async loadJS() {
		throw Error("Unable to load external scripts");
	},
	recaptchaV2Script: "",
	recaptchaEnterpriseScript: "",
	gapiScript: ""
};
function Fr(e) {
	Pr = e;
}
function Ir(e) {
	return Pr.loadJS(e);
}
function Lr() {
	return Pr.recaptchaEnterpriseScript;
}
function Rr() {
	return Pr.gapiScript;
}
function zr(e) {
	return `__${e}${Math.floor(Math.random() * 1e6)}`;
}
var Br = class {
	constructor() {
		this.enterprise = new Vr();
	}
	ready(e) {
		e();
	}
	execute(e, t) {
		return Promise.resolve("token");
	}
	render(e, t) {
		return "";
	}
}, Vr = class {
	ready(e) {
		e();
	}
	execute(e, t) {
		return Promise.resolve("token");
	}
	render(e, t) {
		return "";
	}
}, Hr = "recaptcha-enterprise", Ur = "NO_RECAPTCHA", Wr = "onFirebaseAuthREInstanceReady", Gr = class e {
	constructor(e) {
		this.type = Hr, this.auth = N(e);
	}
	async verify(t = "verify", n = !1) {
		async function r(e) {
			if (!n) {
				if (e.tenantId == null && e._agentRecaptchaConfig != null) return e._agentRecaptchaConfig.siteKey;
				if (e.tenantId != null && e._tenantRecaptchaConfigs[e.tenantId] !== void 0) return e._tenantRecaptchaConfigs[e.tenantId].siteKey;
			}
			return new Promise(async (t, n) => {
				Un(e, {
					clientType: "CLIENT_TYPE_WEB",
					version: "RECAPTCHA_ENTERPRISE"
				}).then((r) => {
					if (r.recaptchaKey === void 0) n(/* @__PURE__ */ Error("recaptcha Enterprise site key undefined"));
					else {
						let n = new Hn(r);
						return e.tenantId == null ? e._agentRecaptchaConfig = n : e._tenantRecaptchaConfigs[e.tenantId] = n, t(n.siteKey);
					}
				}).catch((e) => {
					n(e);
				});
			});
		}
		function i(e, n, r) {
			let i = window.grecaptcha;
			Vn(i) ? i.enterprise.ready(() => {
				i.enterprise.execute(e, { action: t }).then((e) => {
					n(e);
				}).catch(() => {
					n(Ur);
				});
			}) : r(Error("No reCAPTCHA enterprise script loaded."));
		}
		return this.auth.settings.appVerificationDisabledForTesting ? new Br().execute("siteKey", { action: "verify" }) : new Promise((t, a) => {
			r(this.auth).then(async (r) => {
				if (!n && Vn(window.grecaptcha) && e.scriptInjectionDeferred) await e.scriptInjectionDeferred.promise, i(r, t, a);
				else {
					if (typeof window > "u") {
						a(/* @__PURE__ */ Error("RecaptchaVerifier is only supported in browser"));
						return;
					}
					let n = Lr();
					n.length !== 0 && (n += r + `&onload=${Wr}`), e.scriptInjectionDeferred = new ce(), window[Wr] = () => {
						e.scriptInjectionDeferred?.resolve();
					}, Ir(n).then(() => e.scriptInjectionDeferred?.promise).then(() => {
						i(r, t, a);
					}).catch((e) => {
						a(e);
					});
				}
			}).catch((e) => {
				a(e);
			});
		});
	}
};
Gr.scriptInjectionDeferred = null;
async function Kr(e, t, n, r = !1, i = !1) {
	let a = new Gr(e), o;
	if (i) o = Ur;
	else try {
		o = await a.verify(n);
	} catch {
		o = await a.verify(n, !0);
	}
	let s = { ...t };
	if (n === "mfaSmsEnrollment" || n === "mfaSmsSignIn") {
		if ("phoneEnrollmentInfo" in s) {
			let e = s.phoneEnrollmentInfo.phoneNumber, t = s.phoneEnrollmentInfo.recaptchaToken;
			Object.assign(s, { phoneEnrollmentInfo: {
				phoneNumber: e,
				recaptchaToken: t,
				captchaResponse: o,
				clientType: "CLIENT_TYPE_WEB",
				recaptchaVersion: "RECAPTCHA_ENTERPRISE"
			} });
		} else if ("phoneSignInInfo" in s) {
			let e = s.phoneSignInInfo.recaptchaToken;
			Object.assign(s, { phoneSignInInfo: {
				recaptchaToken: e,
				captchaResponse: o,
				clientType: "CLIENT_TYPE_WEB",
				recaptchaVersion: "RECAPTCHA_ENTERPRISE"
			} });
		}
		return s;
	}
	return r ? Object.assign(s, { captchaResp: o }) : Object.assign(s, { captchaResponse: o }), Object.assign(s, { clientType: "CLIENT_TYPE_WEB" }), Object.assign(s, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }), s;
}
async function P(e, t, n, r, i) {
	return i === "EMAIL_PASSWORD_PROVIDER" ? e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") ? r(e, await Kr(e, t, n, n === "getOobCode")) : r(e, t).catch(async (i) => i.code === "auth/missing-recaptcha-token" ? (console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`), r(e, await Kr(e, t, n, n === "getOobCode"))) : Promise.reject(i)) : i === "PHONE_PROVIDER" ? e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER") ? r(e, await Kr(e, t, n)).catch(async (i) => e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER") === "AUDIT" && (i.code === "auth/missing-recaptcha-token" || i.code === "auth/invalid-app-credential") ? (console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`), r(e, await Kr(e, t, n, !1, !0))) : Promise.reject(i)) : r(e, await Kr(e, t, n, !1, !0)) : Promise.reject(i + " provider is not supported.");
}
async function qr(e) {
	let t = N(e), n = new Hn(await Un(t, {
		clientType: "CLIENT_TYPE_WEB",
		version: "RECAPTCHA_ENTERPRISE"
	}));
	t.tenantId == null ? t._agentRecaptchaConfig = n : t._tenantRecaptchaConfigs[t.tenantId] = n, n.isAnyProviderEnabled() && new Gr(t).verify();
}
function Jr(e, t) {
	let n = qt(e, "auth");
	if (n.isInitialized()) {
		let e = n.getImmediate();
		if (m(n.getOptions(), t ?? {})) return e;
		S(e, "already-initialized");
	}
	return n.initialize({ options: t });
}
function Yr(e, t) {
	let n = t?.persistence || [], r = (Array.isArray(n) ? n : [n]).map(M);
	t?.errorMap && e._updateErrorMap(t.errorMap), e._initializeWithPersistence(r, t?.popupRedirectResolver);
}
function Xr(e, t, n) {
	let r = N(e);
	T(/^https?:\/\//.test(t), r, "invalid-emulator-scheme");
	let i = !!n?.disableWarnings, a = Zr(t), { host: o, port: s } = Qr(t), c = s === null ? "" : `:${s}`, l = { url: `${a}//${o}${c}/` }, u = Object.freeze({
		host: o,
		port: s,
		protocol: a.replace(":", ""),
		options: Object.freeze({ disableWarnings: i })
	});
	if (!r._canInitEmulator) {
		T(r.config.emulator && r.emulatorConfig, r, "emulator-config-failed"), T(m(l, r.config.emulator) && m(u, r.emulatorConfig), r, "emulator-config-failed");
		return;
	}
	r.config.emulator = l, r.emulatorConfig = u, r.settings.appVerificationDisabledForTesting = !0, Oe(o) ? ke(`${a}//${o}${c}`) : i || ei();
}
function Zr(e) {
	let t = e.indexOf(":");
	return t < 0 ? "" : e.substr(0, t + 1);
}
function Qr(e) {
	let t = Zr(e), n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
	if (!n) return {
		host: "",
		port: null
	};
	let r = n[2].split("@").pop() || "", i = /^(\[[^\]]+\])(:|$)/.exec(r);
	if (i) {
		let e = i[1];
		return {
			host: e,
			port: $r(r.substr(e.length + 1))
		};
	} else {
		let [e, t] = r.split(":");
		return {
			host: e,
			port: $r(t)
		};
	}
}
function $r(e) {
	if (!e) return null;
	let t = Number(e);
	return isNaN(t) ? null : t;
}
function ei() {
	function e() {
		let e = document.createElement("p"), t = e.style;
		e.innerText = "Running in emulator mode. Do not use with production credentials.", t.position = "fixed", t.width = "100%", t.backgroundColor = "#ffffff", t.border = ".1em solid #000000", t.color = "#b50000", t.bottom = "0px", t.left = "0px", t.margin = "0px", t.zIndex = "10000", t.textAlign = "center", e.classList.add("firebase-emulator-warning"), document.body.appendChild(e);
	}
	typeof console < "u" && typeof console.info == "function" && console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."), typeof window < "u" && typeof document < "u" && (document.readyState === "loading" ? window.addEventListener("DOMContentLoaded", e) : e());
}
var ti = class {
	constructor(e, t) {
		this.providerId = e, this.signInMethod = t;
	}
	toJSON() {
		return E("not implemented");
	}
	_getIdTokenResponse(e) {
		return E("not implemented");
	}
	_linkToIdToken(e, t) {
		return E("not implemented");
	}
	_getReauthenticationResolver(e) {
		return E("not implemented");
	}
};
async function ni(e, t) {
	return k(e, "POST", "/v1/accounts:signUp", t);
}
async function ri(e, t) {
	return A(e, "POST", "/v1/accounts:signInWithPassword", O(e, t));
}
async function ii(e, t) {
	return k(e, "POST", "/v1/accounts:sendOobCode", O(e, t));
}
async function ai(e, t) {
	return ii(e, t);
}
async function oi(e, t) {
	return ii(e, t);
}
async function si(e, t) {
	return A(e, "POST", "/v1/accounts:signInWithEmailLink", O(e, t));
}
async function ci(e, t) {
	return A(e, "POST", "/v1/accounts:signInWithEmailLink", O(e, t));
}
var li = class e extends ti {
	constructor(e, t, n, r = null) {
		super("password", n), this._email = e, this._password = t, this._tenantId = r;
	}
	static _fromEmailAndPassword(t, n) {
		return new e(t, n, "password");
	}
	static _fromEmailAndCode(t, n, r = null) {
		return new e(t, n, "emailLink", r);
	}
	toJSON() {
		return {
			email: this._email,
			password: this._password,
			signInMethod: this.signInMethod,
			tenantId: this._tenantId
		};
	}
	static fromJSON(e) {
		let t = typeof e == "string" ? JSON.parse(e) : e;
		if (t?.email && t?.password) {
			if (t.signInMethod === "password") return this._fromEmailAndPassword(t.email, t.password);
			if (t.signInMethod === "emailLink") return this._fromEmailAndCode(t.email, t.password, t.tenantId);
		}
		return null;
	}
	async _getIdTokenResponse(e) {
		switch (this.signInMethod) {
			case "password": return P(e, {
				returnSecureToken: !0,
				email: this._email,
				password: this._password,
				clientType: "CLIENT_TYPE_WEB"
			}, "signInWithPassword", ri, "EMAIL_PASSWORD_PROVIDER");
			case "emailLink": return si(e, {
				email: this._email,
				oobCode: this._password
			});
			default: S(e, "internal-error");
		}
	}
	async _linkToIdToken(e, t) {
		switch (this.signInMethod) {
			case "password": return P(e, {
				idToken: t,
				returnSecureToken: !0,
				email: this._email,
				password: this._password,
				clientType: "CLIENT_TYPE_WEB"
			}, "signUpPassword", ni, "EMAIL_PASSWORD_PROVIDER");
			case "emailLink": return ci(e, {
				idToken: t,
				email: this._email,
				oobCode: this._password
			});
			default: S(e, "internal-error");
		}
	}
	_getReauthenticationResolver(e) {
		return this._getIdTokenResponse(e);
	}
};
async function F(e, t) {
	return A(e, "POST", "/v1/accounts:signInWithIdp", O(e, t));
}
var ui = "http://localhost", di = class e extends ti {
	constructor() {
		super(...arguments), this.pendingToken = null;
	}
	static _fromParams(t) {
		let n = new e(t.providerId, t.signInMethod);
		return t.idToken || t.accessToken ? (t.idToken && (n.idToken = t.idToken), t.accessToken && (n.accessToken = t.accessToken), t.nonce && !t.pendingToken && (n.nonce = t.nonce), t.pendingToken && (n.pendingToken = t.pendingToken)) : t.oauthToken && t.oauthTokenSecret ? (n.accessToken = t.oauthToken, n.secret = t.oauthTokenSecret) : S("argument-error"), n;
	}
	toJSON() {
		return {
			idToken: this.idToken,
			accessToken: this.accessToken,
			secret: this.secret,
			nonce: this.nonce,
			pendingToken: this.pendingToken,
			providerId: this.providerId,
			signInMethod: this.signInMethod
		};
	}
	static fromJSON(t) {
		let { providerId: n, signInMethod: r, ...i } = typeof t == "string" ? JSON.parse(t) : t;
		if (!n || !r) return null;
		let a = new e(n, r);
		return a.idToken = i.idToken || void 0, a.accessToken = i.accessToken || void 0, a.secret = i.secret, a.nonce = i.nonce, a.pendingToken = i.pendingToken || null, a;
	}
	_getIdTokenResponse(e) {
		return F(e, this.buildRequest());
	}
	_linkToIdToken(e, t) {
		let n = this.buildRequest();
		return n.idToken = t, F(e, n);
	}
	_getReauthenticationResolver(e) {
		let t = this.buildRequest();
		return t.autoCreate = !1, F(e, t);
	}
	buildRequest() {
		let e = {
			requestUri: ui,
			returnSecureToken: !0
		};
		if (this.pendingToken) e.pendingToken = this.pendingToken;
		else {
			let t = {};
			this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = xe(t);
		}
		return e;
	}
};
async function fi(e, t) {
	return k(e, "POST", "/v1/accounts:sendVerificationCode", O(e, t));
}
async function pi(e, t) {
	return A(e, "POST", "/v1/accounts:signInWithPhoneNumber", O(e, t));
}
async function mi(e, t) {
	let n = await A(e, "POST", "/v1/accounts:signInWithPhoneNumber", O(e, t));
	if (n.temporaryProof) throw Bn(e, "account-exists-with-different-credential", n);
	return n;
}
var hi = { USER_NOT_FOUND: "user-not-found" };
async function gi(e, t) {
	return A(e, "POST", "/v1/accounts:signInWithPhoneNumber", O(e, {
		...t,
		operation: "REAUTH"
	}), hi);
}
var _i = class e extends ti {
	constructor(e) {
		super("phone", "phone"), this.params = e;
	}
	static _fromVerification(t, n) {
		return new e({
			verificationId: t,
			verificationCode: n
		});
	}
	static _fromTokenResponse(t, n) {
		return new e({
			phoneNumber: t,
			temporaryProof: n
		});
	}
	_getIdTokenResponse(e) {
		return pi(e, this._makeVerificationRequest());
	}
	_linkToIdToken(e, t) {
		return mi(e, {
			idToken: t,
			...this._makeVerificationRequest()
		});
	}
	_getReauthenticationResolver(e) {
		return gi(e, this._makeVerificationRequest());
	}
	_makeVerificationRequest() {
		let { temporaryProof: e, phoneNumber: t, verificationId: n, verificationCode: r } = this.params;
		return e && t ? {
			temporaryProof: e,
			phoneNumber: t
		} : {
			sessionInfo: n,
			code: r
		};
	}
	toJSON() {
		let e = { providerId: this.providerId };
		return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e;
	}
	static fromJSON(t) {
		typeof t == "string" && (t = JSON.parse(t));
		let { verificationId: n, verificationCode: r, phoneNumber: i, temporaryProof: a } = t;
		return !r && !n && !i && !a ? null : new e({
			verificationId: n,
			verificationCode: r,
			phoneNumber: i,
			temporaryProof: a
		});
	}
};
function vi(e) {
	switch (e) {
		case "recoverEmail": return "RECOVER_EMAIL";
		case "resetPassword": return "PASSWORD_RESET";
		case "signIn": return "EMAIL_SIGNIN";
		case "verifyEmail": return "VERIFY_EMAIL";
		case "verifyAndChangeEmail": return "VERIFY_AND_CHANGE_EMAIL";
		case "revertSecondFactorAddition": return "REVERT_SECOND_FACTOR_ADDITION";
		default: return null;
	}
}
function yi(e) {
	let t = Se(Ce(e)).link, n = t ? Se(Ce(t)).deep_link_id : null, r = Se(Ce(e)).deep_link_id;
	return (r ? Se(Ce(r)).link : null) || r || n || t || e;
}
var bi = class e {
	constructor(e) {
		let t = Se(Ce(e)), n = t.apiKey ?? null, r = t.oobCode ?? null, i = vi(t.mode ?? null);
		T(n && r && i, "argument-error"), this.apiKey = n, this.operation = i, this.code = r, this.continueUrl = t.continueUrl ?? null, this.languageCode = t.lang ?? null, this.tenantId = t.tenantId ?? null;
	}
	static parseLink(t) {
		let n = yi(t);
		try {
			return new e(n);
		} catch {
			return null;
		}
	}
}, xi = class e {
	constructor() {
		this.providerId = e.PROVIDER_ID;
	}
	static credential(e, t) {
		return li._fromEmailAndPassword(e, t);
	}
	static credentialWithLink(e, t) {
		let n = bi.parseLink(t);
		return T(n, "argument-error"), li._fromEmailAndCode(e, n.code, n.tenantId);
	}
};
xi.PROVIDER_ID = "password", xi.EMAIL_PASSWORD_SIGN_IN_METHOD = "password", xi.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
var Si = class {
	constructor(e) {
		this.providerId = e, this.defaultLanguageCode = null, this.customParameters = {};
	}
	setDefaultLanguage(e) {
		this.defaultLanguageCode = e;
	}
	setCustomParameters(e) {
		return this.customParameters = e, this;
	}
	getCustomParameters() {
		return this.customParameters;
	}
}, Ci = class extends Si {
	constructor() {
		super(...arguments), this.scopes = [];
	}
	addScope(e) {
		return this.scopes.includes(e) || this.scopes.push(e), this;
	}
	getScopes() {
		return [...this.scopes];
	}
}, wi = class e extends Ci {
	constructor() {
		super("facebook.com");
	}
	static credential(t) {
		return di._fromParams({
			providerId: e.PROVIDER_ID,
			signInMethod: e.FACEBOOK_SIGN_IN_METHOD,
			accessToken: t
		});
	}
	static credentialFromResult(t) {
		return e.credentialFromTaggedObject(t);
	}
	static credentialFromError(t) {
		return e.credentialFromTaggedObject(t.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: t }) {
		if (!t || !("oauthAccessToken" in t) || !t.oauthAccessToken) return null;
		try {
			return e.credential(t.oauthAccessToken);
		} catch {
			return null;
		}
	}
};
wi.FACEBOOK_SIGN_IN_METHOD = "facebook.com", wi.PROVIDER_ID = "facebook.com";
var Ti = class e extends Ci {
	constructor() {
		super("google.com"), this.addScope("profile");
	}
	static credential(t, n) {
		return di._fromParams({
			providerId: e.PROVIDER_ID,
			signInMethod: e.GOOGLE_SIGN_IN_METHOD,
			idToken: t,
			accessToken: n
		});
	}
	static credentialFromResult(t) {
		return e.credentialFromTaggedObject(t);
	}
	static credentialFromError(t) {
		return e.credentialFromTaggedObject(t.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: t }) {
		if (!t) return null;
		let { oauthIdToken: n, oauthAccessToken: r } = t;
		if (!n && !r) return null;
		try {
			return e.credential(n, r);
		} catch {
			return null;
		}
	}
};
Ti.GOOGLE_SIGN_IN_METHOD = "google.com", Ti.PROVIDER_ID = "google.com";
var Ei = class e extends Ci {
	constructor() {
		super("github.com");
	}
	static credential(t) {
		return di._fromParams({
			providerId: e.PROVIDER_ID,
			signInMethod: e.GITHUB_SIGN_IN_METHOD,
			accessToken: t
		});
	}
	static credentialFromResult(t) {
		return e.credentialFromTaggedObject(t);
	}
	static credentialFromError(t) {
		return e.credentialFromTaggedObject(t.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: t }) {
		if (!t || !("oauthAccessToken" in t) || !t.oauthAccessToken) return null;
		try {
			return e.credential(t.oauthAccessToken);
		} catch {
			return null;
		}
	}
};
Ei.GITHUB_SIGN_IN_METHOD = "github.com", Ei.PROVIDER_ID = "github.com";
var Di = class e extends Ci {
	constructor() {
		super("twitter.com");
	}
	static credential(t, n) {
		return di._fromParams({
			providerId: e.PROVIDER_ID,
			signInMethod: e.TWITTER_SIGN_IN_METHOD,
			oauthToken: t,
			oauthTokenSecret: n
		});
	}
	static credentialFromResult(t) {
		return e.credentialFromTaggedObject(t);
	}
	static credentialFromError(t) {
		return e.credentialFromTaggedObject(t.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: t }) {
		if (!t) return null;
		let { oauthAccessToken: n, oauthTokenSecret: r } = t;
		if (!n || !r) return null;
		try {
			return e.credential(n, r);
		} catch {
			return null;
		}
	}
};
Di.TWITTER_SIGN_IN_METHOD = "twitter.com", Di.PROVIDER_ID = "twitter.com";
async function Oi(e, t) {
	return A(e, "POST", "/v1/accounts:signUp", O(e, t));
}
var ki = class e {
	constructor(e) {
		this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType;
	}
	static async _fromIdTokenResponse(t, n, r, i = !1) {
		return new e({
			user: await lr._fromIdTokenResponse(t, r, i),
			providerId: Ai(r),
			_tokenResponse: r,
			operationType: n
		});
	}
	static async _forOperation(t, n, r) {
		return await t._updateTokensIfNecessary(r, !0), new e({
			user: t,
			providerId: Ai(r),
			_tokenResponse: r,
			operationType: n
		});
	}
};
function Ai(e) {
	return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null;
}
var ji = class e extends p {
	constructor(t, n, r, i) {
		super(n.code, n.message), this.operationType = r, this.user = i, Object.setPrototypeOf(this, e.prototype), this.customData = {
			appName: t.name,
			tenantId: t.tenantId ?? void 0,
			_serverResponse: n.customData._serverResponse,
			operationType: r
		};
	}
	static _fromErrorAndOperation(t, n, r, i) {
		return new e(t, n, r, i);
	}
};
function Mi(e, t, n, r) {
	return (t === "reauthenticate" ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)).catch((n) => {
		throw n.code === "auth/multi-factor-auth-required" ? ji._fromErrorAndOperation(e, n, t, r) : n;
	});
}
async function Ni(e, t, n = !1) {
	let r = await Qn(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
	return ki._forOperation(e, "link", r);
}
async function Pi(e, t, n = !1) {
	let { auth: r } = e;
	if (b(r.app)) return Promise.reject(w(r));
	let i = "reauthenticate";
	try {
		let a = await Qn(e, Mi(r, i, t, e), n);
		T(a.idToken, r, "internal-error");
		let o = Xn(a.idToken);
		T(o, r, "internal-error");
		let { sub: s } = o;
		return T(e.uid === s, r, "user-mismatch"), ki._forOperation(e, i, a);
	} catch (e) {
		throw e?.code === "auth/user-not-found" && S(r, "user-mismatch"), e;
	}
}
async function Fi(e, t, n = !1) {
	if (b(e.app)) return Promise.reject(w(e));
	let r = "signIn", i = await Mi(e, r, t), a = await ki._fromIdTokenResponse(e, r, i);
	return n || await e._updateCurrentUser(a.user), a;
}
async function Ii(e, t) {
	return Fi(N(e), t);
}
function Li(e, t, n) {
	T(n.url?.length > 0, e, "invalid-continue-uri"), T(n.dynamicLinkDomain === void 0 || n.dynamicLinkDomain.length > 0, e, "invalid-dynamic-link-domain"), T(n.linkDomain === void 0 || n.linkDomain.length > 0, e, "invalid-hosting-link-domain"), t.continueUrl = n.url, t.dynamicLinkDomain = n.dynamicLinkDomain, t.linkDomain = n.linkDomain, t.canHandleCodeInApp = n.handleCodeInApp, n.iOS && (T(n.iOS.bundleId.length > 0, e, "missing-ios-bundle-id"), t.iOSBundleId = n.iOS.bundleId), n.android && (T(n.android.packageName.length > 0, e, "missing-android-pkg-name"), t.androidInstallApp = n.android.installApp, t.androidMinimumVersionCode = n.android.minimumVersion, t.androidPackageName = n.android.packageName);
}
async function Ri(e) {
	let t = N(e);
	t._getPasswordPolicyInternal() && await t._updatePasswordPolicy();
}
async function zi(e, t, n) {
	let r = N(e), i = {
		requestType: "PASSWORD_RESET",
		email: t,
		clientType: "CLIENT_TYPE_WEB"
	};
	n && Li(r, i, n), await P(r, i, "getOobCode", oi, "EMAIL_PASSWORD_PROVIDER");
}
async function Bi(e, t, n) {
	if (b(e.app)) return Promise.reject(w(e));
	let r = N(e), i = await P(r, {
		returnSecureToken: !0,
		email: t,
		password: n,
		clientType: "CLIENT_TYPE_WEB"
	}, "signUpPassword", Oi, "EMAIL_PASSWORD_PROVIDER").catch((t) => {
		throw t.code === "auth/password-does-not-meet-requirements" && Ri(e), t;
	}), a = await ki._fromIdTokenResponse(r, "signIn", i);
	return await r._updateCurrentUser(a.user), a;
}
function Vi(e, t, n) {
	return b(e.app) ? Promise.reject(w(e)) : Ii(h(e), xi.credential(t, n)).catch(async (t) => {
		throw t.code === "auth/password-does-not-meet-requirements" && Ri(e), t;
	});
}
async function Hi(e, t) {
	let n = h(e), r = {
		requestType: "VERIFY_EMAIL",
		idToken: await e.getIdToken()
	};
	t && Li(n.auth, r, t);
	let { email: i } = await ai(n.auth, r);
	i !== e.email && await e.reload();
}
function Ui(e, t, n, r) {
	return h(e).onIdTokenChanged(t, n, r);
}
function Wi(e, t, n) {
	return h(e).beforeAuthStateChanged(t, n);
}
function Gi(e, t, n, r) {
	return h(e).onAuthStateChanged(t, n, r);
}
function Ki(e) {
	return h(e).signOut();
}
function qi(e, t) {
	return k(e, "POST", "/v2/accounts/mfaEnrollment:start", O(e, t));
}
function Ji(e, t) {
	return k(e, "POST", "/v2/accounts/mfaEnrollment:finalize", O(e, t));
}
function Yi(e, t) {
	return k(e, "POST", "/v2/accounts/mfaEnrollment:start", O(e, t));
}
function Xi(e, t) {
	return k(e, "POST", "/v2/accounts/mfaEnrollment:finalize", O(e, t));
}
var Zi = "__sak", Qi = class {
	constructor(e, t) {
		this.storageRetriever = e, this.type = t;
	}
	_isAvailable() {
		try {
			return this.storage ? (this.storage.setItem(Zi, "1"), this.storage.removeItem(Zi), Promise.resolve(!0)) : Promise.resolve(!1);
		} catch {
			return Promise.resolve(!1);
		}
	}
	_set(e, t) {
		return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
	}
	_get(e) {
		let t = this.storage.getItem(e);
		return Promise.resolve(t ? JSON.parse(t) : null);
	}
	_remove(e) {
		return this.storage.removeItem(e), Promise.resolve();
	}
	get storage() {
		return this.storageRetriever();
	}
}, $i = 1e3, ea = 10, ta = class extends Qi {
	constructor() {
		super(() => window.localStorage, "LOCAL"), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.fallbackToPolling = Er(), this._shouldAllowMigration = !0;
	}
	forAllChangedKeys(e) {
		for (let t of Object.keys(this.listeners)) {
			let n = this.storage.getItem(t), r = this.localCache[t];
			n !== r && e(t, r, n);
		}
	}
	onStorageEvent(e, t = !1) {
		if (!e.key) {
			this.forAllChangedKeys((e, t, n) => {
				this.notifyListeners(e, n);
			});
			return;
		}
		let n = e.key;
		t ? this.detachListener() : this.stopPolling();
		let r = () => {
			let e = this.storage.getItem(n);
			!t && this.localCache[n] === e || this.notifyListeners(n, e);
		}, i = this.storage.getItem(n);
		Tr() && i !== e.newValue && e.newValue !== e.oldValue ? setTimeout(r, ea) : r();
	}
	notifyListeners(e, t) {
		this.localCache[e] = t;
		let n = this.listeners[e];
		if (n) for (let e of Array.from(n)) e(t && JSON.parse(t));
	}
	startPolling() {
		this.stopPolling(), this.pollTimer = setInterval(() => {
			this.forAllChangedKeys((e, t, n) => {
				this.onStorageEvent(new StorageEvent("storage", {
					key: e,
					oldValue: t,
					newValue: n
				}), !0);
			});
		}, $i);
	}
	stopPolling() {
		this.pollTimer &&= (clearInterval(this.pollTimer), null);
	}
	attachListener() {
		window.addEventListener("storage", this.boundEventHandler);
	}
	detachListener() {
		window.removeEventListener("storage", this.boundEventHandler);
	}
	_addListener(e, t) {
		Object.keys(this.listeners).length === 0 && (this.fallbackToPolling ? this.startPolling() : this.attachListener()), this.listeners[e] || (this.listeners[e] = /* @__PURE__ */ new Set(), this.localCache[e] = this.storage.getItem(e)), this.listeners[e].add(t);
	}
	_removeListener(e, t) {
		this.listeners[e] && (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]), Object.keys(this.listeners).length === 0 && (this.detachListener(), this.stopPolling());
	}
	async _set(e, t) {
		await super._set(e, t), this.localCache[e] = JSON.stringify(t);
	}
	async _get(e) {
		let t = await super._get(e);
		return this.localCache[e] = JSON.stringify(t), t;
	}
	async _remove(e) {
		await super._remove(e), delete this.localCache[e];
	}
};
ta.type = "LOCAL";
var na = ta, ra = 1e3;
function ia(e) {
	let t = e.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), n = RegExp(`${t}=([^;]+)`);
	return document.cookie.match(n)?.[1] ?? null;
}
function aa(e) {
	return `${window.location.protocol === "http:" ? "__dev_" : "__HOST-"}FIREBASE_${e.split(":")[3]}`;
}
var oa = class {
	constructor() {
		this.type = "COOKIE", this.listenerUnsubscribes = /* @__PURE__ */ new Map();
	}
	_getFinalTarget(e) {
		let t = new URL(`${window.location.origin}/__cookies__`);
		return t.searchParams.set("finalTarget", e), t;
	}
	async _isAvailable() {
		return typeof isSecureContext == "boolean" && !isSecureContext || typeof navigator > "u" || typeof document > "u" ? !1 : navigator.cookieEnabled ?? !0;
	}
	async _set(e, t) {}
	async _get(e) {
		if (!this._isAvailable()) return null;
		let t = aa(e);
		return window.cookieStore ? (await window.cookieStore.get(t))?.value : ia(t);
	}
	async _remove(e) {
		if (!this._isAvailable() || !await this._get(e)) return;
		let t = aa(e);
		document.cookie = `${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`, await fetch("/__cookies__", { method: "DELETE" }).catch(() => void 0);
	}
	_addListener(e, t) {
		if (!this._isAvailable()) return;
		let n = aa(e);
		if (window.cookieStore) {
			let e = ((e) => {
				let r = e.changed.find((e) => e.name === n);
				r && t(r.value), e.deleted.find((e) => e.name === n) && t(null);
			});
			return this.listenerUnsubscribes.set(t, () => window.cookieStore.removeEventListener("change", e)), window.cookieStore.addEventListener("change", e);
		}
		let r = ia(n), i = setInterval(() => {
			let e = ia(n);
			e !== r && (t(e), r = e);
		}, ra);
		this.listenerUnsubscribes.set(t, () => clearInterval(i));
	}
	_removeListener(e, t) {
		let n = this.listenerUnsubscribes.get(t);
		n && (n(), this.listenerUnsubscribes.delete(t));
	}
};
oa.type = "COOKIE";
var sa = class extends Qi {
	constructor() {
		super(() => window.sessionStorage, "SESSION");
	}
	_addListener(e, t) {}
	_removeListener(e, t) {}
};
sa.type = "SESSION";
var ca = sa;
function la(e) {
	return Promise.all(e.map(async (e) => {
		try {
			return {
				fulfilled: !0,
				value: await e
			};
		} catch (e) {
			return {
				fulfilled: !1,
				reason: e
			};
		}
	}));
}
var ua = class e {
	constructor(e) {
		this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this);
	}
	static _getInstance(t) {
		let n = this.receivers.find((e) => e.isListeningto(t));
		if (n) return n;
		let r = new e(t);
		return this.receivers.push(r), r;
	}
	isListeningto(e) {
		return this.eventTarget === e;
	}
	async handleEvent(e) {
		let t = e, { eventId: n, eventType: r, data: i } = t.data, a = this.handlersMap[r];
		if (!a?.size) return;
		t.ports[0].postMessage({
			status: "ack",
			eventId: n,
			eventType: r
		});
		let o = await la(Array.from(a).map(async (e) => e(t.origin, i)));
		t.ports[0].postMessage({
			status: "done",
			eventId: n,
			eventType: r,
			response: o
		});
	}
	_subscribe(e, t) {
		Object.keys(this.handlersMap).length === 0 && this.eventTarget.addEventListener("message", this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = /* @__PURE__ */ new Set()), this.handlersMap[e].add(t);
	}
	_unsubscribe(e, t) {
		this.handlersMap[e] && t && this.handlersMap[e].delete(t), (!t || this.handlersMap[e].size === 0) && delete this.handlersMap[e], Object.keys(this.handlersMap).length === 0 && this.eventTarget.removeEventListener("message", this.boundEventHandler);
	}
};
ua.receivers = [];
function da(e = "", t = 10) {
	let n = "";
	for (let e = 0; e < t; e++) n += Math.floor(Math.random() * 10);
	return e + n;
}
var fa = class {
	constructor(e) {
		this.target = e, this.handlers = /* @__PURE__ */ new Set();
	}
	removeMessageHandler(e) {
		e.messageChannel && (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e);
	}
	async _send(e, t, n = 50) {
		let r = typeof MessageChannel < "u" ? new MessageChannel() : null;
		if (!r) throw Error("connection_unavailable");
		let i, a;
		return new Promise((o, s) => {
			let c = da("", 20);
			r.port1.start();
			let l = setTimeout(() => {
				s(/* @__PURE__ */ Error("unsupported_event"));
			}, n);
			a = {
				messageChannel: r,
				onMessage(e) {
					let t = e;
					if (t.data.eventId === c) switch (t.data.status) {
						case "ack":
							clearTimeout(l), i = setTimeout(() => {
								s(/* @__PURE__ */ Error("timeout"));
							}, 3e3);
							break;
						case "done":
							clearTimeout(i), o(t.data.response);
							break;
						default:
							clearTimeout(l), clearTimeout(i), s(/* @__PURE__ */ Error("invalid_response"));
							break;
					}
				}
			}, this.handlers.add(a), r.port1.addEventListener("message", a.onMessage), this.target.postMessage({
				eventType: e,
				eventId: c,
				data: t
			}, [r.port2]);
		}).finally(() => {
			a && this.removeMessageHandler(a);
		});
	}
};
function I() {
	return window;
}
function pa(e) {
	I().location.href = e;
}
function ma() {
	return I().WorkerGlobalScope !== void 0 && typeof I().importScripts == "function";
}
async function ha() {
	if (!navigator?.serviceWorker) return null;
	try {
		return (await navigator.serviceWorker.ready).active;
	} catch {
		return null;
	}
}
function ga() {
	return navigator?.serviceWorker?.controller || null;
}
function _a() {
	return ma() ? self : null;
}
var va = "firebaseLocalStorageDb", ya = 1, ba = "firebaseLocalStorage", xa = "fbase_key", Sa = class {
	constructor(e) {
		this.request = e;
	}
	toPromise() {
		return new Promise((e, t) => {
			this.request.addEventListener("success", () => {
				e(this.request.result);
			}), this.request.addEventListener("error", () => {
				t(this.request.error);
			});
		});
	}
};
function Ca(e, t) {
	return e.transaction([ba], t ? "readwrite" : "readonly").objectStore(ba);
}
function wa() {
	return new Sa(indexedDB.deleteDatabase(va)).toPromise();
}
function Ta() {
	let e = indexedDB.open(va, ya);
	return new Promise((t, n) => {
		e.addEventListener("error", () => {
			n(e.error);
		}), e.addEventListener("upgradeneeded", () => {
			let t = e.result;
			try {
				t.createObjectStore(ba, { keyPath: xa });
			} catch (e) {
				n(e);
			}
		}), e.addEventListener("success", async () => {
			let n = e.result;
			n.objectStoreNames.contains(ba) ? t(n) : (n.close(), await wa(), t(await Ta()));
		});
	});
}
async function Ea(e, t, n) {
	return new Sa(Ca(e, !0).put({
		[xa]: t,
		value: n
	})).toPromise();
}
async function Da(e, t) {
	let n = await new Sa(Ca(e, !1).get(t)).toPromise();
	return n === void 0 ? null : n.value;
}
function Oa(e, t) {
	return new Sa(Ca(e, !0).delete(t)).toPromise();
}
var ka = 800, Aa = 3, ja = class {
	registerLifecycleListeners() {
		typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("pagehide", this.onPageHide), window.addEventListener("pageshow", this.onPageShow));
	}
	unregisterLifecycleListeners() {
		typeof window < "u" && typeof window.removeEventListener == "function" && (window.removeEventListener("pagehide", this.onPageHide), window.removeEventListener("pageshow", this.onPageShow));
	}
	constructor() {
		this.type = "LOCAL", this.dbPromise = null, this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.isClosing = !1, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this.onPageHide = () => {
			this.isClosing = !0, this.stopPolling(), this.dbPromise &&= (this.dbPromise.then((e) => e.close()).catch(() => {}), null);
		}, this.onPageShow = () => {
			this.isClosing && (this.isClosing = !1, Object.keys(this.listeners).length > 0 && this.startPolling());
		}, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {});
	}
	async _openDb() {
		return this.dbPromise ? this.dbPromise : (this.dbPromise = Ta(), this.dbPromise.catch(() => {
			this.dbPromise = null;
		}), this.dbPromise);
	}
	async _withRetries(e) {
		let t = 0;
		for (;;) try {
			return await e(await this._openDb());
		} catch (e) {
			if (t++ > Aa) throw e;
			if (this.dbPromise) {
				let e = this.dbPromise;
				this.dbPromise = null;
				try {
					(await e).close();
				} catch {}
			}
		}
	}
	async initializeServiceWorkerMessaging() {
		return ma() ? this.initializeReceiver() : this.initializeSender();
	}
	async initializeReceiver() {
		this.receiver = ua._getInstance(_a()), this.receiver._subscribe("keyChanged", async (e, t) => ({ keyProcessed: (await this._poll()).includes(t.key) })), this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
	}
	async initializeSender() {
		if (this.activeServiceWorker = await ha(), !this.activeServiceWorker) return;
		this.sender = new fa(this.activeServiceWorker);
		let e = await this.sender._send("ping", {}, 800);
		e && e[0]?.fulfilled && e[0]?.value.includes("keyChanged") && (this.serviceWorkerReceiverAvailable = !0);
	}
	async notifyServiceWorker(e) {
		if (!(!this.sender || !this.activeServiceWorker || ga() !== this.activeServiceWorker)) try {
			await this.sender._send("keyChanged", { key: e }, this.serviceWorkerReceiverAvailable ? 800 : 50);
		} catch {}
	}
	async _isAvailable() {
		try {
			return indexedDB ? (await this._withRetries(async (e) => {
				await Ea(e, Zi, "1"), await Oa(e, Zi);
			}), !0) : !1;
		} catch {}
		return !1;
	}
	async _withPendingWrite(e) {
		this.pendingWrites++;
		try {
			await e();
		} finally {
			this.pendingWrites--;
		}
	}
	async _set(e, t) {
		return this._withPendingWrite(async () => (await this._withRetries((n) => Ea(n, e, t)), this.localCache[e] = t, this.notifyServiceWorker(e)));
	}
	async _get(e) {
		let t = await this._withRetries((t) => Da(t, e));
		return this.localCache[e] = t, t;
	}
	async _remove(e) {
		return this._withPendingWrite(async () => (await this._withRetries((t) => Oa(t, e)), delete this.localCache[e], this.notifyServiceWorker(e)));
	}
	async _poll() {
		if (this.isClosing) return [];
		try {
			let e = await this._withRetries((e) => new Sa(Ca(e, !1).getAll()).toPromise());
			if (this.isClosing || !e || this.pendingWrites !== 0) return [];
			let t = [], n = /* @__PURE__ */ new Set();
			if (e.length !== 0) for (let { fbase_key: r, value: i } of e) n.add(r), JSON.stringify(this.localCache[r]) !== JSON.stringify(i) && (this.notifyListeners(r, i), t.push(r));
			for (let e of Object.keys(this.localCache)) this.localCache[e] && !n.has(e) && (this.notifyListeners(e, null), t.push(e));
			return t;
		} catch (e) {
			return this.isClosing || xn(`Firebase Auth cross-tab polling failed with error: ${e}`), [];
		}
	}
	notifyListeners(e, t) {
		this.localCache[e] = t;
		let n = this.listeners[e];
		if (n) for (let e of Array.from(n)) e(t);
	}
	startPolling() {
		this.stopPolling(), this.pollTimer = setInterval(async () => this._poll(), ka);
	}
	stopPolling() {
		this.pollTimer &&= (clearInterval(this.pollTimer), null);
	}
	_addListener(e, t) {
		Object.keys(this.listeners).length === 0 && (this.startPolling(), this.registerLifecycleListeners()), this.listeners[e] || (this.listeners[e] = /* @__PURE__ */ new Set(), this._get(e)), this.listeners[e].add(t);
	}
	_removeListener(e, t) {
		this.listeners[e] && (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]), Object.keys(this.listeners).length === 0 && (this.stopPolling(), this.unregisterLifecycleListeners());
	}
};
ja.type = "LOCAL";
var Ma = ja;
function Na(e, t) {
	return k(e, "POST", "/v2/accounts/mfaSignIn:start", O(e, t));
}
function Pa(e, t) {
	return k(e, "POST", "/v2/accounts/mfaSignIn:finalize", O(e, t));
}
function Fa(e, t) {
	return k(e, "POST", "/v2/accounts/mfaSignIn:finalize", O(e, t));
}
zr("rcb"), new An(3e4, 6e4);
var Ia = "recaptcha";
async function La(e, t, n) {
	if (!e._getRecaptchaConfig()) try {
		await qr(e);
	} catch {
		console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.");
	}
	try {
		let r;
		if (r = typeof t == "string" ? { phoneNumber: t } : t, "session" in r) {
			let t = r.session;
			if ("phoneNumber" in r) return T(t.type === "enroll", e, "internal-error"), (await P(e, {
				idToken: t.credential,
				phoneEnrollmentInfo: {
					phoneNumber: r.phoneNumber,
					clientType: "CLIENT_TYPE_WEB"
				}
			}, "mfaSmsEnrollment", async (e, t) => t.phoneEnrollmentInfo.captchaResponse === Ur ? (T(n?.type === Ia, e, "argument-error"), qi(e, await Ra(e, t, n))) : qi(e, t), "PHONE_PROVIDER").catch((e) => Promise.reject(e))).phoneSessionInfo.sessionInfo;
			{
				T(t.type === "signin", e, "internal-error");
				let i = r.multiFactorHint?.uid || r.multiFactorUid;
				return T(i, e, "missing-multi-factor-info"), (await P(e, {
					mfaPendingCredential: t.credential,
					mfaEnrollmentId: i,
					phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" }
				}, "mfaSmsSignIn", async (e, t) => t.phoneSignInInfo.captchaResponse === Ur ? (T(n?.type === Ia, e, "argument-error"), Na(e, await Ra(e, t, n))) : Na(e, t), "PHONE_PROVIDER").catch((e) => Promise.reject(e))).phoneResponseInfo.sessionInfo;
			}
		} else return (await P(e, {
			phoneNumber: r.phoneNumber,
			clientType: "CLIENT_TYPE_WEB"
		}, "sendVerificationCode", async (e, t) => t.captchaResponse === Ur ? (T(n?.type === Ia, e, "argument-error"), fi(e, await Ra(e, t, n))) : fi(e, t), "PHONE_PROVIDER").catch((e) => Promise.reject(e))).sessionInfo;
	} finally {
		n?._reset();
	}
}
async function Ra(e, t, n) {
	T(n.type === Ia, e, "argument-error");
	let r = await n.verify();
	T(typeof r == "string", e, "argument-error");
	let i = { ...t };
	if ("phoneEnrollmentInfo" in i) {
		let e = i.phoneEnrollmentInfo.phoneNumber, t = i.phoneEnrollmentInfo.captchaResponse, n = i.phoneEnrollmentInfo.clientType, a = i.phoneEnrollmentInfo.recaptchaVersion;
		return Object.assign(i, { phoneEnrollmentInfo: {
			phoneNumber: e,
			recaptchaToken: r,
			captchaResponse: t,
			clientType: n,
			recaptchaVersion: a
		} }), i;
	} else if ("phoneSignInInfo" in i) {
		let e = i.phoneSignInInfo.captchaResponse, t = i.phoneSignInInfo.clientType, n = i.phoneSignInInfo.recaptchaVersion;
		return Object.assign(i, { phoneSignInInfo: {
			recaptchaToken: r,
			captchaResponse: e,
			clientType: t,
			recaptchaVersion: n
		} }), i;
	} else return Object.assign(i, { recaptchaToken: r }), i;
}
var za = class e {
	constructor(t) {
		this.providerId = e.PROVIDER_ID, this.auth = N(t);
	}
	verifyPhoneNumber(e, t) {
		return La(this.auth, e, h(t));
	}
	static credential(e, t) {
		return _i._fromVerification(e, t);
	}
	static credentialFromResult(t) {
		let n = t;
		return e.credentialFromTaggedObject(n);
	}
	static credentialFromError(t) {
		return e.credentialFromTaggedObject(t.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: e }) {
		if (!e) return null;
		let { phoneNumber: t, temporaryProof: n } = e;
		return t && n ? _i._fromTokenResponse(t, n) : null;
	}
};
za.PROVIDER_ID = "phone", za.PHONE_SIGN_IN_METHOD = "phone";
function Ba(e, t) {
	return t ? M(t) : (T(e._popupRedirectResolver, e, "argument-error"), e._popupRedirectResolver);
}
var Va = class extends ti {
	constructor(e) {
		super("custom", "custom"), this.params = e;
	}
	_getIdTokenResponse(e) {
		return F(e, this._buildIdpRequest());
	}
	_linkToIdToken(e, t) {
		return F(e, this._buildIdpRequest(t));
	}
	_getReauthenticationResolver(e) {
		return F(e, this._buildIdpRequest());
	}
	_buildIdpRequest(e) {
		let t = {
			requestUri: this.params.requestUri,
			sessionId: this.params.sessionId,
			postBody: this.params.postBody,
			tenantId: this.params.tenantId,
			pendingToken: this.params.pendingToken,
			returnSecureToken: !0,
			returnIdpCredential: !0
		};
		return e && (t.idToken = e), t;
	}
};
function Ha(e) {
	return Fi(e.auth, new Va(e), e.bypassAuthState);
}
function Ua(e) {
	let { auth: t, user: n } = e;
	return T(n, t, "internal-error"), Pi(n, new Va(e), e.bypassAuthState);
}
async function Wa(e) {
	let { auth: t, user: n } = e;
	return T(n, t, "internal-error"), Ni(n, new Va(e), e.bypassAuthState);
}
var Ga = class {
	constructor(e, t, n, r, i = !1) {
		this.auth = e, this.resolver = n, this.user = r, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t];
	}
	execute() {
		return new Promise(async (e, t) => {
			this.pendingPromise = {
				resolve: e,
				reject: t
			};
			try {
				this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this);
			} catch (e) {
				this.reject(e);
			}
		});
	}
	async onAuthEvent(e) {
		let { urlResponse: t, sessionId: n, postBody: r, tenantId: i, error: a, type: o } = e;
		if (a) {
			this.reject(a);
			return;
		}
		let s = {
			auth: this.auth,
			requestUri: t,
			sessionId: n,
			tenantId: i || void 0,
			postBody: r || void 0,
			user: this.user,
			bypassAuthState: this.bypassAuthState
		};
		try {
			this.resolve(await this.getIdpTask(o)(s));
		} catch (e) {
			this.reject(e);
		}
	}
	onError(e) {
		this.reject(e);
	}
	getIdpTask(e) {
		switch (e) {
			case "signInViaPopup":
			case "signInViaRedirect": return Ha;
			case "linkViaPopup":
			case "linkViaRedirect": return Wa;
			case "reauthViaPopup":
			case "reauthViaRedirect": return Ua;
			default: S(this.auth, "internal-error");
		}
	}
	resolve(e) {
		D(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.resolve(e), this.unregisterAndCleanUp();
	}
	reject(e) {
		D(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.reject(e), this.unregisterAndCleanUp();
	}
	unregisterAndCleanUp() {
		this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp();
	}
}, Ka = new An(2e3, 1e4), qa = class e extends Ga {
	constructor(t, n, r, i, a) {
		super(t, n, i, a), this.provider = r, this.authWindow = null, this.pollId = null, e.currentPopupAction && e.currentPopupAction.cancel(), e.currentPopupAction = this;
	}
	async executeNotNull() {
		let e = await this.execute();
		return T(e, this.auth, "internal-error"), e;
	}
	async onExecution() {
		D(this.filter.length === 1, "Popup operations only handle one event");
		let e = da();
		this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch((e) => {
			this.reject(e);
		}), this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
			e || this.reject(C(this.auth, "web-storage-unsupported"));
		}), this.pollUserCancellation();
	}
	get eventId() {
		return this.authWindow?.associatedEvent || null;
	}
	cancel() {
		this.reject(C(this.auth, "cancelled-popup-request"));
	}
	cleanUp() {
		this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, e.currentPopupAction = null;
	}
	pollUserCancellation() {
		let e = () => {
			if (this.authWindow?.window?.closed) {
				this.pollId = window.setTimeout(() => {
					this.pollId = null, this.reject(C(this.auth, "popup-closed-by-user"));
				}, 8e3);
				return;
			}
			this.pollId = window.setTimeout(e, Ka.get());
		};
		e();
	}
};
qa.currentPopupAction = null;
var Ja = "pendingRedirect", Ya = /* @__PURE__ */ new Map(), Xa = class extends Ga {
	constructor(e, t, n = !1) {
		super(e, [
			"signInViaRedirect",
			"linkViaRedirect",
			"reauthViaRedirect",
			"unknown"
		], t, void 0, n), this.eventId = null;
	}
	async execute() {
		let e = Ya.get(this.auth._key());
		if (!e) {
			try {
				let t = await Za(this.resolver, this.auth) ? await super.execute() : null;
				e = () => Promise.resolve(t);
			} catch (t) {
				e = () => Promise.reject(t);
			}
			Ya.set(this.auth._key(), e);
		}
		return this.bypassAuthState || Ya.set(this.auth._key(), () => Promise.resolve(null)), e();
	}
	async onAuthEvent(e) {
		if (e.type === "signInViaRedirect") return super.onAuthEvent(e);
		if (e.type === "unknown") {
			this.resolve(null);
			return;
		}
		if (e.eventId) {
			let t = await this.auth._redirectUserForId(e.eventId);
			if (t) return this.user = t, super.onAuthEvent(e);
			this.resolve(null);
		}
	}
	async onExecution() {}
	cleanUp() {}
};
async function Za(e, t) {
	let n = eo(t), r = $a(e);
	if (!await r._isAvailable()) return !1;
	let i = await r._get(n) === "true";
	return await r._remove(n), i;
}
function Qa(e, t) {
	Ya.set(e._key(), t);
}
function $a(e) {
	return M(e._redirectPersistence);
}
function eo(e) {
	return pr(Ja, e.config.apiKey, e.name);
}
async function to(e, t, n = !1) {
	if (b(e.app)) return Promise.reject(w(e));
	let r = N(e), i = await new Xa(r, Ba(r, t), n).execute();
	return i && !n && (delete i.user._redirectEventId, await r._persistUserIfCurrent(i.user), await r._setRedirectUser(null, t)), i;
}
var no = 600 * 1e3, ro = class {
	constructor(e) {
		this.auth = e, this.cachedEventUids = /* @__PURE__ */ new Set(), this.consumers = /* @__PURE__ */ new Set(), this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now();
	}
	registerConsumer(e) {
		this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null);
	}
	unregisterConsumer(e) {
		this.consumers.delete(e);
	}
	onEvent(e) {
		if (this.hasEventBeenHandled(e)) return !1;
		let t = !1;
		return this.consumers.forEach((n) => {
			this.isEventForConsumer(e, n) && (t = !0, this.sendToConsumer(e, n), this.saveEventToCache(e));
		}), this.hasHandledPotentialRedirect || !oo(e) ? t : (this.hasHandledPotentialRedirect = !0, t ||= (this.queuedRedirectEvent = e, !0), t);
	}
	sendToConsumer(e, t) {
		if (e.error && !ao(e)) {
			let n = e.error.code?.split("auth/")[1] || "internal-error";
			t.onError(C(this.auth, n));
		} else t.onAuthEvent(e);
	}
	isEventForConsumer(e, t) {
		let n = t.eventId === null || !!e.eventId && e.eventId === t.eventId;
		return t.filter.includes(e.type) && n;
	}
	hasEventBeenHandled(e) {
		return Date.now() - this.lastProcessedEventTime >= no && this.cachedEventUids.clear(), this.cachedEventUids.has(io(e));
	}
	saveEventToCache(e) {
		this.cachedEventUids.add(io(e)), this.lastProcessedEventTime = Date.now();
	}
};
function io(e) {
	return [
		e.type,
		e.eventId,
		e.sessionId,
		e.tenantId
	].filter((e) => e).join("-");
}
function ao({ type: e, error: t }) {
	return e === "unknown" && t?.code === "auth/no-auth-event";
}
function oo(e) {
	switch (e.type) {
		case "signInViaRedirect":
		case "linkViaRedirect":
		case "reauthViaRedirect": return !0;
		case "unknown": return ao(e);
		default: return !1;
	}
}
async function so(e, t = {}) {
	return k(e, "GET", "/v1/projects", t);
}
var co = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, lo = /^https?/;
async function uo(e) {
	if (e.config.emulator) return;
	let { authorizedDomains: t } = await so(e);
	for (let e of t) try {
		if (fo(e)) return;
	} catch {}
	S(e, "unauthorized-domain");
}
function fo(e) {
	let t = Tn(), { protocol: n, hostname: r } = new URL(t);
	if (e.startsWith("chrome-extension://")) {
		let i = new URL(e);
		return i.hostname === "" && r === "" ? n === "chrome-extension:" && e.replace("chrome-extension://", "") === t.replace("chrome-extension://", "") : n === "chrome-extension:" && i.hostname === r;
	}
	if (!lo.test(n)) return !1;
	if (co.test(e)) return r === e;
	let i = e.replace(/\./g, "\\.");
	return RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r);
}
var po = new An(3e4, 6e4);
function mo() {
	let e = I().___jsl;
	if (e?.H) {
		for (let t of Object.keys(e.H)) if (e.H[t].r = e.H[t].r || [], e.H[t].L = e.H[t].L || [], e.H[t].r = [...e.H[t].L], e.CP) for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
	}
}
function ho(e) {
	return new Promise((t, n) => {
		function r() {
			mo(), gapi.load("gapi.iframes", {
				callback: () => {
					t(gapi.iframes.getContext());
				},
				ontimeout: () => {
					mo(), n(C(e, "network-request-failed"));
				},
				timeout: po.get()
			});
		}
		if (I().gapi?.iframes?.Iframe) t(gapi.iframes.getContext());
		else if (I().gapi?.load) r();
		else {
			let t = zr("iframefcb");
			return I()[t] = () => {
				gapi.load ? r() : n(C(e, "network-request-failed"));
			}, Ir(`${Rr()}?onload=${t}`).catch((e) => n(e));
		}
	}).catch((e) => {
		throw go = null, e;
	});
}
var go = null;
function _o(e) {
	return go ||= ho(e), go;
}
var vo = new An(5e3, 15e3), yo = "__/auth/iframe", bo = "emulator/auth/iframe", xo = {
	style: {
		position: "absolute",
		top: "-100px",
		width: "1px",
		height: "1px"
	},
	"aria-hidden": "true",
	tabindex: "-1"
}, So = new Map([
	["identitytoolkit.googleapis.com", "p"],
	["staging-identitytoolkit.sandbox.googleapis.com", "s"],
	["test-identitytoolkit.sandbox.googleapis.com", "t"]
]);
function Co(e) {
	let t = e.config;
	T(t.authDomain, e, "auth-domain-config-required");
	let n = t.emulator ? jn(t, bo) : `https://${e.config.authDomain}/${yo}`, r = {
		apiKey: t.apiKey,
		appName: e.name,
		v: Yt
	}, i = So.get(e.config.apiHost);
	i && (r.eid = i);
	let a = e._getFrameworks();
	return a.length && (r.fw = a.join(",")), `${n}?${xe(r).slice(1)}`;
}
async function wo(e) {
	let t = await _o(e), n = I().gapi;
	return T(n, e, "internal-error"), t.open({
		where: document.body,
		url: Co(e),
		messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
		attributes: xo,
		dontclear: !0
	}, (t) => new Promise(async (n, r) => {
		await t.restyle({ setHideOnLeave: !1 });
		let i = C(e, "network-request-failed"), a = I().setTimeout(() => {
			r(i);
		}, vo.get());
		function o() {
			I().clearTimeout(a), n(t);
		}
		t.ping(o).then(o, () => {
			r(i);
		});
	}));
}
var To = {
	location: "yes",
	resizable: "yes",
	statusbar: "yes",
	toolbar: "no"
}, Eo = 500, Do = 600, Oo = "_blank", ko = "http://localhost", Ao = class {
	constructor(e) {
		this.window = e, this.associatedEvent = null;
	}
	close() {
		if (this.window) try {
			this.window.close();
		} catch {}
	}
};
function jo(e, t, n, r = Eo, i = Do) {
	let a = Math.max((window.screen.availHeight - i) / 2, 0).toString(), o = Math.max((window.screen.availWidth - r) / 2, 0).toString(), s = "", c = {
		...To,
		width: r.toString(),
		height: i.toString(),
		top: a,
		left: o
	}, l = f().toLowerCase();
	n && (s = vr(l) ? Oo : n), gr(l) && (t ||= ko, c.scrollbars = "yes");
	let u = Object.entries(c).reduce((e, [t, n]) => `${e}${t}=${n},`, "");
	if (wr(l) && s !== "_self") return Mo(t || "", s), new Ao(null);
	let d = window.open(t || "", s, u);
	T(d, e, "popup-blocked");
	try {
		d.focus();
	} catch {}
	return new Ao(d);
}
function Mo(e, t) {
	let n = document.createElement("a");
	n.href = e, n.target = t;
	let r = document.createEvent("MouseEvent");
	r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r);
}
var No = "__/auth/handler", Po = "emulator/auth/handler", Fo = "fac";
async function Io(e, t, n, r, i, a) {
	T(e.config.authDomain, e, "auth-domain-config-required"), T(e.config.apiKey, e, "invalid-api-key");
	let o = {
		apiKey: e.config.apiKey,
		appName: e.name,
		authType: n,
		redirectUrl: r,
		v: Yt,
		eventId: i
	};
	if (t instanceof Si) {
		t.setDefaultLanguage(e.languageCode), o.providerId = t.providerId || "", ye(t.getCustomParameters()) || (o.customParameters = JSON.stringify(t.getCustomParameters()));
		for (let [e, t] of Object.entries(a || {})) o[e] = t;
	}
	if (t instanceof Ci) {
		let e = t.getScopes().filter((e) => e !== "");
		e.length > 0 && (o.scopes = e.join(","));
	}
	e.tenantId && (o.tid = e.tenantId);
	let s = o;
	for (let e of Object.keys(s)) s[e] === void 0 && delete s[e];
	let c = await e._getAppCheckToken(), l = c ? `#${Fo}=${encodeURIComponent(c)}` : "";
	return `${Lo(e)}?${xe(s).slice(1)}${l}`;
}
function Lo({ config: e }) {
	return e.emulator ? jn(e, Po) : `https://${e.authDomain}/${No}`;
}
var Ro = "webStorageSupport", zo = class {
	constructor() {
		this.eventManagers = {}, this.iframes = {}, this.originValidationPromises = {}, this._redirectPersistence = ca, this._completeRedirectFn = to, this._overrideRedirectResult = Qa;
	}
	async _openPopup(e, t, n, r) {
		return D(this.eventManagers[e._key()]?.manager, "_initialize() not called before _openPopup()"), jo(e, await Io(e, t, n, Tn(), r), da());
	}
	async _openRedirect(e, t, n, r) {
		return await this._originValidation(e), pa(await Io(e, t, n, Tn(), r)), new Promise(() => {});
	}
	_initialize(e) {
		let t = e._key();
		if (this.eventManagers[t]) {
			let { manager: e, promise: n } = this.eventManagers[t];
			return e ? Promise.resolve(e) : (D(n, "If manager is not set, promise should be"), n);
		}
		let n = this.initAndGetManager(e);
		return this.eventManagers[t] = { promise: n }, n.catch(() => {
			delete this.eventManagers[t];
		}), n;
	}
	async initAndGetManager(e) {
		let t = await wo(e), n = new ro(e);
		return t.register("authEvent", (t) => (T(t?.authEvent, e, "invalid-auth-event"), { status: n.onEvent(t.authEvent) ? "ACK" : "ERROR" }), gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER), this.eventManagers[e._key()] = { manager: n }, this.iframes[e._key()] = t, n;
	}
	_isIframeWebStorageSupported(e, t) {
		this.iframes[e._key()].send(Ro, { type: Ro }, (n) => {
			let r = n?.[0]?.[Ro];
			r !== void 0 && t(!!r), S(e, "internal-error");
		}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
	}
	_originValidation(e) {
		let t = e._key();
		return this.originValidationPromises[t] || (this.originValidationPromises[t] = uo(e)), this.originValidationPromises[t];
	}
	get _shouldInitProactively() {
		return Er() || _r() || Cr();
	}
}, Bo = class {
	constructor(e) {
		this.factorId = e;
	}
	_process(e, t, n) {
		switch (t.type) {
			case "enroll": return this._finalizeEnroll(e, t.credential, n);
			case "signin": return this._finalizeSignIn(e, t.credential);
			default: return E("unexpected MultiFactorSessionType");
		}
	}
}, Vo = class e extends Bo {
	constructor(e) {
		super("phone"), this.credential = e;
	}
	static _fromCredential(t) {
		return new e(t);
	}
	_finalizeEnroll(e, t, n) {
		return Ji(e, {
			idToken: t,
			displayName: n,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
	_finalizeSignIn(e, t) {
		return Pa(e, {
			mfaPendingCredential: t,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
}, Ho = class {
	constructor() {}
	static assertion(e) {
		return Vo._fromCredential(e);
	}
};
Ho.FACTOR_ID = "phone";
var Uo = class {
	static assertionForEnrollment(e, t) {
		return Wo._fromSecret(e, t);
	}
	static assertionForSignIn(e, t) {
		return Wo._fromEnrollmentId(e, t);
	}
	static async generateSecret(e) {
		let t = e;
		T(t.user?.auth !== void 0, "internal-error");
		let n = await Yi(t.user.auth, {
			idToken: t.credential,
			totpEnrollmentInfo: {}
		});
		return Go._fromStartTotpMfaEnrollmentResponse(n, t.user.auth);
	}
};
Uo.FACTOR_ID = "totp";
var Wo = class e extends Bo {
	constructor(e, t, n) {
		super("totp"), this.otp = e, this.enrollmentId = t, this.secret = n;
	}
	static _fromSecret(t, n) {
		return new e(n, void 0, t);
	}
	static _fromEnrollmentId(t, n) {
		return new e(n, t);
	}
	async _finalizeEnroll(e, t, n) {
		return T(this.secret !== void 0, e, "argument-error"), Xi(e, {
			idToken: t,
			displayName: n,
			totpVerificationInfo: this.secret._makeTotpVerificationInfo(this.otp)
		});
	}
	async _finalizeSignIn(e, t) {
		T(this.enrollmentId !== void 0 && this.otp !== void 0, e, "argument-error");
		let n = { verificationCode: this.otp };
		return Fa(e, {
			mfaPendingCredential: t,
			mfaEnrollmentId: this.enrollmentId,
			totpVerificationInfo: n
		});
	}
}, Go = class e {
	constructor(e, t, n, r, i, a, o) {
		this.sessionInfo = a, this.auth = o, this.secretKey = e, this.hashingAlgorithm = t, this.codeLength = n, this.codeIntervalSeconds = r, this.enrollmentCompletionDeadline = i;
	}
	static _fromStartTotpMfaEnrollmentResponse(t, n) {
		return new e(t.totpSessionInfo.sharedSecretKey, t.totpSessionInfo.hashingAlgorithm, t.totpSessionInfo.verificationCodeLength, t.totpSessionInfo.periodSec, new Date(t.totpSessionInfo.finalizeEnrollmentTime).toUTCString(), t.totpSessionInfo.sessionInfo, n);
	}
	_makeTotpVerificationInfo(e) {
		return {
			sessionInfo: this.sessionInfo,
			verificationCode: e
		};
	}
	generateQrCodeUrl(e, t) {
		let n = !1;
		return (Ko(e) || Ko(t)) && (n = !0), n && (Ko(e) && (e = this.auth.currentUser?.email || "unknownuser"), Ko(t) && (t = this.auth.name)), `otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`;
	}
};
function Ko(e) {
	return e === void 0 || e?.length === 0;
}
var qo = "@firebase/auth", Jo = "1.13.6", Yo = class {
	constructor(e) {
		this.auth = e, this.internalListeners = /* @__PURE__ */ new Map();
	}
	getUid() {
		return this.assertAuthConfigured(), this.auth.currentUser?.uid || null;
	}
	async getToken(e) {
		return this.assertAuthConfigured(), await this.auth._initializationPromise, this.auth.currentUser ? { accessToken: await this.auth.currentUser.getIdToken(e) } : null;
	}
	addAuthTokenListener(e) {
		if (this.assertAuthConfigured(), this.internalListeners.has(e)) return;
		let t = this.auth.onIdTokenChanged((t) => {
			e(t?.stsTokenManager.accessToken || null);
		});
		this.internalListeners.set(e, t), this.updateProactiveRefresh();
	}
	removeAuthTokenListener(e) {
		this.assertAuthConfigured();
		let t = this.internalListeners.get(e);
		t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
	}
	assertAuthConfigured() {
		T(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
	}
	updateProactiveRefresh() {
		this.internalListeners.size > 0 ? this.auth._startProactiveRefresh() : this.auth._stopProactiveRefresh();
	}
};
function Xo(e) {
	switch (e) {
		case "Node": return "node";
		case "ReactNative": return "rn";
		case "Worker": return "webworker";
		case "Cordova": return "cordova";
		case "WebExtension": return "web-extension";
		default: return;
	}
}
function Zo(e) {
	Kt(new Ae("auth", (t, { options: n }) => {
		let r = t.getProvider("app").getImmediate(), i = t.getProvider("heartbeat"), a = t.getProvider("app-check-internal"), { apiKey: o, authDomain: s } = r.options;
		T(o && !o.includes(":"), "invalid-api-key", { appName: r.name });
		let c = new Mr(r, i, a, {
			apiKey: o,
			authDomain: s,
			clientPlatform: e,
			apiHost: "identitytoolkit.googleapis.com",
			tokenApiHost: "securetoken.googleapis.com",
			apiScheme: "https",
			sdkClientVersion: Dr(e)
		});
		return Yr(c, n), c;
	}, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e, t, n) => {
		e.getProvider("auth-internal").initialize();
	})), Kt(new Ae("auth-internal", (e) => ((e) => new Yo(e))(N(e.getProvider("auth").getImmediate())), "PRIVATE").setInstantiationMode("EXPLICIT")), Qt(qo, Jo, Xo(e)), Qt(qo, Jo, "esm2020");
}
var Qo = se("authIdTokenMaxAge") || 300, $o = null, es = (e) => async (t) => {
	let n = t && await t.getIdTokenResult(), r = n && ((/* @__PURE__ */ new Date()).getTime() - Date.parse(n.issuedAtTime)) / 1e3;
	if (r && r > Qo) return;
	let i = n?.token;
	$o !== i && ($o = i, await fetch(e, {
		method: i ? "POST" : "DELETE",
		headers: i ? { Authorization: `Bearer ${i}` } : {}
	}));
};
function ts(e = Zt()) {
	let t = qt(e, "auth");
	if (t.isInitialized()) return t.getImmediate();
	let n = Jr(e, {
		popupRedirectResolver: zo,
		persistence: [
			Ma,
			na,
			ca
		]
	}), r = se("authTokenSyncURL");
	if (r && typeof isSecureContext == "boolean" && isSecureContext) {
		let e = new URL(r, location.origin);
		if (location.origin === e.origin) {
			let t = es(e.toString());
			Wi(n, t, () => t(n.currentUser)), Ui(n, (e) => t(e));
		}
	}
	let i = ae("auth");
	return i && Xr(n, `http://${i}`), n;
}
function ns() {
	return document.getElementsByTagName("head")?.[0] ?? document;
}
Fr({
	loadJS(e) {
		return new Promise((t, n) => {
			let r = document.createElement("script");
			r.setAttribute("src", e), r.onload = t, r.onerror = (e) => {
				let t = C("internal-error");
				t.customData = e, n(t);
			}, r.type = "text/javascript", r.charset = "UTF-8", ns().appendChild(r);
		});
	},
	gapiScript: "https://apis.google.com/js/api.js",
	recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
	recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render="
}), Zo("Browser");
//#endregion
//#region frontend/app.js
var L = (e) => document.getElementById(e), R = !1, rs = "unknown", is = !1, as = !1, os = e(navigator.userAgent, navigator.maxTouchPoints), ss = t(navigator.userAgent), cs = "", ls = 0, us = localStorage.getItem("poetisa_signed_out") === "true", z = {}, B = null, V = null, H = "signup", ds = "", fs = [], ps = null, U = !1, W = {
	joined: !1,
	name: "",
	history: [],
	today: "",
	used_today: !1,
	ready: !1,
	account: !1
}, G = null, K = !1, ms = !1, hs = null;
async function q(e, t) {
	let n = ls, r = { "Content-Type": "application/json" };
	V && (r.Authorization = "Bearer " + await qn(V));
	let i;
	try {
		i = await fetch("/api/" + e, {
			method: t === void 0 ? "GET" : "POST",
			headers: r,
			credentials: "same-origin",
			body: t === void 0 ? void 0 : JSON.stringify(t)
		});
	} catch {
		throw Error("No pude conectar. Comprueba tu conexión a Internet y vuelve a abrir PoetisA.");
	}
	let a = await i.json();
	if (n !== ls) throw Error("La sesión cambió. Abre tu cuaderno de nuevo.");
	if (!i.ok) {
		a.join_required && (W.joined = !1, X());
		let e = Error(a.error || "Algo no salió bien. Vuelve en un momento.");
		throw e.code = a.code, e;
	}
	return a;
}
function J(e, t = !1) {
	L("message").textContent = e, L("message").hidden = !e, L("message").classList.toggle("error", t);
}
function Y(e) {
	return (/* @__PURE__ */ new Date(e + "T12:00:00")).toLocaleDateString("es", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function gs() {
	return [...W.history].reverse().find((e) => e.kind === "published" && e.date === W.today);
}
function _s(e) {
	G = e, L("empty-poem").hidden = !0, L("poem-result").hidden = !1;
	let t = e.work;
	L("poem-title").textContent = t.title, L("poem-body").textContent = t.text, L("poem-author").textContent = t.author, L("reading-kind").textContent = "POEMA PUBLICADO · VOZ CHILENA", L("poem-book").textContent = t.book + " · " + t.year, L("poem-source").href = t.sourceUrl, L("download-source").href = t.pdfUrl, L("poem-source").textContent = "Fuente consultada · " + t.sourceLabel, L("poem-rights").textContent = t.rightsBasis + (t.transcriptionNote ? " " + t.transcriptionNote : ""), L("rights-source").href = t.rightsUrl, L("reason-label").textContent = e.relevance === "discovery" ? "UN DESCUBRIMIENTO PARA HOY" : "POR QUÉ TE LO ACERCO", L("poem-reason").textContent = e.reason, L("poem-kicker").textContent = "LECTURA PARA " + e.name.toLocaleUpperCase("es") + " · " + Y(e.date).toLocaleUpperCase("es"), L("poem-tags").replaceChildren(...e.words.map((e) => {
		let t = document.createElement("span");
		return t.textContent = e, t;
	}));
}
function X() {
	let e = W.joined && !!W.name && !ms;
	if (L("account-open").textContent = W.account ? "Mi cuenta" : "Crear mi cuenta", L("journey-card").hidden = !W.account, L("mobile-nav").hidden = !e, L("account-entry").hidden = !!V || W.joined, L("legacy-access").hidden = W.joined || !!V, Es(), W.account && W.journey) {
		let e = W.journey;
		L("journey-title").textContent = e.writingInvited ? "Hoy también hay lugar para tu voz." : "De leer poesía a encontrar tu voz.", L("journey-copy").textContent = e.writingInvited ? "Ya llevamos seis meses de camino. Te invito a escribir tu primer poema, y después, un poquito cada día. Si ya empezaste, sigamos. Sin prisa ni obligación." : "Nuestro camino comenzó el " + Y(e.registeredOn) + ". El " + Y(e.invitationOn) + " te invitaré a escribir tu primer poema. Si hoy tienes ganas, puedes empezar.";
	}
	if (L("name-submit").textContent = W.profile_required ? "Abrir mi cuaderno personal ♡" : "Vamos a conocernos", L("profile-consent").hidden = !W.profile_required, L("profile-accept").required = !!W.profile_required, L("onboarding").hidden = e, L("studio").hidden = !e, L("invite-form").hidden = W.joined || !!V, L("name-form").hidden = !W.joined && !W.profile_required, L("history-open").disabled = !W.joined || K, L("reminder-open").disabled = K, !e) return;
	L("greeting").textContent = "Hola, " + W.name + ".", L("date-label").textContent = "TU ENCUENTRO CON LA POESÍA · " + Y(W.today).toLocaleUpperCase("es"), L("greeting-copy").textContent = W.history.length ? "Qué bueno volver a encontrarnos. Trae un pedacito de tu día: una imagen, un recuerdo o algo que te ronde el corazón. Buscaré una voz chilena que dialogue con tus palabras." : "Un gusto saludarte. Regálame tres palabras de tu día y buscaré un poema de una poeta o un poeta chileno para acompañarte.", L("words-heading").textContent = W.history.length ? "¿Qué palabras te acompañan hoy?" : "Partamos con el primer poema.";
	let t = gs();
	L("poem-form").hidden = !!t || W.used_today, L("daily-note").hidden = !t && !W.used_today, L("daily-note").textContent = t ? "El poema de hoy ya está en nuestro cuaderno. Mañana nos esperan otras tres palabras. ♡" : "Ya tuvimos nuestro encuentro de hoy. Mañana nos esperan otras tres palabras. ♡", t && !G && _s(t);
}
async function Z() {
	us && !V && (await q("logout", {}), us = !1, localStorage.removeItem("poetisa_signed_out")), W = {
		joined: !1,
		account: !1,
		profile_required: !1,
		name: "",
		history: [],
		used_today: !1,
		...await q("status")
	}, X(), W.account && Ds().catch(() => {});
}
document.querySelectorAll("[data-close]").forEach((e) => e.onclick = () => L(e.dataset.close).close()), L("invite-form").onsubmit = async (e) => {
	e.preventDefault(), e.submitter.disabled = !0;
	try {
		await q("join", { code: L("invite-code").value.trim() }), L("invite-code").value = "", await Z(), J("Qué alegría que hayas venido. Empecemos por tu nombre."), L("name").focus();
	} catch (e) {
		J(e.message, !0);
	} finally {
		e.submitter.disabled = !1;
	}
}, L("name-form").onsubmit = async (e) => {
	e.preventDefault(), e.submitter.disabled = !0;
	try {
		if (W.profile_required) await q("account", {
			name: L("name").value,
			consent: L("profile-accept").checked
		}), await Z();
		else {
			let e = await q("name", { name: L("name").value });
			W.name = e.name;
		}
		ms = !1, G = null, X(), J(""), L("poem-form").hidden || L("word1").focus();
	} catch (e) {
		J(e.message, !0);
	} finally {
		e.submitter.disabled = !1;
	}
}, L("change-name").onclick = () => {
	K || (ms = !0, L("name").value = W.name, G = null, L("empty-poem").hidden = !1, L("poem-result").hidden = !0, X(), L("name").focus());
}, L("poem-form").onsubmit = async (e) => {
	if (e.preventDefault(), !K) {
		K = !0;
		for (let e of [
			"generate",
			"change-name",
			"history-open",
			"reminder-open"
		]) L(e).disabled = !0;
		L("writing").hidden = !1, L("empty-poem").hidden = !0, L("poem-result").hidden = !0, J("");
		try {
			let e = await q("poem", { words: [
				1,
				2,
				3
			].map((e) => L("word" + e).value.trim()) });
			_s(e.poem), W.used_today = !0, W.history.some((t) => t.id === e.poem.id) || W.history.push(e.poem), J(e.cached ? "Aquí está tu lectura de hoy." : "Tu lectura ya está guardada en nuestro cuaderno, con su autoría y su fuente.");
		} catch (e) {
			J(e.message, !0), L("poem-result").hidden = !G, L("empty-poem").hidden = !!G;
		} finally {
			K = !1, L("writing").hidden = !0;
			for (let e of [
				"generate",
				"change-name",
				"history-open",
				"reminder-open"
			]) L(e).disabled = !1;
			await Z().catch(() => {});
		}
	}
};
function vs() {
	if (!G) return "";
	let e = G, t = e.work;
	return t.title + "\n" + t.author + "\n" + t.book + " (" + t.year + ")\n\n" + t.text + "\n\nFuente: " + t.sourceUrl + "\n" + t.rightsBasis + "\nDerechos: " + t.rightsUrl + "\n\nSeleccionado por PoetisA para " + e.name + " · " + Y(e.date) + "\nTus palabras: " + e.words.join(", ") + "\n\nLectura de PoetisA (no forma parte del poema): " + e.reason + "\n";
}
L("copy").onclick = async () => {
	try {
		await navigator.clipboard.writeText(vs()), J("Poema copiado. Ya puedes compartir ese abrazo.");
	} catch {
		J("No pude copiarlo. Usa Descargar poema .txt para llevarte el poema.", !0);
	}
}, L("download").onclick = () => {
	if (!G) return;
	let e = URL.createObjectURL(new Blob([vs()], { type: "text/plain;charset=utf-8" })), t = document.createElement("a");
	t.href = e, t.download = "PoetisA_" + G.date + ".txt", t.click(), setTimeout(() => URL.revokeObjectURL(e), 1500);
}, L("print").onclick = () => window.print();
function ys() {
	let e = L("history-list");
	if (e.replaceChildren(), !W.history.length) {
		let t = document.createElement("p");
		t.textContent = "Nuestro cuaderno aún está en blanco. La primera lectura nos espera.", e.append(t);
	}
	for (let t of [...W.history].sort((e, t) => t.date.localeCompare(e.date))) {
		let n = document.createElement("button");
		n.className = "history-entry";
		let r = document.createElement("span");
		r.textContent = Y(t.date) + " · Para " + t.name;
		let i = document.createElement("strong");
		i.textContent = t.work.title;
		let a = document.createElement("small");
		a.textContent = t.work.author + " · " + t.words.join(" · "), n.append(r, i, a), n.onclick = () => {
			_s(t), L("history-dialog").close();
		}, e.append(n);
	}
	L("history-account-note").textContent = W.account ? "Tu cuaderno es privado y te acompaña en los dispositivos donde inicias sesión." : "Estas lecturas pertenecen a la prueba de este navegador. Crea una cuenta para llevarlas contigo.", L("writings-tab").disabled = !W.account, L("export-notebook").hidden = !W.account;
}
L("history-open").onclick = async () => {
	try {
		await Z(), ys(), bs("readings"), L("history-dialog").showModal();
	} catch (e) {
		J(e.message, !0);
	}
};
function bs(e) {
	L("history-list").hidden = e !== "readings", L("writings-list").hidden = e !== "writings";
	for (let t of ["readings", "writings"]) L(t + "-tab").setAttribute("aria-pressed", String(e === t));
	e === "writings" && xs();
}
L("readings-tab").onclick = () => bs("readings"), L("writings-tab").onclick = () => bs("writings");
async function xs() {
	let e = L("writings-list");
	e.textContent = "Abriendo tus poemas…";
	try {
		fs = (await q("writings")).writings, e.replaceChildren(), fs.length || (e.textContent = "Tu primera página está esperando. Una imagen, una línea: eso también es comenzar.");
		for (let t of fs) {
			let n = document.createElement("button");
			n.className = "history-entry";
			let r = document.createElement("strong");
			r.textContent = t.title;
			let i = document.createElement("small");
			i.textContent = Y(t.day) + " · " + (t.status === "draft" ? "Borrador" : "Poema guardado"), n.append(r, i), n.onclick = () => {
				L("history-dialog").close(), zs(t);
			}, e.append(n);
		}
	} catch (t) {
		e.textContent = t.message;
	}
}
function Ss() {
	return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === !0 || is;
}
function Cs() {
	return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}
async function ws() {
	if (cs) throw Error(cs);
	if (!("serviceWorker" in navigator)) throw Error("Este navegador no permite preparar los avisos. Abre PoetisA en Chrome, Edge o Safari actualizado.");
	return r(navigator.serviceWorker.ready, 8e3, "No pude preparar los avisos. Comprueba Internet y vuelve a abrir PoetisA.");
}
async function Ts() {
	return "serviceWorker" in navigator && (await ws()).pushManager?.getSubscription() || null;
}
function Es() {
	L("setup-account-status").textContent = W.account ? "Tu cuaderno privado está abierto." : V && !V.emailVerified ? "Confirma el enlace que llegó a tu correo." : "Crea tu cuenta y confirma tu correo.", L("setup-account").textContent = W.account ? "Ver mi cuenta" : "Crear o abrir mi cuenta";
	let e = Ss();
	L("setup-install-status").textContent = e ? "PoetisA está disponible como aplicación en este equipo." : "Un icono propio en Windows o Mac.", L("setup-install").textContent = e ? "Ver opciones de instalación" : "Instalar en mi equipo", L("install").textContent = e ? "Mi aplicación" : "Instalar PoetisA", L("setup-push-status").textContent = W.account ? R ? "Avisos activados en este equipo a las 9:00 de Chile." : rs === "failed" ? "No pudimos comprobar los avisos. Revisa tu conexión." : "Activa los avisos y prueba el primero en este equipo." : "Un aviso a las 9:00 de Chile, si tú quieres.", L("setup-reminders").textContent = R ? "Probar o gestionar avisos" : "Preparar mi recordatorio";
}
async function Ds() {
	let e = ls, t = Cs();
	if (L("push-enable").hidden = !0, L("push-test").hidden = !0, L("push-disable").hidden = !0, L("push-signin").hidden = W.account, L("push-device-help").textContent = os === "ios" ? "En iPhone, instala PoetisA desde Safari y ábrela desde su icono antes de activar los avisos." : "El permiso se activa una vez en cada equipo. Tu cuaderno seguirá siendo el mismo.", !W.account) {
		R = !1, rs = "unknown", L("push-status").textContent = "Abre tu cuenta y confirma tu correo para recibir avisos en este equipo.", Es();
		return;
	}
	if (!t) {
		R = !1, rs = "unsupported", L("push-status").textContent = os === "ios" ? "Abre PoetisA desde el icono de tu pantalla de inicio. Los avisos requieren iOS 16.4 o posterior." : "Este navegador no admite avisos. Prueba Chrome, Edge o Safari actualizados.", Es();
		return;
	}
	if (!z.push_ready) {
		L("push-status").textContent = "El servicio de avisos está temporalmente en preparación. Puedes seguir usando tu cuaderno.";
		return;
	}
	L("push-status").textContent = "Comprobando los avisos de este equipo…";
	try {
		let t = await Ts(), n = !1;
		if (t && (n = (await q("push-status?endpoint=" + encodeURIComponent(t.endpoint))).active), e !== ls) return;
		R = n, rs = "checked", L("push-enable").hidden = n || Notification.permission === "denied", L("push-disable").hidden = !t, L("push-test").hidden = !n, L("push-status").textContent = n ? "Avisos activados a las 9:00 de Chile. Envía una prueba para comprobar cómo se ven en tu equipo." : Notification.permission === "denied" ? "Los avisos están bloqueados. Permítelos en los ajustes de notificaciones del navegador o de la app y vuelve aquí." : "Puedes activar un aviso diario. El navegador te pedirá permiso.";
	} catch (t) {
		if (e !== ls) return;
		R = !1, rs = "failed", L("push-status").textContent = t.message;
	}
	Es();
}
async function Os() {
	L("reminder-dialog").open || L("reminder-dialog").showModal(), await Ds();
}
L("reminder-open").onclick = Os, L("setup-reminders").onclick = Os, L("push-signin").onclick = () => {
	L("reminder-dialog").close(), W.profile_required ? (L("name").focus(), J("Elige tu nombre y abre tu cuaderno para activar los avisos.")) : $();
}, L("push-enable").onclick = async (e) => {
	e.target.disabled = !0;
	try {
		if (!W.account || !z.push_ready || !Cs()) throw Error("Abre tu cuenta en un navegador compatible para activar los avisos.");
		if (Notification.permission === "denied") throw Error("Permite los avisos en los ajustes del navegador y vuelve a intentarlo.");
		if (await Notification.requestPermission() !== "granted") throw Error("No activamos los avisos. Puedes volver cuando quieras.");
		let e = await ws(), t = z.vapid_public_key.replace(/-/g, "+").replace(/_/g, "/"), n = Uint8Array.from(atob(t.padEnd(Math.ceil(t.length / 4) * 4, "=")), (e) => e.charCodeAt(0)), r = await e.pushManager.getSubscription();
		r ||= await e.pushManager.subscribe({
			userVisibleOnly: !0,
			applicationServerKey: n
		});
		try {
			await q("push-subscribe", {
				subscription: r.toJSON(),
				consent: !0
			});
		} catch (e) {
			throw await r.unsubscribe(), e;
		}
		await Ds();
	} catch (e) {
		L("push-status").textContent = e.message;
	} finally {
		e.target.disabled = !1;
	}
}, L("push-disable").onclick = async (e) => {
	e.target.disabled = !0;
	try {
		let e = await Ts();
		e && (W.account && await q("push-unsubscribe", { endpoint: e.endpoint }), await e.unsubscribe()), R = !1, await Ds(), L("push-status").textContent = "Listo. Este equipo ya no recibirá avisos.";
	} catch (e) {
		L("push-status").textContent = e.message;
	} finally {
		e.target.disabled = !1;
	}
}, L("push-test").onclick = async (e) => {
	e.target.disabled = !0, L("push-status").textContent = "Enviando una prueba a este equipo…";
	try {
		let e = await q("push-test", { endpoint: (await Ts())?.endpoint });
		L("push-status").textContent = e.message + " Si no la ves, abre la ayuda de abajo. Puedes pedir una prueba por día en cada equipo.";
	} catch (e) {
		L("push-status").textContent = e.message;
	} finally {
		e.target.disabled = !1;
	}
}, L("privacy-open").onclick = () => L("privacy-dialog").showModal();
function Q() {
	let [e, t] = L("install-platform").value.split("-"), r = n(e, t);
	L("install-guide-title").textContent = r.title, L("install-note").textContent = r.note, L("install-steps").replaceChildren(...r.steps.map((e) => {
		let t = document.createElement("li");
		return t.textContent = e, t;
	})), L("install-state").textContent = Ss() ? "PoetisA ya está instalada en este equipo. Ábrela desde su icono cuando quieras." : "Al instalarla tendrás un icono propio. Tu cuenta y tus lecturas se conservan.", L("install-now").hidden = !hs || Ss();
}
function ks() {
	Q(), L("install-dialog").open || L("install-dialog").showModal();
}
var As = os === "mac" ? "mac-" + (["safari", "edge"].includes(ss) ? ss : "chrome") : os === "ios" ? "ios-safari" : os === "android" ? "android-chrome" : "windows-" + (ss === "edge" ? "edge" : "chrome");
L("install-platform").value = As, L("install-platform").onchange = Q, window.addEventListener("beforeinstallprompt", (e) => {
	e.preventDefault(), hs = e, Q();
}), window.addEventListener("appinstalled", () => {
	is = !0, hs = null, Q(), Es();
}), window.matchMedia("(display-mode: standalone)").addEventListener("change", () => {
	Es(), Q();
}), L("install").onclick = ks, L("setup-install").onclick = ks, L("install-now").onclick = async (e) => {
	if (!hs) {
		Q();
		return;
	}
	let t = hs;
	e.target.disabled = !0;
	try {
		await t.prompt();
		let e = await t.userChoice;
		hs = null, Q(), L("install-state").textContent = e.outcome === "accepted" ? "Instalación aceptada. Cuando aparezca el icono, abre PoetisA desde él." : "Puedes instalarla más adelante. Tu cuaderno sigue disponible aquí.";
	} catch {
		L("install-state").textContent = "Puedes instalarla desde el menú del navegador. Sigue los pasos de abajo.";
	} finally {
		e.target.disabled = !1;
	}
}, L("install-next").onclick = () => {
	L("install-dialog").close(), Os();
}, L("setup-account").onclick = () => {
	if (W.profile_required) {
		L("name").focus();
		return;
	}
	$();
}, L("share-pilot").onclick = async () => {
	let e = location.origin + "/poetisa?install=1", t = "Te invito a probar PoetisA: tres palabras, un poema chileno y un cuaderno para ti. Puedes instalarla en Windows o Mac. " + e;
	L("share-status").hidden = !1;
	try {
		navigator.share ? (await navigator.share({
			title: "PoetisA · Piloto",
			text: "Tres palabras, un poema chileno y un cuaderno para ti.",
			url: e
		}), L("share-status").textContent = "Puedes seguir disfrutando de tu cuaderno.") : (await navigator.clipboard.writeText(t), L("share-status").textContent = "Invitación copiada. Pégala en WhatsApp o en un correo.");
	} catch (t) {
		if (t.name === "AbortError") {
			L("share-status").hidden = !0;
			return;
		}
		L("share-status").textContent = "Comparte este enlace: " + e;
	}
};
function js() {
	let e = !navigator.onLine;
	L("connection-status").hidden = !e, L("connection-status").textContent = e ? "Estás sin conexión. Vuelve a conectarte para abrir tu cuenta, buscar un poema o guardar cambios." : "";
}
window.addEventListener("online", js), window.addEventListener("offline", js), js();
function Ms() {
	if (as) return;
	as = !0;
	let e = new URLSearchParams(location.search);
	e.get("install") === "1" ? ks() : e.get("view") === "reminders" ? Os() : e.get("view") === "notebook" && W.joined && L("history-open").click();
}
document.querySelector(".brand").onclick = (e) => {
	e.preventDefault(), window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
}, document.addEventListener("visibilitychange", () => {
	!document.hidden && !K && Z().catch(() => {});
}), "serviceWorker" in navigator && navigator.serviceWorker.register("/sw.js").catch(() => {
	cs = "No pude preparar la aplicación. Recarga PoetisA con conexión a Internet.";
}), Ls().catch((e) => J(e.message, !0)), L("collection-open").onclick = async () => {
	L("collection-dialog").showModal();
	try {
		let e = await q("collection");
		L("collection-intro").textContent = e.count + " poemas publicados de " + new Set(e.poems.map((e) => e.author)).size + " voces chilenas. Conservamos los versos de las ediciones consultadas y enlazamos sus fuentes.";
		let t = L("collection-list");
		t.replaceChildren();
		for (let n of e.poems) {
			let e = document.createElement("article");
			e.className = "collection-entry";
			let r = document.createElement("h3");
			r.textContent = n.title;
			let i = document.createElement("p");
			i.textContent = n.author + " · " + n.book + " (" + n.year + ")";
			let a = document.createElement("p");
			a.className = "collection-themes", a.textContent = n.themes.join(" · ");
			let o = document.createElement("a");
			o.textContent = "Consultar edición", o.href = n.sourceUrl, o.target = "_blank", o.rel = "noopener noreferrer", e.append(r, i, a, o), t.append(e);
		}
	} catch {
		L("collection-intro").textContent = "No pude abrir la biblioteca en este momento. Vuelve a intentarlo con conexión a Internet.";
	}
};
function Ns() {
	ls++, R = !1, rs = "unknown", G = null, fs = [], ps = null, U = !1, W = {
		joined: !1,
		account: !1,
		name: "",
		history: [],
		today: "",
		used_today: !1
	}, L("poem-result").hidden = !0, L("empty-poem").hidden = !1;
	for (let e of [
		"poem-title",
		"poem-author",
		"poem-body",
		"poem-reason",
		"poem-tags",
		"poem-kicker",
		"account-email",
		"verify-email",
		"history-list",
		"writings-list"
	]) L(e).textContent = "";
	L("original-title").value = "", L("original-body").value = "", document.querySelectorAll("dialog[open]").forEach((e) => e.close());
}
function Ps(e) {
	let t = e?.code || "";
	return t.includes("invalid-credential") || t.includes("wrong-password") || t.includes("user-not-found") ? "El correo o la contraseña no coinciden. Revísalos o recupera tu acceso." : t.includes("email-already-in-use") ? "Ese correo ya tiene una cuenta. Puedes entrar o recuperar tu contraseña." : t.includes("weak-password") || t.includes("password-does-not-meet-requirements") ? "Elige una contraseña más segura: al menos 10 caracteres, con letras y números." : t.includes("too-many-requests") ? "Hemos hecho varios intentos. Espera un momento antes de volver." : t.includes("network") ? "Comprueba tu conexión a Internet." : t.includes("invalid-email") ? "Revisa que tu correo esté bien escrito." : e.message?.startsWith("Firebase:") ? "No pudimos completar el acceso. Inténtalo en un momento." : e.message || "No pudimos abrir tu cuenta.";
}
function Fs() {
	let e = !!V?.emailVerified, t = !!V && !e;
	L("auth-form").hidden = !z.accounts_ready || !!V, L("auth-tabs").hidden = !z.accounts_ready || !!V, L("auth-pending").hidden = !!z.accounts_ready, L("verify-panel").hidden = !t, L("account-panel").hidden = !W.account, L("auth-heading").textContent = W.account ? "Tu lugar entre los versos." : t ? "Nos falta un pequeño paso." : "Un cuaderno que va contigo.", L("auth-name-wrap").hidden = H !== "signup", L("auth-name").required = H === "signup", L("auth-password").autocomplete = H === "signup" ? "new-password" : "current-password", L("auth-password").minLength = H === "signup" ? 10 : 1, L("auth-submit").textContent = H === "signup" ? "Crear mi cuenta ♡" : "Entrar a mi cuaderno", L("auth-consent-wrap").hidden = H !== "signup", L("auth-consent").required = H === "signup", L("account-email").textContent = W.email || V?.email || "", L("verify-email").textContent = V?.email || "";
	for (let e of ["signup", "login"]) L("auth-" + e).setAttribute("aria-pressed", String(e === H));
	L("import-readings").hidden = !W.account;
}
function $(e) {
	e && (H = e), Fs(), L("auth-message").textContent = "", L("account-dialog").showModal();
}
L("account-open").onclick = () => $(), L("create-account").onclick = () => $("signup"), L("existing-account").onclick = () => $("login"), L("auth-signup").onclick = () => {
	H = "signup", Fs();
}, L("auth-login").onclick = () => {
	H = "login", Fs();
}, L("auth-form").onsubmit = async (e) => {
	e.preventDefault(), e.submitter.disabled = !0, L("auth-message").textContent = "Abriendo tu pequeño espacio…";
	try {
		let e = L("auth-email").value.trim(), t = L("auth-password").value;
		H === "signup" ? (ds = L("auth-name").value.trim(), await Hi((await Bi(B, e, t)).user, { url: location.origin + "/poetisa" }), L("auth-message").textContent = "Te enviamos un enlace para confirmar tu correo. Revisa también la carpeta de correo no deseado.") : await Vi(B, e, t), L("auth-password").value = "", Fs();
	} catch (e) {
		L("auth-message").textContent = Ps(e);
	} finally {
		e.submitter.disabled = !1;
	}
}, L("reset-password").onclick = async () => {
	let e = L("auth-email").value.trim();
	if (!e || !L("auth-email").checkValidity()) {
		L("auth-message").textContent = "Escribe primero tu correo en el campo de arriba.";
		return;
	}
	try {
		await zi(B, e, { url: location.origin + "/poetisa" }), L("auth-message").textContent = "Si ese correo tiene una cuenta, recibirá un enlace para recuperar el acceso. Revisa también correo no deseado.";
	} catch (e) {
		L("auth-message").textContent = Ps(e);
	}
}, L("resend-verification").onclick = async (e) => {
	e.target.disabled = !0;
	try {
		await Hi(B.currentUser, { url: location.origin + "/poetisa" }), L("auth-message").textContent = "Enlace enviado. Revisa tu correo.";
	} catch (e) {
		L("auth-message").textContent = Ps(e);
	} finally {
		e.target.disabled = !1;
	}
}, L("check-verification").onclick = async (e) => {
	e.target.disabled = !0;
	try {
		if (await rr(B.currentUser), V = B.currentUser, await qn(V, !0), !V.emailVerified) throw Error("Todavía falta confirmar el enlace del correo.");
		await Z(), L("account-dialog").close(), W.profile_required && (L("name").value = ds, L("name").focus());
	} catch (e) {
		L("auth-message").textContent = Ps(e);
	} finally {
		e.target.disabled = !1;
	}
};
async function Is() {
	if (U && !confirm("Hay un poema sin guardar. ¿Quieres cerrar sesión y descartar estos cambios?")) return;
	us = !0, localStorage.setItem("poetisa_signed_out", "true");
	let e = !1;
	try {
		let t = await Ts();
		if (t) {
			try {
				W.account && await q("push-unsubscribe", { endpoint: t.endpoint });
			} catch {
				e = !0;
			}
			try {
				await t.unsubscribe();
			} catch {
				e = !0;
			}
		}
	} catch {
		e = !0;
	}
	try {
		await q("logout", {});
	} catch {
		e = !0;
	}
	try {
		B && await Ki(B);
	} catch {
		J("No pude cerrar la sesión. Vuelve a intentarlo antes de compartir este dispositivo.", !0);
		return;
	}
	V = null, Ns(), X(), J(e ? "Sesión cerrada en este dispositivo. Cuando recuperes conexión, abre PoetisA para completar la desactivación de sus avisos." : "Tu cuaderno queda guardado. Hasta nuestro próximo encuentro. ♡");
}
L("logout").onclick = Is, L("verify-logout").onclick = Is, L("import-readings").onclick = async () => {
	if (confirm("¿Las lecturas de la prueba guardadas en este navegador son tuyas? Solo se trasladarán los días que todavía no estén en tu cuenta.")) try {
		let e = await q("import-readings", { consent: !0 });
		await Z(), L("auth-message").textContent = e.moved + " lecturas trasladadas." + (e.remaining ? " Hay " + e.remaining + " lecturas de días que ya existen en tu cuenta; se conservan en la prueba." : "");
	} catch (e) {
		L("auth-message").textContent = e.message;
	}
};
async function Ls() {
	if (z = await q("config"), !z.accounts_ready) {
		await Z(), Ms();
		return;
	}
	B = ts(Xt(z.firebase)), B.languageCode = "es", Gi(B, async (e) => {
		if (Ns(), V = e, e && (us = !1, localStorage.removeItem("poetisa_signed_out")), e && !e.emailVerified) {
			X(), $();
			return;
		}
		try {
			await Z(), W.profile_required ? (L("name").value = ds, J("Elige tu nombre para abrir tu cuaderno.")) : W.account && J("Tu cuaderno está contigo. ♡"), Ms();
		} catch (e) {
			J(Ps(e), !0);
		}
	});
}
function Rs(e, t, n = "text/plain;charset=utf-8") {
	let r = URL.createObjectURL(new Blob([e], { type: n })), i = document.createElement("a");
	i.href = r, i.download = t, i.click(), setTimeout(() => URL.revokeObjectURL(r), 1500);
}
L("export-notebook").onclick = async () => {
	try {
		let e = await q("notebook"), t = "MI CUADERNO DE POETISA — " + e.name + "\n\nLECTURAS\n";
		for (let n of e.readings) t += "\n" + n.date + " · " + n.words.join(", ") + "\n" + n.work.title + " — " + n.work.author + "\n" + n.work.book + " (" + n.work.year + ")\n\n" + n.work.text + "\n\nFuente: " + n.work.sourceUrl + "\n" + n.work.rightsBasis + "\n\nLectura de PoetisA: " + n.reason + "\n\n";
		t += "\nMIS POEMAS\n";
		for (let n of e.writings) t += "\n" + n.title + " · " + n.day + " · " + (n.status === "draft" ? "Borrador" : "Poema") + "\n\n" + n.body + "\n\n";
		Rs(t, "Mi_cuaderno_PoetisA.txt");
	} catch (e) {
		J(e.message, !0);
	}
};
function zs(e = null) {
	if (!W.account) {
		$();
		return;
	}
	ps = e ? { ...e } : {
		id: crypto.randomUUID(),
		revision: 0,
		status: "draft"
	}, L("original-title").value = e?.title || "", L("original-body").value = e?.body || "", L("writing-status").value = e?.status || "draft", L("editor-message").textContent = "Solo tú puedes leerlo. Lo guardaré cuando pulses el botón.", U = !1, L("delete-writing").hidden = !e, L("editor-dialog").showModal(), L("original-body").focus();
}
L("write-open").onclick = () => zs(), L("write-new").onclick = () => {
	L("history-dialog").close(), zs();
};
for (let e of [
	"original-title",
	"original-body",
	"writing-status"
]) L(e).addEventListener("input", () => {
	U = !0, L("editor-message").textContent = "Cambios sin guardar.";
});
function Bs() {
	return !U || confirm("Tu poema tiene cambios sin guardar. ¿Quieres descartarlos?");
}
L("editor-close").onclick = () => {
	Bs() && (L("editor-dialog").close(), U = !1);
}, L("editor-dialog").addEventListener("cancel", (e) => {
	Bs() ? U = !1 : e.preventDefault();
}), window.addEventListener("beforeunload", (e) => {
	U && (e.preventDefault(), e.returnValue = "");
}), L("original-form").onsubmit = async (e) => {
	e.preventDefault(), e.submitter.disabled = !0;
	try {
		ps = (await q("writing", {
			...ps,
			title: L("original-title").value,
			body: L("original-body").value,
			status: L("writing-status").value
		})).writing, U = !1, L("delete-writing").hidden = !1, L("editor-message").textContent = "Guardado en tu cuaderno privado. Tu voz ya tiene un lugar aquí. ♡";
	} catch (e) {
		L("editor-message").textContent = e.message + " Puedes descargar lo escrito para conservarlo.";
	} finally {
		e.submitter.disabled = !1;
	}
}, L("download-writing").onclick = () => Rs((L("original-title").value || "Sin título") + "\n\n" + L("original-body").value, "Mi_poema_PoetisA.txt"), L("delete-writing").onclick = async () => {
	if (confirm("¿Borrar este poema de tu cuaderno? Esta acción no se puede deshacer.")) try {
		await q("writing-delete", {
			id: ps.id,
			revision: ps.revision
		}), U = !1, L("editor-dialog").close(), J("Poema eliminado de tu cuaderno.");
	} catch (e) {
		L("editor-message").textContent = e.message;
	}
}, L("mobile-home").onclick = () => window.scrollTo({
	top: 0,
	behavior: "smooth"
}), L("mobile-book").onclick = () => L("history-open").click(), L("mobile-write").onclick = () => zs(), L("mobile-account").onclick = () => $();
//#endregion
