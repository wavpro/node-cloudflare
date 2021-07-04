const isUserServiceKey = function isUserServiceKey(x) {
    return x && x.substring(0, 5) === 'v1.0-';
};
export default isUserServiceKey;