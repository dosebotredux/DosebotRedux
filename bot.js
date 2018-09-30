require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const CommandSystem = require('./command-system.js')();

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
  CommandSystem.execute(client, message);
});

// Log new members to DoseBot dev channel
client.on('guildMemberAdd', member => {
  if (member.guild.id === '332288651394547712') {
    const doseBotGuild = client.guilds.find(
      guild => guild.id === '494574903173971969'
    );

    const doseBotLoggingChannel = doseBotGuild.channels.find(
      channel => channel.id === '496077749828714502'
    );

    const newMember = member.displayName;
    const newMemberID = member.id;
    const loggingMessage = `ID: ${newMemberID} | Name: ${newMember} joined SED`;

    doseBotLoggingChannel.send(loggingMessage);
  }
});

CommandSystem.load(function() {
  console.log('Command system loaded.');
});

client.login(process.env.DISCORD_API_TOKEN);

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
