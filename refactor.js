const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.DISCORD_API_TOKEN;
const CommandSystem = require("./command-system.js")()

var fs = require("fs");
var path = require("path");
var util = require("util");

// On ready logic
client.on("ready", () => {
  // Update game message on launch
  updateGameMessage();
  console.log("DoseBot is online - beep boop");
  let guilds = client.guilds;
  for (let i = 0; i < 1; i++) {
    console.log("we're here");
    console.log[guilds[i]];
  }
  // guilds.forEach(guild => {
  //   console.log(guild.id);
  // })
  let SED;
  // if (guild.id == "332288651394547712") {
  //   let guildMembers = guild.members;
  //   console.log(guildMembers);
  //   let cocoa;
  // }
});

// Log new guild joins
client.on("guildCreate", guild => {
  // Update game message on new server join
  updateGameMessage();
  console.log(`New server joined - Name: ${guild.name} Members: ${guild.memberCount}`);
});

// Pass messages to the CommandSystem
client.on("message", message => {
  CommandSystem.execute(client, message)
});

//
CommandSystem.load(function() {
  console.log("Command system loaded.")
});

client.login(token);

function updateGameMessage() {
  // Logs guilds and member counts 
  let servers = client.guilds;
  let userCount = 0;
  let servercount = 0;
  
  servers.forEach(guild => {
    if (guild.id == "264445053596991498") {
      console.log("Ignoring bot server");
    } else if (guild.id == "110373943822540800") {
      console.log("Ignoring bot server");
    } else {
      userCount += guild.memberCount;
      servercount++;
    }
    console.log(`Name: ${guild.name} ID: ${guild.id} Members: ${guild.memberCount}`);
  });
  console.log(`Currently serving ${userCount} users on ${servercount} servers`);
  let botGame = `${userCount} users on ${servercount} servers`;
  client.user.setActivity(botGame).then(presence => console.log(`Game set to ${botGame}`)).catch(console.error);
}