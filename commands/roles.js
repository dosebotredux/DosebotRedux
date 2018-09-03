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

  temporaryRoles.forEach(role => {
    // const findRole = guildRoles.find(
    //   guildRole => guildRole.name.toLowerCase() === role
    // );
    console.log(
      guildRoles.find(guildRole => {
        guildRole.name.toLowerCase() === role;
      })
    );
    // console.log(findRole.name);
    console.log(role);

    if (findRole) {
      temporaryRoles.push(role);
    }
  });

  console.log(guildRoles);

  console.log(temporaryRoles);
  console.log(permanentRoles);
  console.log(availabeTemporaryRoles);
  console.log(availabePermanentRoles);

  // message.channel.send('https://i.imgur.com/mh3gkaz.png').catch(console.error);
};
