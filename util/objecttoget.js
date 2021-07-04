/**
 * Turns an object into a string to append to a get request URL.
 * @param {*} object 
 * @returns {string} string
 */
export default function(object) {
    if (!object) throw new Error('No data supplied.')
    let str = "?";
    if (object && Object.keys(object).length === 0 && object.constructor === Object) return str;
    for (let key in object) {
        if (typeof object[key] == 'number') object[key] = object[key].toString();
        if (typeof object[key] != 'string') continue;
        str += key + "=" + object[key] + "&";
    }
    return str.slice(0, str.length - 2)
}