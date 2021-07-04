class DNS {
  constructor(zone) {
    this.zone = zone;
  }
  get zone() {
    return this._zone;
  }
  set zone(value) {
    this._zone = value;
  }
  update() {
      
  }
}

export default DNS;
module.exports = DNS;