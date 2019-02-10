const Discord = require('discord.js');
const KetamineCalc = require('../include/ketaminecalc');
exports.run = (client, message, args) => {
  // Message variables
  const str = message.content
    .toLowerCase()
    .replace('--ketaminecalc', '', -1)
    .replace(/-/g, '', -1);

  // parse weight from result
  let weight = parseInt(str);
  let weightIsKilos = false;

  if (str.includes('kg')) {
    weightIsKilos = true;
  }

  // check to see if weight is a number and terminate if false
  if (isNaN(weight)) {
    message.channel.send(
      '**Error:** No weight specified | Usage: --ketaminecalc [weight]<optional: lbs/kg'
    );
    return;
  }

  const embed = new Discord.RichEmbed()
    .setTitle('Ketamine Dosage Calculator')
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
      `Dosages for: **${weight}${weightIsKilos ? 'kg' : 'lbs'}**`
    )
    .addField(
      'Insufflated',
      KetamineCalc.generateInsufflatedDosages(weight, weightIsKilos),
      true
    )
    .addField(
      'Intramuscular',
      KetamineCalc.generateIntramuscularDosages(weight, weightIsKilos),
      true
    )
    .addField(
      'Oral',
      KetamineCalc.generateOralDosage(weight, weightIsKilos),
      true
    )
    .addField(
      'Rectal',
      KetamineCalc.generateRectalDosage(weight, weightIsKilos),
      true
    );

  message.channel.send({ embed });
};
