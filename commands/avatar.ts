import Discord from 'discord.js';

import * as Helpers from '../include/helpers.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  // if there's a mentioned user grab the first, otherwise command requestor
  const user = message.mentions.users.first() ?? message.author;

  const avatar = user.avatarURL({size: 2048});
  if (avatar != null) {
    const embed = Helpers.TemplatedMessageEmbed()
      .setTitle('DoseBot Redux Avatar Service')
      .setImage(avatar);
    message.reply({ embeds: [embed], files: ["./assets/logo.png"] });
  } else {
    message.reply("Unable to find avatar.");
  }
};
