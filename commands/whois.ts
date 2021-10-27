import Discord from 'discord.js';

import * as Helpers from '../include/helpers.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {

  const mentionedUsers: Discord.User[] = [];

  if (message.mentions) {
    message.mentions.users.forEach(user => {
      mentionedUsers.push(user);
    });
  }

  if (mentionedUsers.length > 0) {
    mentionedUsers.forEach(user => {
      const embed = Helpers.TemplatedMessageEmbed()
        .addField('Name', user.username)
        .addField('Status', user.presence.status)
        .addField('Registered', user.createdAt)
        .addField('Last seen', user.lastMessage?.createdAt ?? "never")
        .addField('Discord ID', user.id);

      message.channel.send(embed);
    });
  } else {
    message.channel.send('Error: No mentioned users detected');
  }

}
