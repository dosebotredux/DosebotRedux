// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import Discord from 'discord.js';
import fs from 'node:fs';

const DiscordClient = new Discord.Client({
  intents: [ 'GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});
import * as CommandSystem from "./command-system";

DiscordClient.on('ready', async () => {
  console.log('DoseBot is beginning startup...');

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
  console.log(`DoseBot is online - beep boop! Serving ${guilds.size} guilds and ${guilds
      .map((guild: Discord.Guild) => guild.memberCount)
      .reduce((x, y) => x + y, 0)} users! See guilds.json for the full guild list.`);

  try {
    fs.writeFileSync('guilds.json', JSON.stringify(guilds
      .sort((x, y) => y.memberCount - x.memberCount)
      .map((guild) => ({
        since: guild.joinedAt,
        pop: guild.memberCount,
        name: guild.name,
        id: guild.id
      }))));
  } catch (err) {
    console.log("Could not write guilds.json!");
    console.error(err);
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
