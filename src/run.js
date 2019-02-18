'use strict';

const { Command } = require(`./utils/constants`);
const version = require(`./commands/version`);
const help = require(`./commands/help`);
const author = require(`./commands/author`);
const license = require(`./commands/license`);
const description = require(`./commands/description`);
const server = require(`./commands/server`);
// const fill = require(`./commands/fill`);
const noCommand = require(`./commands/no-command`);
const unknown = require(`./commands/unknown`);

module.exports = (command = Command.NO_COMMAND) => {
  const Execute = {
    [Command.VERSION]: version.run,
    [Command.HELP]: help.run,
    [Command.AUTHOR]: author.run,
    [Command.LICENSE]: license.run,
    [Command.DESCRIPTION]: description.run,
    [Command.SERVER]: server.run,
    // [Command.FILL]: fill.execute,
    [Command.NO_COMMAND]: noCommand.run,
  };
  (Execute[command] ? Execute[command] : unknown.run)(command);
};
