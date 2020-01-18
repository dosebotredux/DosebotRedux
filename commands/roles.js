// Roles message
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  const roles = require('../include/roles.js');

  const guildRoles = message.guild.roles;

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

  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Redux Help')
    .attachFile("./assets/logo.png")
    .setThumbnail('attachment://logo.png')
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setColor('747474')
    .setFooter('Please use drugs responsibly', 'attachment://logo.png')
    .setTimestamp()
    .setURL("https://github.com/dosebotredux")
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
