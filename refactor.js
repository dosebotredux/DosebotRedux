const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./app.json");

var fs = require("fs");
var path = require("path");
var util = require("util");

var commandTable = {}

client.on("ready", () => {


  console.log("DoseBot is online - beep boop");
});

var prefix = "--";

client.on("guildMemberAdd", member => {
  //logs every user who joins into the console
  console.log(member.user.username);
  console.log(member.toString());
  console.log(member.id.toString());
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content.startsWith("—")) {
    message.content = message.content.replace("—", "--");
  }

  if (message.content.indexOf(prefix) !== 0) return;

  // This is the best way to define args. Trust me. <-- Someone else wrote this lol
  const commandName = args.shift().toLowerCase();
  const commandFunction = commandTable[commandName]
  if (!!commandFunction) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    try {
      commandFunction.run(client, message, args)
    } catch (err) {
      console.error(`Encountered error trying to execute command: ${commandName}`)
      console.error(err)
    }
  }
})

// Load all commands
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

client.login(settings.token);
