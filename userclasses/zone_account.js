class Account {
  /**
   * Information about the account the zone belongs to.
   */
  constructor() {}
  /**
   * Account identifier tag.
   * @type string
   */
  get id() {
    return this._id;
  }
  /**
   * Account identifier tag.
   */
  set id(value) {
    this._id = value;
  }
  /**
   * Account name.
   * @type string
   */
  get name() {
    return this._name;
  }
  /**
   * Account name.
   */
  set name(value) {
    this._name = value;
  }
  /**
   * Returns an object with all the info of the original zone, in the format that the cloudflare API uses.
   * @returns Object
   */
  toObject() {
    return {
      id: this.id,
      name: this.name
    }
  }
}

export default function(id, name) {
    const account = new Account()
    account.id = id;
    account.name = name;
    return account;
}