import Discord from 'discord.js';

// Panic attack command
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.channel.send({ files: ["./assets/breathe2.gif"] });
};
