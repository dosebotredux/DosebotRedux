// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import Discord from 'discord.js';

const DiscordClient = new Discord.Client({
  intents: [ 'GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});
import * as CommandSystem from "./command-system";

DiscordClient.on('ready', async () => {
  console.log('DoseBot is online - beep boop');

  if (!DiscordClient.user) {
    console.log("No discord user. What?");
    return;
  }

  if (!!DiscordClient.application) {
    console.log("Setting application commands.");
    DiscordClient.application.commands.set(CommandSystem.applicationCommandData);
  } else {
    console.error("No discord client application found. Unable to set commands.");
  }

  // Update game message on launch
  const presence = DiscordClient.user.setActivity(`my part in reducing harm!`, { type: 'PLAYING' });
  console.log(`Activity set: ${JSON.stringify(presence.activities)}`);

  // Print guild list
  const guilds = DiscordClient.guilds.cache;
  const userCount = guilds
    .map((guild: Discord.Guild) => guild.memberCount)
    .reduce((x, y) => x + y, 0);

  console.log(`Currently serving ${userCount} users on ${guilds.size} guilds`);
  for (const guildComponents of guilds) {
    const guildId = guildComponents[0];
    const guild = guildComponents[1];
    console.log(`- ${guildId} - ${guild.name} - (${guild.memberCount} members)`);
  }
});

DiscordClient.on('guildCreate', guild => {
  console.log(`New server joined - Name: ${guild.id} ${guild.name} Members: ${guild.memberCount}`);
});

DiscordClient.on('messageCreate', message => {
  try {
    CommandSystem.execute(DiscordClient, message);
  } catch (error) {
    console.error("caught error executing command", message, error);
  }
});

DiscordClient.on('interactionCreate', async (interaction: Discord.Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  try {
    CommandSystem.executeCommandInteraction(interaction);
  } catch (error) {
    console.error("caught error executing interaction", interaction, error);
  }
});

DiscordClient.on('debug', (message: string) => {
  // console.log("!!! DEBUG !!!", message);
});

DiscordClient.on('warn', (message: string) => {
  console.log("!!! WARN !!!", message);
});

DiscordClient.login(process.env.DISCORD_API_TOKEN);
