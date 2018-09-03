// Have an array of acceptable roles to apply
const acceptableTemporaryRoles = [
  'tripping',
  'stimmed',
  'barred',
  'nodding',
  'drunk',
  'dissod',
  'rolling',
  'stoned',
  'hungover',
  'delirious',
  'altered',
  'baked🔥',
  'tripping💓'
];

// Have an array of acceptable permanent roles to apply
const acceptablePermanentRoles = [
  'he/him',
  'she/her',
  'they/them',
  'any pronouns',
  've/ver',
  'e/em/eir',
  'earthling',
  'pup/pupself',
  'shi/hir',
  'kit/kitself',
  'fel/feline',
  'it/its',
  'per/perself',
  'meow',
  'rib/ribbit'
];

// Have an object of servers with role exceptions
const roleExceptions = {
  // Psychonauts exceptions
  '251433048896307200': {
    tripping: 'tripping💓',
    baked: 'baked🔥'
  },
  // Praxis exceptions
  '350132819307003905': {
    any: 'any pronouns'
  }
};

function getTemporaryRoles() {
  return acceptableTemporaryRoles;
}

function getPermanentRoles() {
  return acceptablePermanentRoles;
}

function getRoleExceptions() {
  return roleExceptions;
}

// Check to see if the current server has role exceptions
function checkIfGuildHasRoleExceptions(guildID) {
  if (roleExceptions[guildID]) {
    console.log('Guild has role exceptions');
    return true;
  }
  return false;
}

// Function for checking if guild has the desired role
function checkIfGuildHasDesiredRole(guildRolesSnowflake, desiredRole) {
  console.log('Checking if guild has desired role');
  if (
    guildRolesSnowflake.find(role => role.name.toLowerCase() === desiredRole)
  ) {
    console.log('Guild has desired role');
    return true;
  }
  console.log('Guild does not have desired role');
  return false;
}

// Function for returning desired guild role snowflake
function returnDesiredGuildRoleSnowflake(guildRolesSnowflake, desiredRole) {
  return guildRolesSnowflake.find(
    role => role.name.toLowerCase() === desiredRole
  );
}

// Function for checking if role is temporary
function checkIfRoleIsTemporary(desiredRole, temporaryArray) {
  let roleIsTemporary = false;
  temporaryArray.forEach(role => {
    if (role === desiredRole) {
      console.log('Role is temporary and found');
      roleIsTemporary = true;
    }
  });
  console.log(`Desired role: ${desiredRole} - Temporary: ${roleIsTemporary}`);
  return roleIsTemporary;
}

// Function for checking if a role is permanent
function checkIfRoleIsPermanent(desiredRole, permanentArray) {
  let roleIsPermanent = false;
  permanentArray.forEach(role => {
    if (role === desiredRole) {
      console.log('Role is permanent and found');
      roleIsPermanent = true;
    }
  });
  console.log(`Desired role: ${desiredRole} - Permanent: ${roleIsPermanent}`);
  return roleIsPermanent;
}

// Function for checking and returning guild role exception
function returnGuildHasDesiredRoleException(guildID, desiredRole) {
  if (roleExceptions[guildID][desiredRole]) {
    console.log('returning from exception list');
    console.log(`returning ${roleExceptions[guildID][desiredRole]}`);
    return roleExceptions[guildID][desiredRole];
  }
  console.log('returning original desiredRole');
  return desiredRole;
}

// Function for restoring nickname
function restoreNickname(message) {
  // Only set nickname on Psychedelic Experience
  if (message.guild.id === '335167514961248256') {
    let currentNick = message.member.displayName;
    console.log(`Current nickname: ${currentNick}`);

    if (currentNick.includes('|')) {
      let currentNickArr = currentNick.split('');
      let nickToRestoreArr = [];
      let indexOfSeparator = currentNickArr.indexOf('|');

      for (let i = 0; i < indexOfSeparator; i++) {
        const letter = currentNickArr[i];
        nickToRestoreArr.push(letter);
      }
      let nickToRestore = nickToRestoreArr.join('');
      console.log(`Restoring original nickname: ${nickToRestore}`);
      message.member.setNickname(nickToRestore).catch(console.error);
    }
  } else {
    console.log('Not restoring nickname, no | detected');
  }
}

// Function for unassigning role
function unassignRole(roleToApply, author, message, desiredRole) {
  console.log(`Removed **${roleToApply.name}** from ${author.displayName}`);
  author.removeRole(roleToApply.id).catch(console.error);
  message.channel.send(
    `Removed **${roleToApply.name}** from <@${message.author.id}>`
  );
}

// Function for setting a trip nickname
function setTripNickName(nick, nickNameModifier, message) {
  // Only set nickname on Psychedelic Experience
  if (message.guild.id === '335167514961248256') {
    nickName = message.member.displayName;
    if (nick !== undefined && nickNameModifier !== undefined) {
      console.log(`Nickname: ${nick} ${nickNameModifier}`);
      message.member
        .setNickname(`${nick} ${nickNameModifier}`)
        .catch(console.error);
    } else {
      console.log('Nickname is undefined, not modifying name');
    }
  }
}

// Function for checking if a user has a role
function checkIfUserHasRole(author, roleToApply) {
  console.log(`In checkIfUserHasRole Author is: ${author}`);

  if (author.roles.find(role => role.name === roleToApply.name)) {
    return true;
  }
  return false;
}

// Function for adding a role
function assignRole(roleToApply, author, isPermanent, message, desiredRole) {
  console.log('were in assignRole');
  author.addRole(roleToApply.id).catch(console.error);
  console.log(`Added ${roleToApply.name} to <@${message.author.id}>`);
  // Send message to channel
  message.channel.send(
    `Added **${roleToApply.name}** to <@${message.author.id}>`
  );

  // Check if role is permanent and remove only if it is not
  if (!isPermanent) {
    const delay = duration =>
      new Promise(resolve => setTimeout(resolve, duration));
    // Delay for 8 hours then remove role
    const asyncFunc = author => {
      delay(28800000).then(() => {
        // 28800000ms
        console.log(
          `Removed **${roleToApply.name}** from ${author.displayName}`
        );
        unassignRole(roleToApply, author);
        restoreNickname();
      });
    };
    asyncFunc(author);
  }
}

module.exports.getTemporaryRoles = getTemporaryRoles;
module.exports.getPermanentRoles = getPermanentRoles;
module.exports.getRoleExceptions = getRoleExceptions;
module.exports.checkIfGuildHasRoleExceptions = checkIfGuildHasRoleExceptions;
module.exports.checkIfGuildHasDesiredRole = checkIfGuildHasDesiredRole;
module.exports.returnDesiredGuildRoleSnowflake = returnDesiredGuildRoleSnowflake;
module.exports.checkIfRoleIsTemporary = checkIfRoleIsTemporary;
module.exports.checkIfRoleIsPermanent = checkIfRoleIsPermanent;
module.exports.returnGuildHasDesiredRoleException = returnGuildHasDesiredRoleException;
module.exports.restoreNickname = restoreNickname;
module.exports.unassignRole = unassignRole;
module.exports.setTripNickName = setTripNickName;
module.exports.assignRole = assignRole;
module.exports.checkIfUserHasRole = checkIfUserHasRole;
