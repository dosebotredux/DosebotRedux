// Role message
exports.run = (client, message, args) => {
  console.log(`**********Executing Role on ${message.guild.name}**********`);

  const author = message.member; // author object
  const str = message.content; // "--role role lsd"
  // Create an array so we can access multiple arguments
  let substance;
  let dosage;
  let strArr = str.replace('--role ', '', -1).split(' '); // [lsd, 50ug]
  // Guild variables
  const guild = message.guild; // Guild snowflake
  const guildRoles = guild.roles; // Guild roles snowflake

  if (strArr.length === 2) {
    substance = strArr[1];
    dosage = '';
  } else if (strArr.length === 3) {
    substance = strArr[1];
    dosage = strArr[2];
  } else {
    substance = ' ';
    dosage = ' ';
  }

  // Set desired role
  let desiredRole = str
    .toLowerCase()
    .replace('--role ', '', -1)
    .replace(/-/g, '', -1); // "role"

  // Split desiredRole into an array and then capture the first string
  const desiredRoleArr = desiredRole.split(' ');
  desiredRole = desiredRoleArr[0];

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

  // Check to see if current guild has exceptions
  if (checkIfGuildHasRoleExceptions(message.guild.id)) {
    console.log('exception detected');
    // Set role to either exception or original request role
    desiredRole = returnGuildHasDesiredRoleException(
      message.guild.id,
      desiredRole
    );
  }

  console.log(`Desired role: ${desiredRole}`);
  // Log the result of a find operation on the desired role
  console.log(
    `Results: ${guildRoles.find(
      role => role.name.toLowerCase() === desiredRole
    )}`
  );

  // Checks to see if the desiredRole is equal to any role object's name property
  if (checkIfGuildHasDesiredRole(guildRoles, desiredRole)) {
    // Capture the desired guild role
    const desiredGuildRole = returnDesiredGuildRoleSnowflake(
      guildRoles,
      desiredRole
    );
    // Now that we have the desired guild role snowflake we can check if its temporary or permanent
    if (checkIfRoleIsTemporary(desiredRole, acceptableTemporaryRoles)) {
      console.log('Role is temporary');
      toggleRole(false, desiredGuildRole, author, substance, dosage);
    } else if (checkIfRoleIsPermanent(desiredRole, acceptablePermanentRoles)) {
      console.log('Role is permanent');
      toggleRole(true, desiredGuildRole, author, substance, dosage);
    }
  } else {
    // Send a message saying role can't be assigned
    console.log('cannot apply role');
    message.channel.send(
      `Error: DoseBot cannot assign role **${desiredRole}**`
    );
  }

  // Check to see if the current server has role exceptions
  function checkIfGuildHasRoleExceptions(guildID) {
    if (roleExceptions[guildID]) {
      console.log('Guild has role exceptions');
      return true;
    }
    return false;
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

  // Function for toggling a role
  function toggleRole(isPermanent, roleToApply, author, substance, dosage) {
    console.log(`In toggleRole Author is: ${author}`);
    if (isPermanent) {
      console.log('toggling permanent role');
      // let nickName = author.displayName;
      // let nickNameModifier;

      // Modify nickname is substance and dosage are provided
      // if (substance !== ' ') {
      //   nickNameModifier = ` | ${substance} ${dosage}`;
      // } else {
      //   nickNameModifier = ' ';
      // }

      // Conditional to determine whether user has role
      if (checkIfUserHasRole(author, roleToApply)) {
        console.log('Author currently has role');
        // Restores nickname
        // restoreNickname();
        // Removes role
        unassignRole(roleToApply, author);
      } else {
        console.log('Author does not currently have role');
        // Sets trip nickname
        // setTripNickName(nickName, nickNameModifier);
        // Adds role
        assignRole(roleToApply, author, isPermanent);
      }
    } else if (!isPermanent) {
      console.log('toggling temporary role');
      let nickName = author.displayName;
      let nickNameModifier;

      // Modify nickname is substance and dosage are provided
      if (substance !== ' ') {
        nickNameModifier = ` | ${substance} ${dosage}`;
      } else {
        nickNameModifier = ' ';
      }

      // Conditional to determine whether user has role
      if (checkIfUserHasRole(author, roleToApply)) {
        console.log('Author currently has role');
        // Restores nickname
        restoreNickname();
        // Removes role
        unassignRole(roleToApply, author);
      } else {
        console.log('Author does not currently have role');
        // Sets trip nickname
        setTripNickName(nickName, nickNameModifier);
        // Adds role
        assignRole(roleToApply, author, isPermanent);
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

  // Function for restoring nickname
  function restoreNickname() {
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
      }

      let nickToRestore = nickToRestoreArr.join('');
      console.log(`Restoring original nickname: ${nickToRestore}`);
      message.member.setNickname(nickToRestore).catch(console.error);
    } else {
      console.log('Not restoring nickname, no | detected');
    }
  }

  // Function for setting a trip nickname
  function setTripNickName(nick, nickNameModifier) {
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

  // Function for adding a role
  function assignRole(roleToApply, author, isPermanent) {
    console.log('were in assignRole');
    author.addRole(roleToApply.id).catch(console.error);
    console.log(`Added ${desiredRole} to <@${message.author.id}>`);
    // Send message to channel
    message.channel.send(`Added **${desiredRole}** to <@${message.author.id}>`);

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

  // Function for unassigning role
  function unassignRole(roleToApply, author) {
    console.log(`Removed **${desiredRole}** from ${author.displayName}`);
    author.removeRole(roleToApply.id).catch(console.error);
    message.channel.send(
      `Removed **${desiredRole}** from <@${message.author.id}>`
    );
  }
};
