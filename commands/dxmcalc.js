//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
//fix this so it sends all in one block instead of a separate messages
exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var weight = parseFloat(result[result.length - 1]);
  
  var threshold = 100;
  var lightMin = 100;
  var lightMax = 200;
  var commonMin = 200;
  var commonMax = 400;
  var strongMin = 400;
  var strongMax = 700;
  var heavy = 700;
  
  var calculatedDoseModifier = 2 * getLog(125, weight) - 1;
  
  console.log(calculatedDoseModifier);
  console.log(result);
  
  threshold *= calculatedDoseModifier;
  lightMin *= calculatedDoseModifier;
  lightMax *= calculatedDoseModifier;
  commonMin *= calculatedDoseModifier;
  commonMax *= calculatedDoseModifier;
  strongMin *= calculatedDoseModifier;
  strongMax *= calculatedDoseModifier;
  heavy *= calculatedDoseModifier;
  
  threshold = Math.floor(threshold);
  lightMin = Math.floor(lightMin);
  lightMax = Math.floor(lightMax);
  commonMin = Math.floor(commonMin);
  commonMax = Math.floor(commonMax);
  strongMin = Math.floor(strongMin);
  strongMax = Math.floor(strongMax);
  heavy = Math.floor(heavy);
  
  function getLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
  
  if (threshold !== NaN) {
    message.channel
    .send(
      "**DoseBot DXM calculator recommends:**" +
      "\n" +
      "```" +
      "\n" +
      "Threshold: " + threshold + "mg" +
      "\n" +
      "1st plateau: " + lightMin + " - " + lightMax + "mg" +
      "\n" +
      "2nd plateau: " + commonMin + " - " + commonMax + "mg" +
      "\n" +
      "3rd plateau: " + strongMin + " - " + strongMax + "mg" +
      "\n" +
      "4th plateau: " + heavy + "+mg" +
      "\n" +
      "```" +
      "\n" +
      "**Warning:** These recommendations are an approximation, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal."
    )
    .catch(console.error);
  } else {
    message.channel
    .send(
      "**Error:** No weight provided"
    )
    .catch(console.error);
  }
  
  // message.channel
  // .send(
  //   parseFloat(result[result.length - 1]) * 0.8 +
  //   "mg to " +
  //   parseFloat(result[result.length - 1]) * 1.2 +
  //   "mg of DXM for 1st Plateau\n" +
  //   parseFloat(result[result.length - 1]) * 1.75 +
  //   "mg to " +
  //   parseFloat(result[result.length - 1]) * 3.15 +
  //   "mg of DXM for 2nd Plateau\n" +
  //   parseFloat(result[result.length - 1]) * 3.5 +
  //   "mg to " +
  //   parseFloat(result[result.length - 1]) * 6.6 +
  //   "mg of DXM for 3rd Plateau\n" +
  //   parseFloat(result[result.length - 1]) * 6.6 +
  //   "mg to " +
  //   parseFloat(result[result.length - 1]) * 10 +
  //   "mg of DXM for 4th Plateau\n**Warning: Doses exceeding 1500mg are dangerous and even an experienced user should not consider them to be safe.**"
  // )
  // .catch(console.error);
};
