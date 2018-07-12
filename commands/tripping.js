const Discord = require("discord.js");

//about message
exports.run = (client, message, args) => {
  // var str = message.content;
  // var drug = str
  // .toLowerCase()
  // .replace("--tripping ", "", -1)
  // .replace(/-/g, "", -1)
  // .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier

  let author = message.member;

  if (!!author.roles.get("467024926394679307")) {
    console.log("not falsy, remove role");
    author.removeRole("467024926394679307");
  } else {
    console.log("falsy, adding role");
    author.addRole("467024926394679307");
  }

  // let guilds = client.guilds;
  // let SED = guilds.get("332288651394547712");
  // console.log(SED);
  // let cocoa = SED.members.get("278301453620084736");
  // console.log(cocoa);
  // cocoa.addRole("467024926394679307");
};
