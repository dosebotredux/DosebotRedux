//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
//fix this so it sends all in one block instead of a separate messages
exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var weight = parseFloat(result[result.length - 1]);

  var threshold = 100;
  var light = 150;
  var common = 300;
  var strong = 550;
  var heavy = 700;
  
  message.channel.send("DoseBot recommends:").catch(console.error);

  var calculatedDoseModifier = 2 * getLog(125, weight) - 1;

  console.log(calculatedDoseModifier);
  console.log(result);

  threshold *= calculatedDoseModifier;
  light *= calculatedDoseModifier;
  common *= calculatedDoseModifier;
  strong *= calculatedDoseModifier;
  heavy *= calculatedDoseModifier;

  console.log(threshold);
  console.log(light);
  console.log(common);
  console.log(strong);
  console.log(heavy);

  function getLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
  
  message.channel
  .send(
    parseFloat(result[result.length - 1]) * 0.8 +
    "mg to " +
    parseFloat(result[result.length - 1]) * 1.2 +
    "mg of DXM for 1st Plateau\n" +
    parseFloat(result[result.length - 1]) * 1.75 +
    "mg to " +
    parseFloat(result[result.length - 1]) * 3.15 +
    "mg of DXM for 2nd Plateau\n" +
    parseFloat(result[result.length - 1]) * 3.5 +
    "mg to " +
    parseFloat(result[result.length - 1]) * 6.6 +
    "mg of DXM for 3rd Plateau\n" +
    parseFloat(result[result.length - 1]) * 6.6 +
    "mg to " +
    parseFloat(result[result.length - 1]) * 10 +
    "mg of DXM for 4th Plateau\n**Warning: Doses exceeding 1500mg are dangerous and even an experienced user should not consider them to be safe.**"
  )
  .catch(console.error);
};
