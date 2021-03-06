'use strict';

const colors = require(`colors/safe`);

const packageInfo = require(`../../package.json`);

module.exports = {
  name: `license`,
  description: `Shows the project's license`,
  run() {
    console.log(`${colors.grey(`License`)}: ${colors.green(packageInfo.license)}`);
  }
};
