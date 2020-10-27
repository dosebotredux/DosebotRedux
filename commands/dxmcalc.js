// Calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  const DXMCalc = require('../include/dxmcalc.js');
  const Helpers = require('../helpers.js');

  // Message variables
  const inputs = message.content.split(/ +/g);

  // parse weight from result
  let weight = parseInt(inputs[1]);
  let weightIsKilos = false;

  if (inputs[1].includes('kg')) {
    weightIsKilos = true;
  }

  if (!isNaN(weight)) {
    const embed = Helpers.TemplatedMessageEmbed()
      .setTitle('DXM Dosage Calculator')
      .addField(
        '[:scales:] Dosages',
        DXMCalc.generateDosageField(weight, weightIsKilos)
      )
      .addField('[:warning:] Warning', DXMCalc.generateWarningField())
      .addField('[:globe_with_meridians:] Links', DXMCalc.generateLinksField());

    message.channel.send({ embed });
  } else {
    message.channel.send(
      '**Error:** No weight specified | Usage: --dxmcalc [weight]<optional: lb/kg>'
    );
  }
};
