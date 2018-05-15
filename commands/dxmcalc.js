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
  .setColor("ea125e")
  // .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("Please use drugs responsiblty", "http://www.dosebot.org/images/dose.png")
  // .setImage("http://www.dosebot.org/images/dose.png")
  .setThumbnail("http://www.dosebot.org/images/dose.png")
  /*
  * Takes a Date object, defaults to current date.
  */
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("First plateau",
  lightMin + "-" + lightMaxCommonMin + "mg")
  /*
  * Inline fields may not display as inline if the thumbnail and/or image is too big.
  */
  .addField("Second plateau",
  lightMaxCommonMin + "-" + commonMaxStrongMin + "mg")
  .addField("Third plateau",
  commonMaxStrongMin + "-" + strongMaxHeavy + "mg")    
  .addField("Fourth plateau",
  strongMaxHeavy + "mg+")
  /*
  * Blank field, useful to create some space.
  */
  // .addBlankField(true)
  // .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
  
  message.channel.send({embed});
};

// function for getting log base 125
function getLog(x, y) {
  return Math.log(y) / Math.log(x);
}