const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.DISCORD_API_TOKEN;
const CommandSystem = require("./command-system.js")();
const mongoose = require("mongoose");

// DB logic
mongoose.connect(
  `mongodb://${process.env.MONGO_DB_USER}:${
    process.env.MONGO_DB_PASS
  }@ds121282.mlab.com:21282/dosebot_quotes`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(`Connected in refactor`);
});

// On ready logic
client.on("ready", () => {
  // Update game message on launch
  updateGameMessage();
  console.log("DoseBot is online - beep boop");
});

// Log new guild joins
client.on("guildCreate", guild => {
  // Update game message on new server join
  updateGameMessage();
  console.log(
    `New server joined - Name: ${guild.name} Members: ${guild.memberCount}`
  );
});

// Pass messages to the CommandSystem
client.on("message", message => {
  CommandSystem.execute(client, message);
});

//
CommandSystem.load(function() {
  console.log("Command system loaded.");
});

client.login(token);

function updateGameMessage() {
  // Logs guilds and member counts
  let servers = client.guilds;
  let userCount = 0;
  let servercount = 0;

  servers.forEach(guild => {
    // if (guild.id == "264445053596991498") {
    //   console.log("Ignoring bot server");
    // } else if (guild.id == "110373943822540800") {
    //   console.log("Ignoring bot server");
    // } else {
    //   userCount += guild.memberCount;
    //   servercount++;
    // }
    userCount += guild.memberCount;
    servercount++;
    console.log(
      `Name: ${guild.name} ID: ${guild.id} Members: ${guild.memberCount}`
    );
  });
  console.log(`Currently serving ${userCount} users on ${servercount} servers`);
  let botGame = `${userCount} users on ${servercount} servers`;
  client.user
    .setActivity(botGame)
    .then(presence => console.log(`Game set to ${botGame}`))
    .catch(console.error);
}
