// About message
import Discord from 'discord.js';

import * as Helpers from '../include/helpers.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  const embed = Helpers.TemplatedMessageEmbed()
    .addField( 'About DoseBot Redux',
      `DoseBot Redux automatically sources dosage, duration, tolerance, and harm reduction information from [PsychonautWiki](http://www.psychonautwiki.org) and [Effect Index](https://effectindex.com).

      It was created with the goal of raising awareness of harm reduction best practices, as well as the Subjective Effect Index. For a complete list of commands type '--help'.

      For more information about DoseBot Redux, see [our page on Effect Index](https://effectindex.com/dosebot).`);

  message.channel.send(embed);
}
