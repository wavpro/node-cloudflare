import node_util from 'util';

class Plan {
  /**
   * A zone plan, used by the Zone class.
   */
  constructor() {}
  /**
   * Plan identifier tag.
   * @type string
   */
  get id() {
    return this._id;
  }
  /**
   * Plan identifier tag.
   * @Constraints max length: 32, read only
   */
  set id(value) {
    return (this._id = value);
  }
  /**
   * The plan name.
   * @type string
   */
  get name() {
    return this._name;
  }
  /**
   * The plan name.
   * @Constraints max length: 80, read only
   */
  set name(value) {
    return (this._name = value);
  }
  /**
   * The price of the subscription that will be billed, in US dollars.
   * @type number
   */
  get price() {
    return this._price;
  }
  /**
   * The price of the subscription that will be billed, in US dollars.
   * @Constraints read only
   */
  set price(value) {
    return (this._price = value);
  }
  /**
   * The monetary unit in which pricing information is displayed.
   * @type string
   */
  get currency() {
    return this._currency;
  }
  /**
   * The monetary unit in which pricing information is displayed.
   * @Constraints read only
   */
  set currency(value) {
    return (this._currency = value);
  }
  /**
   * The frequency at which you will be billed for this plan.
   * @type string
   */
  get frequency() {
    return this._frequency;
  }
  /**
   * The frequency at which you will be billed for this plan.
   * @Constraints valid values: weekly, monthly, quarterly, yearly read only
   */
  set frequency(value) {
    return (this._frequency = value);
  }
  /**
   * A 'friendly' identifier to indicate to the UI what plan the object is.
   * @type any
   */
  get legacy_id() {
    return this._legacy_id;
  }
  /**
   * A 'friendly' identifier to indicate to the UI what plan the object is.
   * @Constraints valid values: free, pro, business, enterprise
   */
  set legacy_id(value) {
    return (this._legacy_id = value);
  }
  /**
   * If the zone is subscribed to this plan.
   * @type boolean
   */
  get is_subscribed() {
    return this._is_subscribed;
  }
  /**
   * If the zone is subscribed to this plan.
   * @Constraints valid values: (true,false)
   */
  set is_subscribed(value) {
    return (this._is_subscribed = value);
  }
  /**
   * If the zone is allowed to subscribe to this plan.
   * @type boolean
   */
  get can_subscribe() {
    return this._can_subscribe;
  }
  /**
   * If the zone is allowed to subscribe to this plan.
   * @Constraints valid values: (true,false)
   */
  set can_subscribe(value) {
    return (this._can_subscribe = value);
  }
  get legacy_discount() {
    return this._legacy_discount;
  }
  set legacy_discount(value) {
    return (this._legacy_discount = value);
  }
  get externally_managed() {
    return this._externally_managed;
  }
  set externally_managed(value) {
    return (this._externally_managed = value);
  }
  toObject() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      currency: this.currency,
      frequency: this.frequency,
      legacy_id: this.legacy_id,
      is_subscribed: this.is_subscribed,
      can_subscribe: this.can_subscribe,
      legacy_discount: this.legacy_discount,
      externally_managed: this.externally_managed,
    };
  }
  [node_util.inspect.custom]() {
    return this.toObject();
  }
}

export default function (
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
  const plan = new Plan();
  plan.id = id;
  plan.name = name;
  plan.price = price;
  plan.currency = currency;
  plan.frequency = frequency;
  plan.is_subscribed = is_subscribed;
  plan.legacy_id = legacy_id;
  plan.can_subscribe = can_subscribe;
  plan.legacy_discount = legacy_discount;
  plan.externally_managed = externally_managed;
  return plan;
}
