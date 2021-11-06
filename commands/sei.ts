import Discord from 'discord.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.reply("The Subjective Effect Index - https://www.effectindex.com/effects \nFounded by <@!295422447887450114>").catch(console.error);
};
