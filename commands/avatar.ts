import Discord from 'discord.js';

import * as Helpers from '../include/helpers.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  // if there's a mentioned user grab the first, otherwise command requestor
  let user = message.mentions.users.first() ?? message.author;

  let avatar = user.avatarURL({size: 2048});
  if (avatar != null) {
    let embed = Helpers.TemplatedMessageEmbed()
      .setTitle('DoseBot Redux Avatar Service')
      .setImage(avatar);
    message.channel.send(embed);
  } else {
    message.channel.send("Unable to find avatar.");
  }
};
