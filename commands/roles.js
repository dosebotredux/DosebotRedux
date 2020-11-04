const Helpers = require('../helpers.js');
  
// Roles message
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  const roles = require('../include/roles.js');

  const guildRoles = message.guild.roles.cache;

  const availableTemporaryRoles = [];
  const availablePermanentRoles = [];

  roles.temporaryRoles.forEach(roleName => {
    if (guildRoles.find(role => role.name.toLowerCase() === roleName)) {
      availableTemporaryRoles.push(roleName);
    }
  });

  roles.permanentRoles.forEach(roleName => {
    if (guildRoles.find(role => role.name.toLowerCase() === roleName)) {
      availablePermanentRoles.push(roleName);
    }
  });

  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle('DoseBot Redux Help')
    .addField('Temporary roles', generateRoleField(availableTemporaryRoles))
    .addField('Permanent roles', generateRoleField(availablePermanentRoles));

  message.channel.send({ embed });

  function generateRoleField(array) {
    if (array.length > 0) {
      return array.join('\n');
    }
    return 'No roles';
  }
};
