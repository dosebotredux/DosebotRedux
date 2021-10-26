import Discord from 'discord.js';

// Sends a random TDC video to the channel
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  let response = `<@${message.author.id}> - Enjoy a random episode of The Drug Classroom: <https://kek.gg/u/LP7h>`;

  message.channel
    .send(response)
    .catch(console.error);
};
