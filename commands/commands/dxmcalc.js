// Calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  const DXMCalc = require('../../include/dxmcalc.js');
  console.log(`**********Executing dxmcalc on ${message.guild.name}**********`);

  // Message variables
  const str = message.content
    .toLowerCase()
    .replace('--dxmcalc', '', -1)
    .replace(/-/g, '', -1);

  // parse weight from result
  let weight = parseInt(str);
  let weightIsKilos = false;
  console.log(`1Weight is kilos: ${weightIsKilos}`);

  if (str.includes('kg')) {
    weight = Math.floor(weight / 2.2);
    weightIsKilos = true;
    console.log(`2Weight is kilos: ${weightIsKilos}`);
  }
  console.log(`3Weight is kilos: ${weightIsKilos}`);

  if (!isNaN(weight)) {
    const embed = new Discord.RichEmbed()
      .setTitle('DXM Dosage Calculator')
      .setAuthor('DoseBot', 'http://www.dosebot.org/images/dose.png')
      .setColor('747474')
      .setFooter(
        'Please use drugs responsibly',
        'http://www.dosebot.org/images/dose.png'
      )
      .setThumbnail('https://i.imgur.com/7R8WDwE.png')
      .setTimestamp()
      .setURL('http://www.dosebot.org')
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
