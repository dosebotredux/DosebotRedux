// Roles message
exports.run = (client, message, args) => {
  console.log(`**********Executing Roles on ${message.guild.name}**********`);
  const Discord = require('discord.js');
  const roles = require('../include/roles.js');

  const guildRoles = message.guild.roles;
  const temporaryRoles = roles.getTemporaryRoles();
  const permanentRoles = roles.getPermanentRoles();

  const availabeTemporaryRoles = [];
  const availabePermanentRoles = [];

  temporaryRoles.forEach(tempRole => {
    if (guildRoles.find(role => role.name.toLowerCase() === tempRole)) {
      console.log('found');
      temporaryRoles.push(tempRole);
    } else {
      console.log('not found');
    }
  });

  console.log(temporaryRoles);
  console.log(permanentRoles);
  console.log(availabeTemporaryRoles);
  console.log(availabePermanentRoles);

  // message.channel.send('https://i.imgur.com/mh3gkaz.png').catch(console.error);
};
