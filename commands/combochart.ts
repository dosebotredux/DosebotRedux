import Discord from 'discord.js';

//tripsit combo chart message
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.reply({ files: ["./assets/combochart.png"] });
};
