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
  
  // build message
  messages.push(`**DoseBot DXM calculator recommends:**\n\`\`\``);
  messages.push("");
  messages.push(`1st plateau: ${lightMin} - ${lightMaxCommonMin}mg`);
  messages.push(`2nd plateau: ${lightMaxCommonMin} - ${commonMaxStrongMin}mg`);
  messages.push(`3rd plateau: ${commonMaxStrongMin} - ${strongMaxHeavy}mg`);
  messages.push(`4th plateau: ${strongMaxHeavy}mg+\n\`\`\``);
  messages.push("**Warning:** These recommendations are an approximation, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.");
  
  // join message with new lines
  message.channel.send(messages.join("\n")).catch(console.error);
};

// function for getting log base 125
function getLog(x, y) {
  return Math.log(y) / Math.log(x);
}