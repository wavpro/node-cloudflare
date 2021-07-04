import Zones from "./zones/main.js";
import API from "./api/main.js";
import USER_AGENT from "./util/useragent.js";
import Cache from "./cache/main.js";

class Client {
  constructor(
    options = {
      baseURL: "https://api.cloudflare.com/client/v4", // Cloudflare API Base URL.
      cache: true, // Whether or not to use cache.
      userid: null,
      token: null,
      key: null,
      email: null //Only set if using API Key.
    }
  ) {
    if (options.token) {
      if (typeof options.token != "string")
        throw new Error("API Token must be a string.");
      this.method = "token";
      this.token = options.token;
    } else if (options.key) {
      if (typeof options.key != "string")
        throw new Error("API Key must be a string.");
      if (!options.email)
        throw new Error(
          "When using API Key, email address for account must be specified."
        );
      this.method = "key";
      this.key = options.key;
      this.email = options.email;
    } else {
      throw new Error("No API Key or Token was specified.");
    }
    if (options.cache === false) this.cache = undefined; else this.cache = new Cache();
    this._baseURL = options.baseURL || "https://api.cloudflare.com/client/v4";
    this._userid = options.userid || null;
    this.USER_AGENT = USER_AGENT;
    this._api = new API(this);
    this._zones = new Zones(this);
  }
  getBaseURL() {
    return this._baseURL;
  }
  get method() {
    return this._method;
  }
  set method(value) {
    return (this._method = value);
  }
  get token() {
    return this._token;
  }
  set token(value) {
    return (this._token = value);
  }
  get key() {
    return this._key;
  }
  set key(value) {
    return (this._key = value);
  }
  get baseURL() {
    return this._baseURL;
  }
  set baseURL(value) {
    return (this._baseURL = value);
  }
  get email() {
    return this._email;
  }
  set email(value) {
    return (this._email = value);
  }
  get zones() {
    return this._zones;
  }
  get api() {
    return this._api;
  }
  get userid() {
    return this._userid;
  }
  set userid(value) {
    return (this._userid = value);
  }
  get cache() {
    return this._cache;
  }
  set cache(value) {
    return (this._cache = value);
  }
}
export default Client;
