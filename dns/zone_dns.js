import Record from './dns_record.js';
import sortArrayById from '../util/sortArrayById.js';

class DNS {
  constructor(zone) {
    this.zone = zone;
    this.client = zone.client;
    this.update(this.client.cache == true);
  }
  get zone() {
    return this._zone;
  }
  set zone(value) {
    this._zone = value;
  }
  get client() {
    return this._client;
  }
  set client(value) {
    return (this._client = value);
  }
  get dns_records() {
    return this._dns_records;
  }
  set dns_records(value) {
    if (!Array.isArray(value)) throw new TypeError("Invalid dns records.")
    let endArray = [];
    for (let record of value) {
      endArray.push(new Record(this, record));
    }
    this._dns_records = endArray;
    return;
  }
  update(useCache = true) {
    const zone = this.zone;
    const client = this.client;
    let endArray = []
    if (useCache && client.cache !== null) {
      if (client.cache.has(`dns_${zone.id}`)) {
        let res = client.cache.get(`dns_${zone.id}`);
        for (let dns of res.result) {
          endArray.push(dns);
        }
        this.dns_records = endArray;
      }
    }
    client.api
      .get(`${client._baseURL}/zones/${zone.id}/dns_records`)
      .then((res) => {
        if (useCache && client.cache !== null) {
          for (const record of res.result) {
            client.cache.set(`zones_${zone.id}_dnsRecords_${record.id}`, record);
          }
          client.cache.set(`dns_${zone.id}`, res);
        }
        for (const record of res.result) {
          endArray.push(record);
        }
        this.dns_records = endArray;
      });
  }
  /**
   * List all DNS records for a given zone. 
   */
  list() {
    const zone = this.zone;
    const client = this.client;
    const DNS = this;
    return new Promise((resolve, reject) => {
      client.api
      .get(`${client._baseURL}/zones/${zone.id}/dns_records`)
      .then((res) => {
        DNS.dns_records = res.result;
        resolve(DNS.dns_records);
      })
    })
  }
  /**
   * 
   * @param {{}} options Options that will be passed on to cloudflare's api.
   * @param {string} options.type Required parameter, must be a valid DNS type.
   * @param {string} options.name Required parameter, must be a valid DNS name.
   * @param {string} options.content Required parameter, must be valid DNS content.
   * @param {number} options.ttl Required parameter, the time to live for DNS record. Value of 1 is 'automatic'.
   * @param {number} options.priority Required for MX, SRV and URI records; unused by other record types. Records with lower priorities are preferred.
   * @param {boolean} options.proxied Optional parameter, whether the record is receiving the performance and security benefits of Cloudflare.
   */
  create(options = {
    type: "A",
    name: "example.com",
    content: "127.0.0.1",
    ttl: 120,
    priority: 10,
    proxied: false
  }) {
    if (!options.type) throw new Error("No type of record specified");
    if (!options.name) throw new Error("No name specified");
    if (!options.content) throw new Error("No content specified");
    if (!options.ttl) throw new Error("No ttl specified");
    if ((options.type === "MX" || options.type === "SRV" || options.type === "URI") && !options.priority) throw new Error("Priority parameter is required for MX, SRV and URI records");
    if (typeof options.type !== "string") throw new Error("Invalid record type.")
    if (typeof options.name !== "string") throw new Error("Invalid record name.")
    if (typeof options.content !== "string") throw new Error("Invalid record content.")
    if (typeof options.ttl !== "number") throw new Error("Invalid record ttl.")
    options.type = options.type.toUpperCase();
    const zone = this.zone;
    const client = this.client;
    const DNS = this;
    return new Promise(function (resolve, reject) {
      client.api.post(`${client.baseURL}/zones/${zone.id}/dns_records`, options).then(response => {
        if (!response.success) throw new Error("Error #" + response.errors[0].code + ": " + response.errors[0].message);
        DNS.dns_records = DNS.dns_records.concat(response.result);
        resolve(sortArrayById(DNS.dns_records, response.result.id)[0]);
      })
    })
  }
}

export default DNS;
