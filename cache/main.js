import Node_Cache from 'node-cache';

class Cache extends Node_Cache {
    constructor(options) {
        super(options);
    }
    set(key, value) {
        super.set(key, value, 1000 * 60 * 30);
    }
}

export default Cache;