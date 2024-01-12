import Discord from 'discord.js';

import * as KetamineCalc from '../include/ketaminecalc';
import * as Helpers from '../include/helpers';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  // Message variables
  const tokens = message.content.toLowerCase().split(" ")
  tokens.shift() // remove trigger
  const combined = tokens.join("")

  if (tokens.length < 1 || isNaN(parseInt(combined))) {
    message.reply('**Error:** No weight specified | Usage: `--ketaminecalc [weight] [unit]`. Example: `--ketaminecalc 85 kg`.');
    return;
  }

  // parse weight from result
  const weight = parseInt(combined);
  const weightIsKilos = (combined.includes('kg') || combined.includes('kilo'));

  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle('Ketamine Dosage Calculator')
    .addField('[:scales:] Dosages', `Dosages for: **${weight}${weightIsKilos ? 'kg' : 'lbs'}**`)
    .addField('Insufflated', KetamineCalc.generateInsufflatedDosages(weight, weightIsKilos), true)
    .addField('Intramuscular', KetamineCalc.generateIntramuscularDosages(weight, weightIsKilos), true)
    .addField('Oral', KetamineCalc.generateOralDosage(weight, weightIsKilos), true)
    .addField('Rectal', KetamineCalc.generateRectalDosage(weight, weightIsKilos), true);

  message.reply({ embeds: [embed], files: ["./assets/logo.png"] });
}
