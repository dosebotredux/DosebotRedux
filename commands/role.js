const Discord = require("discord.js");

// Welcome to role management
exports.run = (client, message, args) => {
  // var str = message.content;
  // var drug = str
  // .toLowerCase()
  // .replace("--tripping ", "", -1)
  // .replace(/-/g, "", -1)
  // .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  let author = message.member; // author object
  let str = message.content; // "--role role"
  let desiredRole = str.toLowerCase().replace("--role ", "", -1).replace(/-/g, "", -1).replace(/ /g, "", -1); // "role"
  console.log(desiredRole);
  let guild = message.guild; // guild snowflake
  let guildRoles = guild.roles; // role snowflake
  console.log(guildRoles);

  if (!!guildRoles.get(desiredRole)) {
    console.log("Guild has desired role");
    let desiredGuildRole = guildRoles.find(role => role.name === desiredRole);

    if (!!author.roles.find(role => role.name === desiredGuildRole)) {
      console.log("not falsy, removing role");

    } else {
      console.log("falsy, adding role");
    }
  } else {
    console.log("Guild does not have desired role");
  }

  // if (!!author.roles.get("467024926394679307")) {
  //   console.log("not falsy, removing role");
  //   author.removeRole("467024926394679307");
  // } else {
  //   console.log("falsy, adding role");
  //   author.addRole("467024926394679307");
  // }
};
