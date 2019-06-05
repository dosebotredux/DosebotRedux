// Roles message
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  const roles = require('../include/roles.js');

  const guildRoles = message.guild.roles;
  const temporaryRoles = roles.getTemporaryRoles();
  const permanentRoles = roles.getPermanentRoles();

  const availabeTemporaryRoles = [];
  const availabePermanentRoles = [];

  temporaryRoles.forEach(tempRole => {
    if (guildRoles.find(role => role.name.toLowerCase() === tempRole)) {
      availabeTemporaryRoles.push(tempRole);
    }
  });

  permanentRoles.forEach(tempRole => {
    if (guildRoles.find(role => role.name.toLowerCase() === tempRole)) {
      availabePermanentRoles.push(tempRole);
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
    .addField('Temporary roles', generateRoleField(availabeTemporaryRoles))
    .addField('Permanent roles', generateRoleField(availabePermanentRoles));

  message.channel.send({ embed });

  function generateRoleField(array) {
    if (array.length > 0) {
      return array.join('\n');
    }
    return 'No roles';
  }
};
