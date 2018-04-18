//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var weight = parseFloat(result[result.length - 1]);

  var calculatedDoseModifier = 2 * getLog(125, weight) - 1;
  
  var lightMin = Math.floor(100 * calculatedDoseModifier);
  var lightMax = Math.floor(200 * calculatedDoseModifier);
  var commonMin = Math.floor(200 * calculatedDoseModifier);
  var commonMax = Math.floor(400 * calculatedDoseModifier);
  var strongMin = Math.floor(400 * calculatedDoseModifier);
  var strongMax = Math.floor(700 * calculatedDoseModifier);
  var heavy = Math.floor(700 * calculatedDoseModifier);

  var messages = [];

  messages.push(`**DoseBot DXM calculator recommends:**`);
  messages.push("");
  messages.push("```");
  messages.push("");
  messages.push(`1st plateau: ${lightMin} - ${lightMax}mg`);
  messages.push(`2st plateau: ${commonMin} - ${commonMax}mg`);
  messages.push(`3st plateau: ${strongMin} - ${strongMax}mg`);
  messages.push(`4st plateau: ${heavy}mg+`);
  messages.push("```");

  message.channel.send(messages.join("\n")).catch(console.error);
  
  // if (lightMin !== NaN) {
  //   message.channel
  //   .send()
  // }
  // if (lightMin !== NaN) {
  //   message.channel
  //   .send(
  //     "**DoseBot DXM calculator recommends:**" +
  //     "\n" +
  //     "```" +
  //     "\n" +
  //     "1st plateau: " + lightMin + " - " + lightMax + "mg" +
  //     "\n" +
  //     "2nd plateau: " + commonMin + " - " + commonMax + "mg" +
  //     "\n" +
  //     "3rd plateau: " + strongMin + " - " + strongMax + "mg" +
  //     "\n" +
  //     "4th plateau: " + heavy + "mg+" +
  //     "\n" +
  //     "```" +
  //     "\n" +
  //     "**Warning:** These recommendations are an approximation, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal."
  //   )
  //   .catch(console.error);
  // } else {
  //   message.channel
  //   .send(
  //     "**Error:** No weight provided"
  //   )
  //   .catch(console.error);
  // }
  
};

// functions
function getLog(x, y) {
  return Math.log(y) / Math.log(x);
}