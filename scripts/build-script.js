const fs = require("fs");
const path = require("path");
const { LOCALES } = require("../constant");

const DATA_PATH = path.resolve(__dirname, "../data");
const BUNDLE_PATH = path.resolve(__dirname, "../bundle");
const files = fs.readdirSync(DATA_PATH);

function build() {
  const bundle = {};

  files.forEach((file) => {
    const filePath = path.resolve(DATA_PATH, file);
    const namespace = /(.+)(\..+)$/g.exec(file)[1];

    delete require.cache[filePath];
    const data = require(filePath);

    LOCALES.forEach((locale) => {
      if (!bundle[locale]) bundle[locale] = {};
      bundle[locale][namespace] = parse({}, data, locale);
    });
  });

  return bundle;
}

function parse(acc, obj, targetKey) {
  const entries = Object.entries(obj);
  entries.forEach(([key, values]) => {
    const keys = Object.keys(values);
    if (keys.includes(targetKey)) {
      acc[key] = values[targetKey];
    } else {
      acc[key] = parse({}, values, targetKey);
    }
  });
  return acc;
}

function createBundle(bundle) {
  fs.writeFileSync(
    path.resolve(BUNDLE_PATH, "index.js"),
    `export default ${JSON.stringify(bundle)}`,
  );
}

module.exports = {
  build,
  createBundle,
};
