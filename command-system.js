var fs = require('fs');

// Server-specific trigger overrides
// Limitations:
// - Triggers cannot contain spaces, because commands don't know how to replace
// triggers other than to split on the first space. Commands should be reworked
// to take a sanitized array of arguments.
function triggerForGuild(guild) {
    if (null != (process.env.TRIGGER)) {
        return process.env.TRIGGER;
    }
    if (null == guild) {
      return "--";
    }
    switch (guild.id) {
      // case "253612214148136981": return "."; // Drugs Community
      default:                   return "--";
    }
}

module.exports = function CommandSystem() {
  // Specify the DoseBot command prefix

  // Initialize an object to hold the list of commands
  var commandTable = {};

  return {
    load: function(ready) {
      fs.readdir('./commands', function(err, items) {
        for (let i = 0; i < items.length; i++) {
          try {
            var commandName = items[i].replace(/.js$/, '');
            commandTable[commandName] = require(`./commands/${commandName}.js`);
          } catch (err) {
            console.error(
              `Encountered error trying to require command: ${commandName}.js`
            );
            console.error(err);
          }
        }
      });
    },

    execute: function(client, message) {
      if (message.author.bot) {
        // console.log("Message author is bot")
        return;
      }

      // undo some autocorrects to fix triggers
      const content = message.content.replace(/^[—─]/, '--')

      const trigger = triggerForGuild(message.guild);

      if (!content.startsWith(trigger)) {
        return;
      }

      const args = content
        .slice(trigger.length)
        .trim()
        .split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const commandFunction = commandTable[commandName];

      console.log(`CMD: ${commandName} on server ${
        message.guild == null ? "<no guild>" : message.guild.name
      }`)
      if (commandFunction) {
        try {
          commandFunction.run(client, message, args);
        } catch (err) {
          console.error(
            `Encountered error trying to execute command: ${commandName}`
          );
          console.error(err);
        }
      } else {
        // console.log(`Command does not exist: ${commandName}\n${commandTable}`)
      }
    }
  };
};
