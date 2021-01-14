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
  let guilds = DiscordClient.guilds.cache;
  const userCount = guilds
    .map(guild => guild.memberCount)
    .reduce((x, y) => x + y, 0);

  console.log(`Currently serving ${userCount} users on ${guilds.length} guilds`);
  for (let guildComponents of guilds) {
    let guildId = guildComponents[0];
    let guild = guildComponents[1];
    console.log(`- ${guildId} - ${guild.name} (${guild.memberCount} members)`);

    if (guildId == "697833083201650689") {
      console.log("leaving guild");
      guild.leave().then(g => console.log("Left the guild")).catch(console.error);
    }
  }
});

DiscordClient.on('guildCreate', guild => {
  console.log(`New server joined - Name: ${guild.name} Members: ${guild.memberCount}`);
});

DiscordClient.on('message', message => {
  const guild = message.guild || {};
  const channel = message.channel.name;
  const author = `${message.author.id} ${message.author.username}#${message.author.discriminator}`;

  console.log(`[${guild.id} ${guild.name} #${channel}] <${author}> -- ${message.content}`);

  CommandSystem.execute(DiscordClient, message);
});

DiscordClient.login(process.env.DISCORD_API_TOKEN);
