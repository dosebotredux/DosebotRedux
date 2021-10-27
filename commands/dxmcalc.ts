import Discord from 'discord.js';

import * as DXMCalc from '../include/dxmcalc';
import * as Helpers from '../include/helpers';

// Calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {

  // Message variables
  const inputs = message.content.split(/ +/g);

  // parse weight from result
  const weight = parseInt(inputs[1]);
  const weightIsKilos = inputs[1].includes('kg');

  if (!isNaN(weight)) {
    const embed = Helpers.TemplatedMessageEmbed()
      .setTitle('DXM Dosage Calculator')
      .addField('[:scales:] Dosages', DXMCalc.generateDosageField(weight, weightIsKilos))
      .addField('[:warning:] Warning', DXMCalc.generateWarningField())
      .addField('[:globe_with_meridians:] Links', DXMCalc.generateLinksField());

    message.channel.send({ embed });
  } else {
    message.channel.send('**Error:** No weight specified | Usage: --dxmcalc [weight]<optional: lb/kg>');
  }
}
