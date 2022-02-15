const Path = require("path");
const fs = require("fs");

const fileNames = [
  "config.invalid.json",
  "config.also_invalid.json",
  "config.json",
  "config.local.json",
];

async function fetchConfigurations(fileNames) {
  let config = {};
  fileNames.forEach(async (file) => {
    const filePath = Path.resolve(file);
    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      const fileConfig = JSON.parse(fileData);
      config = { ...config, ...fileConfig };
    } catch (e) {
      return;
    }
  });
  return config;
}

module.exports = fetchConfigurations;
