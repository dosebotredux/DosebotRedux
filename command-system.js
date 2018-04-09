var fs = require("fs")

module.exports = function CommandSystem() {

  const commandPrefix = "--";

  var commandTable = {}

  return {
    load: function(ready) {
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

        ready()
      })

    },

    execute: function(client, message) {
      if (message.author.bot) {
        // console.log("Message author is bot")
        return
      }

      if (message.content.startsWith("—")) {
        message.content = message.content.replace("—", "--");
      }

      if (!message.content.startsWith(commandPrefix)) {
        // console.log("Command prefix not matched")
        return
      }

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
      } else {
        // console.log(`Command does not exist: ${commandName}\n${commandTable}`)
      }
    }

  }
}
