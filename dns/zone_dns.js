import Record from './dns_record.js'

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
}

export default DNS;
