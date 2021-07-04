class Owner {
  /**
   * Information about the owner of the zone.
   * One of the following:
   * A user that owns the zone or
   * An organization that owns the zone.
   */
  constructor() {}
  /**
   * User identifier tag.
   * @type string
   */
  get id() {
    return this._id;
  }
  /**
   * User identifier tag.
   */
  set id(value) {
    this._id = value;
  }
  /**
   * The type of owner of the zone.
   * @type string
   */
  get type() {
    return this._type;
  }
  /**
   * The type of owner of the zone.
   */
  set type(value) {
    this._type = value;
  }
  /**
   * Your contact email address.
   * @type string
   */
  get email() {
    return this._email;
  }
  /**
   * Your contact email address.
   */
  set email(value) {
    this._email = value;
  }
  toObject() {
    return {
      id: this.id,
      type: this.type,
      email: this.email,
    }
  }
}

export default function(id, type, email) {
    const owner = new Owner();
    owner.id = id;
    owner.type = type;
    owner.email = email;
    return owner;
}