const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_API_TOKEN;
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
  // if we've got a message in sed
  if (message.guild.id === '332288651394547712') {
    console.log('message on SED');
    console.log(message.content);

    const server = message.guild;
    const loggingChannel = server.channels.find(channel => {
      return channel.id === '488784584138293268';
    });

    const author = message.author.id;
    const message = message.content;
    const loggedMessage = `<@${author}> - ${message}`;
    console.log(loggedMessage);

    // loggingChannel.send(
    //   `Author: ${message.author.name} - Message: ${message.content}`
    // );
  }
});

//
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
