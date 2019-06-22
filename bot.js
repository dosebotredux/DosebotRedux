require('dotenv').config();
const Discord = require('discord.js');
const DiscordClient = new Discord.Client();
const CommandSystem = require('./command-system.js')();

CommandSystem.load(() => {
  console.log('Command system loaded.');
});

DiscordClient.on('ready', () => {
  console.log('DoseBot is online - beep boop');

  // Update game message on launch
  DiscordClient.user
    .setActivity(`my part in reducing harm!`, { type: 'PLAYING' })
    .then(presence => console.log(`Activity set: ${JSON.stringify(presence.game)}`))
    .catch(console.error);

  // Print guild list
  const guildCount = DiscordClient.guilds.array().length;
  const userCount = DiscordClient.guilds
    .map(guild => guild.memberCount)
    .reduce((x, y) => x + y);

  console.log(`Currently serving ${userCount} users on ${guildCount} guilds`);
  for (let guild of DiscordClient.guilds.array()) {
    console.log(`- ${guild.id} - ${guild.name} (${guild.memberCount} members)`);
  }
});

DiscordClient.on('guildCreate', guild => {
  console.log(`New server joined - Name: ${guild.name} Members: ${guild.memberCount}`);
});

DiscordClient.on('message', message => {
  const guild = (message.guild || {}).name;
  const channel = message.channel.name;
  const author = `${message.author.id} ${message.author.username}#${message.author.discriminator}`;

  console.log(`[${guild} #${channel}] <${author}> -- ${message.content}`);

  CommandSystem.execute(DiscordClient, message);
});

DiscordClient.login(process.env.DISCORD_API_TOKEN);
