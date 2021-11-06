import Discord from 'discord.js';

import * as Helpers from '../include/helpers';
import * as roles from '../include/roles';
  
function generateRoleField(array: string[]) {
  if (array.length > 0) {
    return array.join('\n');
  }
  return 'No roles';
}

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  const availableTemporaryRoles: string[] = [];
  const availablePermanentRoles: string[] = [];

  const guildRoles = message?.guild?.roles.cache;

  roles.temporaryRoles.forEach((roleName: string) => {
    if (guildRoles?.find((role: Discord.Role) => role.name.toLowerCase() === roleName)) {
      availableTemporaryRoles.push(roleName);
    }
  });

  roles.permanentRoles.forEach((roleName: string) => {
    if (guildRoles?.find((role: Discord.Role) => role.name.toLowerCase() === roleName)) {
      availablePermanentRoles.push(roleName);
    }
  });

  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle('DoseBot Redux Help')
    .addField('Temporary roles', generateRoleField(availableTemporaryRoles))
    .addField('Permanent roles', generateRoleField(availablePermanentRoles));

  message.reply({ embeds: [embed], files: ["./assets/logo.png"] });
}
