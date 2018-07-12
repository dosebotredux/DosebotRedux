const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.DISCORD_API_TOKEN;
const CommandSystem = require("./command-system.js")()

var fs = require("fs");
var path = require("path");
var util = require("util");

client.on("ready", () => {
  const servers = client.guilds;
  let userCount = 0;
  let servercount = 0;
  
  servers.forEach(guild => {
    if (guild.id !== "110373943822540800" || guild.id !== "264445053596991498") {
      userCount += guild.memberCount;
      servercount++;
    }
    console.log(`Name: ${guild.name} ID: ${guild.id} Members: ${guild.memberCount}`);
  });
  
  console.log(`Currently serving ${userCount} users on ${servercount} servers`);
  console.log("DoseBot is online - beep boop");
  
});

client.on("guildMemberAdd", member => {
  // //logs every user who joins into the console
  // console.log(member.user.username);
  // console.log(member.toString());
  // console.log(member.id.toString());
});

client.on("guildCreate", guild => {
  console.log("NEW SERVER JOINED")
});

client.on("message", message => {
  CommandSystem.execute(client, message)
});

CommandSystem.load(function() {
  console.log("Command system loaded.")
});

client.login(token);
