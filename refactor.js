const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./app.json");
const CommandSystem = require("./command-system.js")

var fs = require("fs");
var path = require("path");
var util = require("util");

client.on("ready", () => {
  console.log("DoseBot is online - beep boop");
});

client.on("guildMemberAdd", member => {
  //logs every user who joins into the console
  console.log(member.user.username);
  console.log(member.toString());
  console.log(member.id.toString());
});

client.on("message", message => {
  CommandSystem.execute(client, message)
})

CommandSystem.loadCommands()

client.login(settings.token);
