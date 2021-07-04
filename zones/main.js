import isResourceID from "../util/isresourceid.js";
import Zone from "./subclass/zone.js";

class Zones {
  constructor(client) {
    this._client = client;
  }
  get(
    id,
    opts = {
      useCache: true,
    }
  ) {
    if (typeof id !== "string" || !isResourceID(id))
      throw new Error("Invalid resource id.");
    const client = this._client;
    if (
      (opts.useCache === undefined || opts.useCache !== false) &&
      client.cache !== undefined
    ) {
      if (client.cache.has(`zones_${id}`)) {
        return new Promise(function (resolve, reject) {
          resolve(client.cache.get(`zones_${id}`));
        });
      }
    }
    let url = `${client._baseURL}/zones/${id}`;
    return new Promise(function (resolve, reject) {
      client.api
        .get(url)
        .then((result) => {
          const zone = new Zone(result.result, client);
          if (
            (opts.useCache === undefined || opts.useCache !== false) &&
            client.cache !== undefined
          ) {
            client.cache.set(`zones_${id}`, zone);
          }
          resolve(zone);
        })
        .catch(reject);
    });
  }
  list(options = {}) {
    const client = this._client;
    return new Promise(function (resolve, reject) {
      let params = options;
      if (params.useCache !== undefined) delete params.useCache;
      client.api
        .get(`${client._baseURL}/zones`, params)
        .then((res) => {
          let resArray = [];
          for (let zone of res.result) {
            const newZone = new Zone(zone, client);
            resArray.push(newZone);
          }
          res.result = resArray;
          if (
            (options.useCache === undefined || options.useCache !== false) &&
            client.cache !== undefined
          ) {
            for (let zone of res.result) {
              client.cache.set(`zones_${zone.id}`, zone);
            }
          }
          resolve(res);
        })
        .catch(reject);
    });
  }
  create(domain, userID, jump_start = true, type = "full") {
    if (!domain) throw new Error("No domain name provided.");
    if (!userID) userID = this._client.userid;
    if (!userID)
      throw new Error("No user ID provided in function or client setup.");
    const client = this._client;
    return new Promise(function (resolve, reject) {
      client.api
        .post(`${client._baseURL}/zones`, {
          name: domain,
          account: {
            id: userID,
          },
          jump_start: jump_start,
          type: type,
        })
        .then(resolve)
        .catch(reject);
    });
  }
  delete(id) {
    if (!id) throw new Error("No id provided.");
    if (typeof id !== "string" || !isResourceID(id))
      throw new Error("Invalid resource id.");
    const client = this._client;
    return new Promise(function (resolve, reject) {
      client.api
        .delete(`${client._baseURL}/zones/${id}`)
        .then(resolve)
        .catch(reject);
    });
  }
}

export default Zones;
