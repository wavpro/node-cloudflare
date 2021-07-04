import { createRequire } from "module";
const require = createRequire(import.meta.url);
let pkg = require('../package.json');

export default JSON.stringify({
    bindings_version: pkg.version, // eslint-disable-line camelcase
    lang: 'node',
    lang_version: process.version, // eslint-disable-line camelcase
    platform: process.platform,
    arch: process.arch,
    publisher: 'cloudflare',
  });