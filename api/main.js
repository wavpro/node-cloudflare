import isServiceKey from '../util/isservicekey.js';
import { createRequire } from "module";
import objectToGet from '../util/objecttoget.js';
const require = createRequire(import.meta.url);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let pkg = require('../package.json');

class API {
    constructor(client) {
        this._client = client;
    }
    get(url, data = {}) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url + objectToGet(data));
        if (this._client.key && isServiceKey(this._client.key)){
            xhr.setRequestHeader("X-Auth-User-Service-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.key && this._client.email) {
            xhr.setRequestHeader("X-Auth-Email", this._client.email);
            xhr.setRequestHeader("X-Auth-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.token) {
            xhr.setRequestHeader("Authorization", "Bearer " + this._client.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        }
        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.status === 403) throw new Error("Code 403, forbidden.")
                if (xhr.status === 401) throw new Error("Code 401, unathorized.")
                if (xhr.readyState === 4) {
                    try {
                        let json = JSON.parse(xhr.responseText);
                        if (typeof json == "object") resolve(json);
                    } catch (e) {
                        console.error(e);
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send();
        })
    }
    post(url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        if (this._client.key && isServiceKey(this._client.key)){
            xhr.setRequestHeader("X-Auth-User-Service-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.key && this._client.email) {
            xhr.setRequestHeader("X-Auth-Email", this._client.email);
            xhr.setRequestHeader("X-Auth-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.token) {
            xhr.setRequestHeader("Authorization", "Bearer " + this._client.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        }
        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.status === 403) throw new Error("Code 403, forbidden.")
                if (xhr.status === 401) throw new Error("Code 401, unathorized.")
                if (xhr.readyState === 4) {
                    try {
                        let json = JSON.parse(xhr.responseText);
                        if (typeof json == "object") resolve(json);
                    } catch (e) {
                        console.error(e);
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send(JSON.stringify(data));
        })
    }
    patch(url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", url);
        if (this._client.key && isServiceKey(this._client.key)){
            xhr.setRequestHeader("X-Auth-User-Service-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.key && this._client.email) {
            xhr.setRequestHeader("X-Auth-Email", this._client.email);
            xhr.setRequestHeader("X-Auth-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.token) {
            xhr.setRequestHeader("Authorization", "Bearer " + this._client.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        }
        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.status === 403) throw new Error("Code 403, forbidden.")
                if (xhr.status === 401) throw new Error("Code 401, unathorized.")
                if (xhr.readyState === 4) {
                    try {
                        let json = JSON.parse(xhr.responseText);
                        if (typeof json == "object") resolve(json);
                    } catch (e) {
                        console.error(e);
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send(JSON.stringify(data));
        })
    }
    put(url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        if (this._client.key && isServiceKey(this._client.key)){
            xhr.setRequestHeader("X-Auth-User-Service-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.key && this._client.email) {
            xhr.setRequestHeader("X-Auth-Email", this._client.email);
            xhr.setRequestHeader("X-Auth-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.token) {
            xhr.setRequestHeader("Authorization", "Bearer " + this._client.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        }
        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.status === 403) throw new Error("Code 403, forbidden.")
                if (xhr.status === 401) throw new Error("Code 401, unathorized.")
                if (xhr.readyState === 4) {
                    try {
                        let json = JSON.parse(xhr.responseText);
                        if (typeof json == "object") resolve(json);
                    } catch (e) {
                        console.error(e);
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send(JSON.stringify(data));
        })
    }
    delete(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url);
        if (this._client.key && isServiceKey(this._client.key)){
            xhr.setRequestHeader("X-Auth-User-Service-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.key && this._client.email) {
            xhr.setRequestHeader("X-Auth-Email", this._client.email);
            xhr.setRequestHeader("X-Auth-Key", this._client.key);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        } else if (this._client.token) {
            xhr.setRequestHeader("Authorization", "Bearer " + this._client.token);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("User-Agent", `cloudflare/${pkg.version} node/${process.versions.node}`);
            xhr.setRequestHeader("X-Cloudflare-Client-User-Agent", this._client.USER_AGENT);
        }
        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.status === 403) throw new Error("Code 403, forbidden.")
                if (xhr.status === 401) throw new Error("Code 401, unathorized.")
                if (xhr.readyState === 4) {
                    try {
                        let json = JSON.parse(xhr.responseText);
                        if (typeof json == "object") resolve(json);
                    } catch (e) {
                        console.error(e);
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send(null);
        })
    }
}

export default API;