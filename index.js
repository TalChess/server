'use strict';

require(`dotenv`).config();
const run = require(`./src/run`);
const logger = require(`./src/logger`);

if (process.env.NODE_ENV !== `production`) {
  console.log(`Database host address:`, process.env.DB_HOST);
  console.log(`Database username:`, process.env.DB_USER);
  console.log(`Database password:`, process.env.DB_PASSWORD);
  console.log(`Server log level:`, process.env.SERVER_LOG_LEVEL);
}

const args = process.argv.slice(2);

try {
  run(args[0]);
} catch (err) {
  logger.error(err);
  process.exit(1);
}
