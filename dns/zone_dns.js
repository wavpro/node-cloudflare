class DNS {
  constructor(zone, client) {
    this.zone = zone;
    this.client = client;
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
    return (this._dns_records = value);
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
}

export default DNS;
