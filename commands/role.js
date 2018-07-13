const Discord = require("discord.js");

// Welcome to role management
exports.run = (client, message, args) => {
  console.log(`**********Executing role on ${message.guild.name}**********`);

  var author = message.member; // author object
  let str = message.content; // "--role role"
  let desiredRole = str.toLowerCase().replace("--role ", "", -1).replace(/-/g, "", -1).replace(/ /g, "", -1); // "role"
  console.log(desiredRole);
  let guild = message.guild; // guild snowflake
  let guildRoles = guild.roles; // role snowflake
  console.log(`Desired role: ${desiredRole}`);
  console.log(`Results: ${guildRoles.find(role => role.name === desiredRole)}`);
  
  if (!!guildRoles.find(role => role.name.toLowerCase() === desiredRole)) {
    console.log("Guild has desired role");
    let desiredGuildRole = guildRoles.find(role => role.name.toLowerCase() === desiredRole);
    let doseBotRole = guildRoles.find(role => role.name.toLowerCase() === "dosebot");
    let doseBotCalculatedPosition = doseBotRole.calculatedPosition;
    console.log(`DoseBot position: ${doseBotCalculatedPosition}`);
    
    if (desiredGuildRole.name.toLowerCase() === "tripping") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "stimmed") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "barred") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "nodding") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "drunk") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "dissod") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "rolling") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "stoned") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "hungover") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "delirious") {
      toggleRole(desiredGuildRole, author);
    } else {
      message.channel.send(`Error: DoseBot cannot assign role **${desiredRole}**`)
    }
  } else {
    console.log("Guild does not have desired role");
    message.channel.send(`Error: Guild does not have **${desiredRole}** role`);
  }
  function toggleRole(roleToApply, author) {
    if (!!author.roles.find(role => role.name === roleToApply.name)) {
      console.log(`Removed ${desiredRole} from <@${message.author.id}>`);
      author.removeRole(roleToApply.id);
      message.channel.send(`Removed **${desiredRole}** from <@${message.author.id}>`);
    } else {
      console.log(`Added ${desiredRole} to <@${message.author.id}>`);
      author.addRole(roleToApply.id);
      message.channel.send(`Added **${desiredRole}** to <@${message.author.id}>`);
    }
  }
};

