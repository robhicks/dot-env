'use strict';

var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const trim = (str) => str.trim();

const single = (str) => (str.startsWith("'") && str.endsWith("'") ? str.replace(/^'/, '').replace(/'$/, '') : str);
const double = (str) => (str.startsWith('"') && str.endsWith('"') ? str.replace(/^"/, '').replace(/"$/, '') : str);

const doIt = (path) => {
  const file = fs__default['default'].readFileSync(path, 'utf8');
  const lines = file.match(/[^\r\n]+/g);
  lines.forEach((line) => {
    const n = line.substring(0, line.indexOf('=')).trim();
    const v = line.substring(line.indexOf('=') + 1);

    if (n.length && v.length && !(/^#/).test(n)) {
      const trimmed = trim(v);
      // console.log(`trimmed`, trimmed)
      const singleStripped = single(trimmed);
      const doubleStripped = double(singleStripped);
      process.env[n] = doubleStripped;
    }
  });
};

var src = (path) => {
  const paths = Array.isArray(path) ? path : [path];
  process = typeof process === 'object' ? process : {};
  process.env = typeof process.env === 'object' ? process.env : {};

  paths.forEach((p) => doIt(p));
};

module.exports = src;
