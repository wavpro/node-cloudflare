import owner from "../../userclasses/zone_owner.js";
import account from "../../userclasses/zone_account.js";
import plan from "./zone_plan.js";
import isResourceID from '../../util/isresourceid.js';

class Zone {
  /**
   * A Zone is a domain name along with its subdomains and other identities.
   * @param {object} orig The original zone recieved from Cloudflare's api.
   */
  constructor(orig, client) {
    if (!isResourceID(orig.id)) throw new Error("Invalid zone ID provided in object.");
    this.id = orig.id;
    this.name = orig.name;
    this.status = orig.status;
    this.paused = orig.paused;
    this.type = orig.type;
    this.development_mode = orig.development_mode;
    this.name_servers = orig.name_servers;
    this.original_name_servers = orig.original_name_servers;
    this.original_registrar = orig.original_registrar;
    this.original_dnshost = orig.original_dnshost;
    this.modified_on = orig.modified_on;
    this.created_on = orig.created_on;
    this.activated_on = orig.activated_on;
    this.meta = orig.meta;
    this.permissions = orig.permissions;
    this.createOwner(orig.owner.id, orig.owner.type, orig.owner.email);
    this.createAccount(orig.account.id, orig.account.name);
    this.createPlan(
      orig.plan.id,
      orig.plan.name,
      orig.plan.price,
      orig.plan.currency,
      orig.plan.frequency,
      orig.plan.legacy_id,
      orig.plan.is_subscribed,
      orig.plan.can_subscribe,
      orig.plan.legacy_discount,
      orig.plan.externally_managed
    );
    if (orig.pending_plan)
      this.createPendingPlan(
        orig.plan.id,
        orig.plan.name,
        orig.plan.price,
        orig.plan.currency,
        orig.plan.frequency,
        orig.plan.legacy_id,
        orig.plan.is_subscribed,
        orig.plan.can_subscribe,
        orig.plan.legacy_discount,
        orig.plan.externally_managed
      );
    else this.pending_plan = null;
    this.client = client;
  }
  /**
   * Zone identifier tag.
   * @type string
   */
  get id() {
    return this._id;
  }
  /**
   * Zone identifier tag.
   */
  set id(value) {
    return (this._id = value);
  }
  /**
   * The domain name.
   * @type string
   */
  get name() {
    return this._name;
  }
  /**
   * The domain name.
   */
  set name(value) {
    return (this._name = value);
  }
  /**
   * The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0.
   * @type number
   */
  get development_mode() {
    return this._development_mode;
  }
  /**
   * The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0.
   */
  set development_mode(value) {
    return (this._development_mode = value);
  }
  /**
   * Cloudflare-assigned name servers. This is only populated for zones that use Cloudflare DNS.
   * @type string[]
   */
  get name_servers() {
    return this._original_name_servers;
  }
  /**
   * Cloudflare-assigned name servers. This is only populated for zones that use Cloudflare DNS.
   */
  set name_servers(value) {
    if (!Array.isArray(value))
      throw new TypeError('"name_servers" property must be array.');
    return (this._original_name_servers = value);
  }
  /**
   * Original name servers before moving to Cloudflare.
   * @type string[]
   */
  get original_name_servers() {
    return this._original_name_servers;
  }
  /**
   * Original name servers before moving to Cloudflare.
   */
  set original_name_servers(value) {
    if (!Array.isArray(value))
      throw new TypeError('"original_name_servers" property must be array.');
    return (this._original_name_servers = value);
  }
  /**
   * Registrar for the domain at the time of switching to Cloudflare.
   * @type string
   */
  get original_registrar() {
    return this._original_registrar;
  }
  /**
   * Registrar for the domain at the time of switching to Cloudflare.
   */
  set original_registrar(value) {
    return (this._original_registrar = value);
  }
  /**
   * DNS host at the time of switching to Cloudflare.
   * @type string || null
   */
  get original_dnshost() {
    return this._original_dnshost;
  }
  /**
   * DNS host at the time of switching to Cloudflare.
   */
  set original_dnshost(value) {
    return (this._original_dnshost = value);
  }
  /**
   * When the zone was created.
   * @type Date
   */
  get created_on() {
    return this._created_on;
  }
  /**
   * When the zone was created.
   */
  set created_on(value) {
    return (this._created_on = new Date(`${value}`));
  }
  /**
   * When the zone was last modified.
   * @type Date
   */
  get modified_on() {
    return this._modified_on;
  }
  /**
   * When the zone was last modified.
   */
  set modified_on(value) {
    return (this._modified_on = new Date(`${value}`));
  }
  /**
   * The last time proof of ownership was detected and the zone was made active.
   * @type Date
   */
  get activated_on() {
    return this._activated_on;
  }
  /**
   * The last time proof of ownership was detected and the zone was made active.
   */
  set activated_on(value) {
    return (this._activated_on = new Date(`${value}`));
  }
  get meta() {
    return this._meta;
  }
  set meta(value) {
    return (this._meta = value);
  }
  /**
   * Status of the zone.
   * @type string
   */
  get status() {
    return this._status;
  }
  /**
   * Status of the zone.
   */
  set status(value) {
    return (this._status = value);
  }
  /**
   * Indicates if the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits.
   * @type boolean
   */
  get paused() {
    return this._paused;
  }
  /**
   * Indicates if the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits.
   */
  set paused(value) {
    return (this._paused = value);
  }
  /**
   * A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup.
   * @type string
   */
  get type() {
    return this._type;
  }
  /**
   * A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup.
   */
  set type(value) {
    return (this._type = value);
  }
  /**
   * Information about the owner of the zone.
   * @type zone_owner
   */
  get owner() {
    return this._owner;
  }
  /**
   * Information about the owner of the zone.
   */
  set owner(value) {
    return (this._owner = value);
  }
  /**
   * Information about the account the zone belongs to.
   * @tyep zone_account
   */
  get account() {
    return this._account;
  }
  /**
   * Information about the account the zone belongs to.
   */
  set account(value) {
    return (this._account = value);
  }
  /**
   * Available permissions on the zone for the current user requesting the item.
   * @type array
   */
  get permissions() {
    return this._permissions;
  }
  /**
   * Available permissions on the zone for the current user requesting the item.
   */
  set permissions(value) {
    if (!Array.isArray(value))
      throw new TypeError('"permissions" property must be array.');
    return (this._permissions = value);
  }
  /**
   * A zone plan.
   * @type zone_plan
   */
  get plan() {
    return this._plan;
  }
  /**
   * A zone plan.
   */
  set plan(value) {
    return (this._plan = value);
  }
  /**
   * A zone plan.
   * @type zone_plan
   */
  get pending_plan() {
    return this._pending_plan;
  }
  /**
   * A zone plan.
   */
  set pending_plan(value) {
    return (this._pending_plan = value);
  }
  get client() {
    return this._api;
  }
  set client(value) {
    this._client = value;
  }
  /**
   * Creates an a owner class for the Zone and adds it to the zone this.owner property.
   * @param {string} id User identifier tag.
   * @param {string} type The type of owner of the zone.
   * @param {string} email Your contact email address.
   */
  createOwner(id, type, email) {
    return (this.owner = owner(id, type, email));
  }
  /**
   * Creates an account class for the zone and adds it to the this.account property.
   * @param {string} id Account identifier tag.
   * @param {string} name Account name.
   */
  createAccount(id, name) {
    return (this.account = account(id, name));
  }
  /**
   * Creates a plan for the zone and adds it to the this.plan property.
   * @param {string} id Plan identifier tag.
   * @param {string} name The plan name.
   * @param {number} price The price of the subscription that will be billed, in US dollars.
   * @param {string} currency The monetary unit in which pricing information is displayed.
   * @param {string} frequency The frequency at which you will be billed for this plan.
   * @param {string} legacy_id A 'friendly' identifier to indicate to the UI what plan the object is.
   * @param {boolean} is_subscribed If the zone is subscribed to this plan.
   * @param {boolean} can_subscribe If the zone is allowed to subscribe to this plan.
   * @param {*} legacy_discount
   * @param {*} externally_managed
   */
  createPlan(
    id,
    name,
    price,
    currency,
    frequency,
    legacy_id,
    is_subscribed,
    can_subscribe,
    legacy_discount,
    externally_managed
  ) {
    return (this.plan = plan(
      id,
      name,
      price,
      currency,
      frequency,
      legacy_id,
      is_subscribed,
      can_subscribe,
      legacy_discount,
      externally_managed
    ));
  }
  /**
   * Creates a pending plan for the zone and adds it to the this.pending_plan property.
   * @param {string} id Plan identifier tag.
   * @param {string} name The plan name.
   * @param {number} price The price of the subscription that will be billed, in US dollars.
   * @param {string} currency The monetary unit in which pricing information is displayed.
   * @param {string} frequency The frequency at which you will be billed for this plan.
   * @param {string} legacy_id A 'friendly' identifier to indicate to the UI what plan the object is.
   * @param {boolean} is_subscribed If the zone is subscribed to this plan.
   * @param {boolean} can_subscribe If the zone is allowed to subscribe to this plan.
   * @param {*} legacy_discount
   * @param {*} externally_managed
   */
  createPendingPlan(
    id,
    name,
    price,
    currency,
    frequency,
    legacy_id,
    is_subscribed,
    can_subscribe,
    legacy_discount,
    externally_managed
  ) {
    return (this.pending_plan = plan(
      id,
      name,
      price,
      currency,
      frequency,
      legacy_id,
      is_subscribed,
      can_subscribe,
      legacy_discount,
      externally_managed
    ));
  }
  /**
   * Returns an object with all the info of the original zone, in the format that the cloudflare API uses.
   * @returns {object} Object representing the zone.
   * @name Zone.toObject()
   */
  toObject() {
    return {
      id: this.id,
      name: this.name,
      development_mode: this.development_mode,
      name_servers: this.name_servers,
      original_name_servers: this.original_name_servers,
      original_registrar: this.original_registrar,
      original_dnshost: this.original_dnshost,
      created_on: this.created_on,
      modified_on: this.modified_on,
      activated_on: this.activated_on,
      meta: this.meta,
      owner: this.owner.toObject(),
      account: this.account.toObject(),
      permissions: this.permissions,
      plan: this.plan.toObject(),
    };
  }
}

export default Zone;
