const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_API_TOKEN;
const CommandSystem = require('./command-system.js')();
const Logger = require('./logger')();
const KatSpeaker = require('./katspeaker')();

// On ready logic
client.on('ready', () => {
  // Update game message on launch
  updateGameMessage();
  console.log('DoseBot is online - beep boop');
});

// Log new guild joins
client.on('guildCreate', guild => {
  // Update game message on new server join
  updateGameMessage();
  console.log(
    `New server joined - Name: ${guild.name} Members: ${guild.memberCount}`
  );
});

// Pass messages to the CommandSystem
client.on('message', message => {
  // Logger.execute(client, message);
  if (message.author.id === '371151824331210755') {
    KatSpeaker.execute(client, message);
  }
  CommandSystem.execute(client, message);
});

CommandSystem.load(function() {
  console.log('Command system loaded.');
});

client.login(token);

function updateGameMessage() {
  // Logs guilds and member counts
  let servers = client.guilds;
  let userCount = 0;
  let servercount = 0;

  servers.forEach(guild => {
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
