var fs = require("fs")

const commandPrefix = "--";

var commandTable = {}

module.exports = {

  loadCommands: function() {
    commandTable = {}
    fs.readdir("./commands", function(err, items) {
      var idx
      for (idx = 0; idx < items.length; idx++) {
        try {
          var commandName = items[idx].replace(/.js$/, "")
          commandTable[commandName] = require(`./commands/${commandName}.js`)
        } catch (err) {
          console.error(`Encountered error trying to require command: ${commandName}.js`)
          console.error(err)
        }
      }

      console.log("Loaded command table:")
      console.log(commandTable)
    })
    return commandTable
  },

  execute: function(client, message) {
    if (message.author.bot) return;

    if (message.content.startsWith("—")) {
      message.content = message.content.replace("—", "--");
    }

    if (message.content.indexOf(commandPrefix) !== 0) return;

    const args = message.content.slice(commandPrefix.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase();
    const commandFunction = commandTable[commandName]
    if (!!commandFunction) {
      try {
        commandFunction.run(client, message, args)
      } catch (err) {
        console.error(`Encountered error trying to execute command: ${commandName}`)
        console.error(err)
      }
    }
  }

}
