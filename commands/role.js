const roles = require('../include/roles.js');

function assignNickname(guild, user, substance, dosage) {
  if (!guild.me.hasPermission('MANAGE_NICKNAMES')) {
    console.log("Not setting nickname, don't have permission");
    return new Promise((resolve) => resolve());
  }

  if (substance !== undefined && dosage !== undefined) {
    return user.setNickname(`${user.displayName} | ${substance} ${dosage}`);
  } else if (substance !== undefined) {
    return user.setNickname(`${user.displayName} | ${substance}`);
  } else {
    return new Promise((resolve) => resolve())
  }
}

function restoreNickname(guild, user) {
  if (!guild.me.hasPermission('MANAGE_NICKNAMES')) {
    console.log("Not setting nickname, don't have permission");
    return new Promise((resolve) => resolve());
  }

  if (user.displayName.includes('|')) {
    let nickTokens = user.displayName.split('|');
    return message.member.setNickname(nickTokens[0]);
  } else {
    return new Promise((resolve) => resolve());
  }
}

function assignRole(guild, user, roleToApply, substance, dosage, isPermanent) {
  return user.roles.add(roleToApply).then(() => {
    // Catching this error. There's a bug that causes Missing Permissions API
    // errors even with the permissions being checked.
    return assignNickname(guild, user, substance, dosage).catch(console.error);
  }).then(() => {
    if (!isPermanent) {
      new Promise((resolve) => {
        console.log("Unassigning role in 8 hours.")
        setTimeout(resolve, 8 * 60 * 60 * 1000);
      }).then(() => {
        return unassignRole(user, roleToApply);
      }).catch(console.error);
    }
  })
}

function unassignRole(guild, user, roleToApply) {
  return user.roles.remove(roleToApply).then(() => {
    // Catching this error. There's a bug that causes Missing Permissions API
    // errors even with the permissions being checked.
    return restoreNickname(guild, user).catch(console.error);
  });
}

// Function for toggling a role
function toggleRole(channel, user, roleToSet, substance, dosage, isPermanent) {
  if (user.roles.cache.find(role => role.name == roleToSet.name)) {
    // User already has role -- unset
    return unassignRole(channel.guild, user, roleToSet).then(() => {
      return channel.send(`Removed **${roleToSet.name}** from <@${user.id}>`);
    });
  } else {
    // User does not have role -- set
    return assignRole(channel.guild, user, roleToSet, substance, dosage, isPermanent).then(() => {
      return channel.send(`Added **${roleToSet.name}** to <@${user.id}>`);
    });
  }
}

exports.run = (client, message, args) => {
  var tokens = message.content.split(" ");
  tokens.shift();
  let roleName = tokens[0].toLowerCase().replace(/[\W_]+/g,"");

  if (!(roles.temporaryRoles.includes(roleName) || roles.permanentRoles.includes(roleName))) {
    console.log(`Not a valid role: roleName`)
    return
  }

  let substance;
  let dosage;
  if (tokens.length === 2) {
    substance = tokens[1];
    dosage = undefined;
  } else if (tokens.length === 3) {
    substance = tokens[1];
    dosage = tokens[2];
  } else {
    substance = undefined;
    dosage = undefined;
  }

  // Checks to see if the desiredRole is equal to any role object's name property
  const roleToSet = message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/[\W_]+/g,"") == roleName)
  if (!roleToSet) {
    message.channel.send('Error: That role does not does not exist on this server.').catch(console.error);
    return;
  }

  let member = message.member;
  if (!member) {
    message.channel.send("It appears you're not a member of this guild.").catch(console.error);
  }

  // Now that we have the desired guild role snowflake we can check if its temporary or permanent
  let isPermanent = roles.permanentRoles.includes(roleName)
  toggleRole(message.channel, member, roleToSet, substance, dosage, isPermanent).catch(console.error);
};
