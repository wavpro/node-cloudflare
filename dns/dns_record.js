import getNodeVersion from "../util/getNodeVersion.js";
import node_util from 'util';

let Record = class {
    
};

if (getNodeVersion() >= 14) {
  // Uses private methods rather than public for manipulating data (EXPERIMENTAL).
  // Will only be enabled for node.js V14 or above users
  eval(`Record = class {
    constructor(parent, record) {
      this.#parent = parent;
      this.#record = record;
      this.id = record.id;
      this.type = record.type;
      this.name = record.name;
      this.content = record.content;
      this.proxiable = record.proxiable;
      this.proxied = record.proxied;
      this.ttl = record.ttl;
      this.locked = record.locked;
      this.zone_id = record.zone_id;
      this.zone_name = record.zone_name;
      this.created_on = new Date(record.created_on);
      this.modified_on = new Date(record.modified_on);
      this.data = record.data || {};
      this.meta = record.meta;
    }
    #parent = {};
    #record = {};
    /**
     * DNS record identifier tag.
     */
    id = "";
    /**
     * Record type.
     */
    type = "";
    /**
     * DNS record name.
     */
    name = "";
    /**
     * Valid data for the specified type.
     */
    content = "";
    /**
     * Whether the record can be proxied by Cloudflare or not.
     */
    proxiable = true;
    /**
     * Whether the record is receiving the performance and security benefits of Cloudflare.
     */
    proxied = false;
    /**
     * Time to live for DNS record. Value of 1 is 'automatic'.
     */
    ttl = 120;
    /**
     * Whether this record can be modified/deleted (true means it's managed by Cloudflare).
     */
    locked = false;
    /**
     * Zone identifier tag.
     */
    zone_id = "";
    /**
     * The domain of the record.
     */
    zone_name = "";
    /**
     * When the record was created.
     */
    created_on = new Date(this.#record.created_on);
    /**
     * When the record was last modified.
     */
    modified_on = new Date(this.#record.modified_on);
    /**
     * Metadata about the record.
     */
    data = {};
    /**
     * Extra Cloudflare-specific information about the record.
     */
    meta = {};
    delete() {
      const client = this.#parent.client;
      const record = this;
      return new Promise((resolve, reject) => {
        client.api
          .delete(client.baseURL + \`/zones/$\{record.#parent.zone.id}/dns_records/$\{record.id}\`)
          .then(res => resolve(res.result));
      })
    }
    update(options = {
      name: this.name,
      type: this.type,
      content: this.content,
      ttl: this.ttl,
      proxied: this.proxied,
    }) {
      if (!options) options = {};
      if (!options.name) options.name = this.name;
      if (!options.type) options.type = this.type;
      if (!options.content) options.content = this.content;
      if (!options.ttl) options.ttl = this.ttl;
      if (!options.proxied) options.proxied = this.proxied;
      const client = this.#parent.client;
      const record = this;
      return new Promise((resolve, reject) => {
        client.api
          .put(client.baseURL + \`/zones/$\{record.#parent.zone.id}/dns_records/$\{record.id}\`, options)
          .then((response) => {
            if (response.success) {
              const result = response.result;
              record.ttl = result.ttl;
              record.modified_on = result.modified_on;
              record.name = result.name;
              record.type = result.type;
              record.content = result.content;
              record.proxiable = result.proxiable;
              record.proxied = result.proxied;
              resolve(record);
            } else {
              reject(response.errors);
            }
          })
      })
    }
  };`)
} else {
  // If private fields are not supported, it will use normal properties.
  Record = class {
    constructor(parent, record) {
      /**
       * PRIVATE
       */
      this._parent = parent;
      /**
       * PRIVATE
       */
      this._record = record;
      /**
       * DNS record identifier tag.
       */
      this.id = record.id;
      /**
       * Record type.
       */
      this.type = record.type;
      /**
       * DNS record name.
       */
      this.name = record.name;
      /**
       * Valid data for the specified type.
       */
      this.content = record.content;
      /**
       * Whether the record can be proxied by Cloudflare or not.
       */
      this.proxiable = record.proxiable;
      /**
       * Whether the record is receiving the performance and security benefits of Cloudflare.
       */
      this.proxied = record.proxied;
      /**
       * Time to live for DNS record. Value of 1 is 'automatic'.
       */
      this.ttl = record.ttl;
      /**
       * Whether this record can be modified/deleted (true means it's managed by Cloudflare).
       */
      this.locked = record.locked;
      /**
       * Zone identifier tag.
       */
      this.zone_id = record.zone_id;
      /**
       * The domain of the record.
       */
      this.zone_name = record.zone_name;
      /**
       * When the record was created.
       */
      this.created_on = new Date(record.created_on);
      /**
       * When the record was last modified.
       */
      this.modified_on = new Date(record.modified_on);
      /**
       * Metadata about the record.
       */
      this.data = record.data || {};
      /**
       * Extra Cloudflare-specific information about the record.
       */
      this.meta = record.meta;
    }
    delete() {
      const client = this._parent.client;
      const record = this;
      return new Promise((resolve, reject) => {
        client.api
          .delete(client.baseURL + `/zones/${record._parent.zone.id}/dns_records/${record.id}`)
          .then(res => resolve(res.result));
      })
    }
    update(options = {
      name: this.name,
      type: this.type,
      content: this.content,
      ttl: this.ttl,
      proxied: this.proxied,
    }) {
      if (!options) options = {};
      if (!options.name) options.name = this.name;
      if (!options.type) options.type = this.type;
      if (!options.content) options.content = this.content;
      if (!options.ttl) options.ttl = this.ttl;
      if (!options.proxied) options.proxied = this.proxied;
      const client = this._parent.client;
      const record = this;
      return new Promise((resolve, reject) => {
        client.api
          .put(client.baseURL + `/zones/${record._parent.zone.id}/dns_records/${record.id}`, options)
          .then((response) => {
            if (response.success) {
              const result = response.result;
              record.ttl = result.ttl;
              record.modified_on = result.modified_on;
              record.name = result.name;
              record.type = result.type;
              record.content = result.content;
              record.proxiable = result.proxiable;
              record.proxied = result.proxied;
              resolve(record);
            } else {
              reject(response.errors[0].code + ": " + response.errors[0].message);
            }
          })
      })
    }
  };
}

export default Record;