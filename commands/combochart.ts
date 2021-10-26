import Discord from 'discord.js';

//tripsit combo chart message
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.channel
    .send({ files: ["./assets/combochart.png"] })
    .catch(console.error);
};
