const Discord = require('discord.js');
const KetamineCalc = require('../include/ketaminecalc');
const Helpers = require('../helpers.js');

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

  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle('Ketamine Dosage Calculator')
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
