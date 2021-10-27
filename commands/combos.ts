import Discord from 'discord.js';
import rp from 'request-promise';

import * as Combos from '../include/combos';
import { sanitizeSubstanceName } from '../include/sanitize-substance-name.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  const drug = message.content
    .toLowerCase()
    .replace(/^[^\s]+ /, '') // remove first word
    .replace(/-/g, '')
    .split(' ');

  drug[0] = sanitizeSubstanceName(drug[0]);

  const tripSitAPIURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${drug[0]}`;

  if (drug.length === 1) {
    rp(tripSitAPIURL).then(function(response) {
      // If we have an error send the error to the channel
      if (response.err === true) {
        message.channel.send(`Error fetching combos from TripSit: ${response.data.msg}`);
        return;
      } else {
        // Pluck what we need from the response
        const { name, combos } = Combos.pluckQueryResponse(response);
        // Generate the string for the message
        const combosString = Combos.generateEmbedComboString(combos);

        // Send the message
        message.channel.send(Combos.createComboMessage(combosString, name));
      }
    }).catch(function(err) {
      console.log(err);
      message.channel.send(`Error getting **${drug[0]}** combos from TripSit API`);
    });
  }
};
