import Discord from 'discord.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  // If someone mentions a person at the end of the bobross command,
  // make sure those people are mentioned with the response
  const mentions = message.mentions.users
    .map(user => `<@${user.id}> `)
    .reduce((x, y) => `${x}${y}`, '');

  message.channel
    .send(`${mentions}Enjoy a random episode of The Joy of Painting: <https://mityurl.com/y/cDIn/r>`);
};
