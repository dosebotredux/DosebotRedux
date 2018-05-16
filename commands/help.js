const Discord = require("discord.js");

//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle("DoseBot Help")
    .setAuthor("DoseBot", "http://www.dosebot.org/images/dose.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "http://www.dosebot.org/images/dose.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField("Available commands", buildCommandList())
};

function buildCommandList() {
  var commands = [
    "--about",
    "--badtrip",
    "--bobross",
    "--combochart",
    "--dxmcalc [weight in lbs]",
    "--effectinfo [effect]",
    "--effects [substance]",
    "--info [substance]",
    "--memes",
    "--psytolerance [days]",
    "--randomeffect",
    "--triptoy"
  ];

  return commands.join("\n");
}