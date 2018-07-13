const Discord = require("discord.js");

// Welcome to role management
exports.run = (client, message, args) => {
  var author = message.member; // author object
  let str = message.content; // "--role role"
  let desiredRole = str.toLowerCase().replace("--role ", "", -1).replace(/-/g, "", -1).replace(/ /g, "", -1); // "role"
  console.log(desiredRole);
  let guild = message.guild; // guild snowflake
  let guildRoles = guild.roles; // role snowflake
  console.log(`Desired role: ${desiredRole}`);
  console.log(`Results: ${guildRoles.find(role => role.name === desiredRole)}`);
  
  // guildRoles.forEach(role => {
  //   console.log(`Role: ${role.name} Position: ${role.calculatedPosition}`);
  // });
  
  if (!!guildRoles.find(role => role.name.toLowerCase() === desiredRole)) {
    console.log("Guild has desired role");
    let desiredGuildRole = guildRoles.find(role => role.name.toLowerCase() === desiredRole);
    let doseBotRole = guildRoles.find(role => role.name.toLowerCase() === "dosebot");
    let doseBotCalculatedPosition = doseBotRole.calculatedPosition;
    console.log(`DoseBot position: ${doseBotCalculatedPosition}`);

    if (desiredGuildRole === "tripping") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "stimmed") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "barred") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "nodding") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "drunk") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "dissod") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "rolling") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "stoned") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "hungover") {
      toggleRole(desiredGuildRole);
    } else if (desiredGuildRole.name === "delirious") {
      toggleRole(desiredGuildRole);
    } else {
      message.channel.send(`Error: DoseBot cannot assign ${desiredGuildRole}`)
    }
    
    // if (desiredGuildRole.calculatedPosition < doseBotCalculatedPosition) {
    //   if (!!author.roles.find(role => role.name === desiredGuildRole.name)) {
    //     console.log(`Removed ${desiredRole} from <@${message.author.id}>`);
    //     author.removeRole(desiredGuildRole.id);
    //     message.channel.send(`Removed ${desiredRole} from <@${message.author.id}>`);
    //   } else {
    //     console.log(`Added ${desiredRole} to <@${message.author.id}>`);
    //     author.addRole(desiredGuildRole.id);
    //     message.channel.send(`Added **${desiredRole}** to <@${message.author.id}>`);
    //   }
    // } else {
    //   message.channel.send(`Error: **${desiredRole}** has higher permissions than DoseBot`);
    // }
  } else {
    console.log("Guild does not have desired role");
    message.channel.send(`Error: Guild does not have **${desiredRole}** role`);
  }
};

function toggleRole(roleToApply) {
  if (!!author.roles.find(role => role.name === roleToApply.toLowerCase())) {
    console.log(`Removed ${desiredRole} from <@${message.author.id}>`);
    author.removeRole(roleToApply.id);
    message.channel.send(`Removed ${desiredRole} from <@${message.author.id}>`);
  } else {
    console.log(`Added ${desiredRole} to <@${message.author.id}>`);
    author.addRole(roleToApply.id);
    message.channel.send(`Added **${desiredRole}** to <@${message.author.id}>`);
  }
}
