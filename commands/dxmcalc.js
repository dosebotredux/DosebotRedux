const Discord = require("discord.js");

//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
exports.run = (client, message, args) => {
  // message variables
  var str = message.content;
  var result = str.split(" ");
  // parse weight from result
  var weight = parseFloat(result[result.length - 1]);
  
  // check to see if weight is a number and terminate if false
  if (isNaN(weight)) {
    message.channel.send("**Error:** No weight specified | Usage: --dxmcalc [weight in lbs]");
    return;
  }
  
  // kaylee's formula for dxm weight calculation
  var calculatedDoseModifier = 2 * getLog(125, weight) - 1;
  
  // modify dosages by weight
  var lightMin = Math.floor(100 * calculatedDoseModifier);
  var lightMaxCommonMin = Math.floor(200 * calculatedDoseModifier);
  var commonMaxStrongMin = Math.floor(400 * calculatedDoseModifier);
  var strongMaxHeavy = Math.floor(700 * calculatedDoseModifier);  
  var messages = [];
  
  const embed = new Discord.RichEmbed()
  .setTitle("DXM Dosage Calculator")
  .setAuthor("DoseBot", "http://www.dosebot.org/images/dose.png")
  .setColor("747474")
  .setFooter("Please use drugs responsibly", "http://www.dosebot.org/images/dose.png")
  .setThumbnail("http://www.dosebot.org/images/dose.png")
  .setTimestamp()
  .setURL("http://www.dosebot.org")
  .addField("[:scales:] Dosages",
  "First plateau: " + lightMin + "-" + lightMaxCommonMin + "mg" + "\n"
+ "Second plateau: " + lightMaxCommonMin + "-" + commonMaxStrongMin + "mg" + "\n"
+ "Third plateau: " + commonMaxStrongMin + "-" + strongMaxHeavy + "mg" + "\n"
+ "Fourth plateau: " + strongMaxHeavy + "mg+")
  .addField("[:warning:] Warning",
  "These recommendations are an approximation, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.")
  .addField("[:globe_with_meridians:] Links",
  "[PsychonautWiki](https://psychonautwiki.org/wiki/DXM)" + "\n" 
+ "[Tripsit](http://drugs.tripsit.me/dxm)" + "\n"
+ "[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)")

  message.channel.send({embed});
};

// function for getting log base 125
function getLog(x, y) {
  return Math.log(y) / Math.log(x);
}