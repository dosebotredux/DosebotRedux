//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var weight = parseFloat(result[result.length - 1]);
  
  if (isNaN(weight)) {
    message.channel.send("**Error:** No weight specified | Usage: --dxmcalc [weight in lbs]");
    return;
  }
  
  var calculatedDoseModifier = 2 * getLog(125, weight) - 1;
  
  var lightMin = Math.floor(100 * calculatedDoseModifier);
  var lightMaxCommonMin = Math.floor(200 * calculatedDoseModifier);
  var commonMaxStrongMin = Math.floor(400 * calculatedDoseModifier);
  var strongMaxHeavy = Math.floor(700 * calculatedDoseModifier);  
  var messages = [];
  
  messages.push(`**DoseBot DXM calculator recommends:**\`\`\``);
  messages.push("");
  messages.push(`1st plateau: ${lightMin} - ${lightMaxCommonMin}mg`);
  messages.push(`2st plateau: ${lightMaxCommonMin} - ${commonMaxStrongMin}mg`);
  messages.push(`3st plateau: ${commonMaxStrongMin} - ${strongMaxHeavy}mg`);
  messages.push(`4st plateau: ${strongMaxHeavy}mg+\`\`\``);
  messages.push("**Warning:** These recommendations are an approximation, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.");
  
  message.channel.send(messages.join("\n")).catch(console.error);
};

// functions
function getLog(x, y) {
  return Math.log(y) / Math.log(x);
}