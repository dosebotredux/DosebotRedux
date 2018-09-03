// Role message
exports.run = (client, message, args) => {
  console.log(`**********Executing Role on ${message.guild.name}**********`);
  const Roles = require('../include/roles.js');

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
  const roleExceptions = Roles.getRoleExceptions();

  // Have an array of acceptable roles to apply
  const acceptableTemporaryRoles = Roles.getTemporaryRoles();

  // Have an array of acceptable permanent roles to apply
  const acceptablePermanentRoles = Roles.getPermanentRoles();

  // Check to see if current guild has exceptions
  if (Roles.checkIfGuildHasRoleExceptions(message.guild.id)) {
    console.log('exception detected');
    // Set role to either exception or original request role
    desiredRole = Role.returnGuildHasDesiredRoleException(
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
  if (Roles.checkIfGuildHasDesiredRole(guildRoles, desiredRole)) {
    // Capture the desired guild role
    const desiredGuildRole = Roles.returnDesiredGuildRoleSnowflake(
      guildRoles,
      desiredRole
    );
    // Now that we have the desired guild role snowflake we can check if its temporary or permanent
    if (Roles.checkIfRoleIsTemporary(desiredRole, acceptableTemporaryRoles)) {
      console.log('Role is temporary');
      toggleRole(false, desiredGuildRole, author, substance, dosage);
    } else if (
      Roles.checkIfRoleIsPermanent(desiredRole, acceptablePermanentRoles)
    ) {
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

  // Function for toggling a role
  function toggleRole(isPermanent, roleToApply, author, substance, dosage) {
    console.log(`In toggleRole Author is: ${author}`);
    if (isPermanent) {
      console.log('toggling permanent role');
      // Conditional to determine whether user has role
      if (Roles.checkIfUserHasRole(author, roleToApply)) {
        console.log('Author currently has role');

        Roles.unassignRole(roleToApply, author);
      } else {
        console.log('Author does not currently have role');
        Roles.assignRole(roleToApply, author, isPermanent);
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
      if (Roles.checkIfUserHasRole(author, roleToApply)) {
        console.log('Author currently has role');
        // Restores nickname
        Roles.restoreNickname();
        // Removes role
        Roles.unassignRole(roleToApply, author);
      } else {
        console.log('Author does not currently have role');
        // Sets trip nickname
        Roles.setTripNickName(nickName, nickNameModifier);
        // Adds role
        Roles.assignRole(roleToApply, author, isPermanent);
      }
    }
  }
};
