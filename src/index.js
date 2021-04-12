const fs = require('fs');

const trim = (str) => str.trim();

const strip = (str, char) => {
  const b = new RegExp(`^${char}`);
  const e = new RegExp(`${char}$`);
  return str.startsWith(char) && str.endsWith(char)
    ? str.replace(b, '').replace(e, '')
    : str;
};

const doIt = (path) => {
  const file = fs.readFileSync(path, 'utf8');
  const lines = file.match(/[^\r\n]+/g);
  lines.forEach((line) => {
    const n = line.substring(0, line.indexOf('=')).trim();
    const v = line.substring(line.indexOf('=') + 1);

    if (n.length && v.length && !(/^#/).test(n)) {
      const trimmed = trim(v);
      const singleStripped = strip(trimmed, "'");
      const doubleStripped = strip(singleStripped, '"');
      process.env[n] = doubleStripped;
    }
  });
};

module.exports = (path) => {
  const paths = Array.isArray(path) ? path : [path];
  /* eslint-disable no-global-assign */
  process = typeof process === 'object' ? process : {};
  process.env = typeof process.env === 'object' ? process.env : {};

  paths.forEach((p) => doIt(p));
};
