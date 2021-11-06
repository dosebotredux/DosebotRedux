import Discord from 'discord.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.reply({ content: `Hello <@${ message.author.id }>, I'm DoseBot Redux! Nice to meet you! ^_^`, files: ["./assets/mascot.png"] });
}
