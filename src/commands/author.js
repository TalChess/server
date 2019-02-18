'use strict';

const colors = require(`colors/safe`);

const packageInfo = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows the name of the author`,
  run() {
    console.log(`${colors.grey(`Author`)}: ${colors.green(packageInfo.author)}`);
  }
};
