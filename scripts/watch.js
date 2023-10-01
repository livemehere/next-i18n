const { build, createBundle } = require("./build-script");
const fs = require("fs");
const path = require("path");

const DATA_PATH = path.resolve(__dirname, "../data");

console.log(`🚀 watch dir src/i18n/data/* ...`);

fs.watch(DATA_PATH, (eventType, filename) => {
  console.log(`💡 ${eventType} ${filename}`);
  createBundle(build());
});
