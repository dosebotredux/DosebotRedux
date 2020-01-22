const Discord = require('discord.js');
const KetamineCalc = require('../include/ketaminecalc');
exports.run = (client, message, args) => {
  // Message variables
  var tokens = message.content.toLowerCase().split(" ")
  tokens.shift() // remove trigger
  var combined = tokens.join("")

  if (tokens.length < 1 || isNaN(parseInt(combined))) {
    message.channel.send('**Error:** No weight specified | Usage: `--ketaminecalc [weight] [unit]`. Example: `--ketaminecalc 85 kg`.');
    return;
  }

  // parse weight from result
  let weight = parseInt(combined);
  let weightIsKilos = (combined.includes('kg') || combined.includes('kilo'));

  const embed = new Discord.RichEmbed()
    .setTitle('Ketamine Dosage Calculator')
    .attachFile("./assets/logo.png")
    .setThumbnail('attachment://logo.png')
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setColor('747474')
    .setFooter('Please use drugs responsibly', 'attachment://logo.png')
    .setTimestamp()
    .setURL("https://github.com/dosebotredux")
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
