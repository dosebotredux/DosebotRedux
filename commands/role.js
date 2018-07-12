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

  if (!!guildRoles.find(role => role.name.toLowerCase() === desiredRole)) {
    console.log("Guild has desired role");
    let desiredGuildRole = guildRoles.find(role => role.name.toLowerCase() === desiredRole);

    if (!!author.roles.find(role => role.name === desiredGuildRole.name)) {
      console.log(`Removed ${desiredRole} from <@${message.author.id}>`);
      author.removeRole(desiredGuildRole.id);
      message.channel.send(`Removed ${desiredRole} from <$@{message.author.id}>`);
    } else {
      console.log(`Added ${desiredRole} to <@${message.author.id}>`);
      author.addRole(desiredGuildRole.id);
      message.channel.send(`Added ${desiredRole} to <@${message.author.id}>`);
    }
  } else {
    console.log("Guild does not have desired role");
  }
};
