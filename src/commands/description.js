'use strict';

const packageInfo = require(`../../package.json`);

module.exports = {
  name: `description`,
  description: `Describes the app`,
  run() {
    console.log(`${packageInfo.description}`);
  }
};
