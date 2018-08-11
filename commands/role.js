const Discord = require("discord.js");

// Welcome to role management
exports.run = (client, message, args) => {
  console.log(`**********Executing role on ${message.guild.name}**********`);

  var author = message.member; // author object
  let str = message.content; // "--role role <lsd>"
  // Create array so we can access multiple args
  let substance;
  let dosage;
  let strArr = str.replace("--role ", "", -1).split(" "); // "[lsd, 50ug]"
  if (strArr.length === 2) {
    substance = strArr[1];
    dosage = "";
  } else if (strArr.length === 3) {
    substance = strArr[1];
    dosage = strArr[2];
  } else {
    substance = " ";
    dosage = " ";
  }
  // Set desired role
  let desiredRole;
  desiredRole = str
    .toLowerCase()
    .replace("--role ", "", -1)
    .replace(/-/g, "", -1); // "role"

  let desiredRoleArr = desiredRole.split(" ");
  desiredRole = desiredRoleArr[0];

  if (message.guild.id === 251433048896307200 && desiredRole === "tripping") {
    console.log(`we're setting desired role`);
    desiredRole = `tripping💓`;
  } else if (
    message.guild.id === 251433048896307200 &&
    desiredRole === "baked"
  ) {
    desiredRole = `baked🔥`;
  }

  console.log(`Desired role: ${desiredRole}`);
  let guild = message.guild; // guild snowflake
  let guildRoles = guild.roles; // role snowflake
  console.log(`Desired role: ${desiredRole}`);
  console.log(`Results: ${guildRoles.find(role => role.name === desiredRole)}`);

  // Checks to see if the desiredRole is equal to any role object's name property
  if (!!guildRoles.find(role => role.name.toLowerCase() === desiredRole)) {
    console.log("Guild has desired role");
    // Finds the guild's equivalent of the desiredRole
    let desiredGuildRole = guildRoles.find(
      role => role.name.toLowerCase() === desiredRole
    );

    // Horrifying if/else block for determing roles
    // This system prevents assigning of roles outside of intoxicated ones
    // TODO - make this a switch or something
    // Currently servers must use these named roles
    if (desiredGuildRole.name.toLowerCase() === "tripping") {
      console.log(`Calling toggleRole`);
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "stimmed") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "barred") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "nodding") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "drunk") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "dissod") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "rolling") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "stoned") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "hungover") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "delirious") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "altered") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "baked🔥") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else if (desiredGuildRole.name.toLowerCase() === "tripping💓") {
      toggleRole(desiredGuildRole, author, substance, dosage);
    } else {
      // Send message stating role cannot be assigned
      message.channel.send(
        `Error: DoseBot cannot assign role **${desiredRole}**`
      );
    }
  } else {
    // Send a message stating role does not exist on server
    console.log("Guild does not have desired role");
    message.channel.send(`Error: Guild does not have **${desiredRole}** role`);
  }
  //// Functions
  // Function for toggling the role of a user based on their current role state
  function toggleRole(roleToApply, author, substance, dosage) {
    console.log(`${substance} ${dosage}`);
    var nickName = author.displayName;
    if (substance !== " ") {
      var nickNameModifier = ` | ${substance} ${dosage}`;
    } else {
      var nickNameModifier = " ";
    }
    // Conditional to determine whether user has role
    if (!!author.roles.find(role => role.name === roleToApply.name)) {
      // Restores nickname
      restoreNickName();
      // Removes role
      unassignRole(roleToApply, author);
    } else {
      // Sets the nickname
      setTripNickName(nickName, nickNameModifier);
      // Adds role
      assignRole(roleToApply, author);
    }

    function assignRole(roleToApply, author) {
      // Log role and author and add role
      console.log(`we're in addrole`);
      author.addRole(roleToApply.id).catch(console.error);
      console.log(`Added ${desiredRole} to <@${message.author.id}>`);
      // Send message to channel
      message.channel.send(
        `Added **${desiredRole}** to <@${message.author.id}>`
      );
      // Change nickname
      setTripNickName(nickName, nickNameModifier);
      // Define an async function to handle automatic role removal
      const delay = duration =>
        new Promise(resolve => setTimeout(resolve, duration));
      // Delay for 8 hours and then remove role
      const asyncFunc = () => {
        delay(28800000).then(() => {
          // 28800000ms
          console.log(
            `Removed **${roleToApply.name}** from ${author.displayName}`
          );
          unassignRole(roleToApply, author);
          restoreNickName();
        });
      };
      asyncFunc();
    }
    function unassignRole(roleToApply, author) {
      console.log(`Removed ${desiredRole} from <@${message.author.id}>`);
      author.removeRole(roleToApply.id).catch(console.error);
      message.channel.send(
        `Removed **${desiredRole}** from <@${message.author.id}>`
      );
    }
    function setTripNickName(nick, modifier) {
      // Psy Experience
      if (message.guild.id === "335167514961248256") {
        nickName = message.member.displayName;
        if (nick !== undefined && modifier !== undefined) {
          console.log(`Nickname: ${nick} ${modifier}`);
          message.member
            .setNickname(`${nick} ${modifier}`)
            .catch(console.error);
        } else {
          console.log(`Nickname is undefined, not modifying name`);
        }
      }
    }
    function restoreNickName() {
      // Psy Experience
      if (message.guild.id === "335167514961248256") {
        let currentNick = message.member.displayName;
        console.log(currentNick);
        if (currentNick.includes("|")) {
          let currentNickArr = currentNick.split("");
          let nickToRestoreArr = [];
          let indexOfSeparator = currentNickArr.indexOf("|");

          for (let i = 0; i < indexOfSeparator; i++) {
            const letter = currentNickArr[i];
            nickToRestoreArr.push(letter);
          }

          let nickToRestore = nickToRestoreArr.join("");

          console.log(`Restoring original nickname: ${nickToRestore}`);
          message.member.setNickname(nickToRestore).catch(console.error);
        } else {
          console.log(`Not restoring nickname, no | detected`);
        }
      }
    }
  }
};
