import Discord from 'discord.js';
import rp from 'request-promise';

import sanitizeSubstanceName from '../include/sanitize-substance-name.js';
import Effects from '../include/effects.js';
import Helpers from '../helpers.js';

import effectQuery from '../queries/effects.js';

const fetchAndParseURL = async (url: string) => {
  try {
    const responseData = await rp(url);

    return JSON.parse(responseData);
  } catch (err) {
    console.error(err);
  }

  return null;
}

const fetchPWSubstanceData = async (substanceName: string) => {
  const query = effectQuery.effect(substanceName);

  const encodedQuery = encodeURIComponent(query);

  return fetchAndParseURL(
    `https://api.psychonautwiki.org/?query=${encodedQuery}`
  );
}

export async function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  const str = message.content;
  // Removes all symbols and puts everything in lower case so bot finds the images easier
  let substanceName = str
    .toLowerCase()
    .replace(/^[^\s]+ /, '') // remove first word
    .replace(/-/g, '',)
    .replace(/ /g, '');

  substanceName = sanitizeSubstanceName(substanceName);

  try {
    const { data } = await fetchPWSubstanceData(substanceName);

    console.log(data); // SHOW ME WHAT YOU GOT

    if (data.substances.length == 0) {
      message.channel
        .send(`There are no substances matching \`${substanceName}\` on PsychonautWiki.`)
        .catch(console.error);
      return;
    }

    if (data.substances.length > 1) {
      message.channel
        .send(`There are multiple substances matching \`${substanceName}\` on PsychonautWiki.`)
        .catch(console.error);
      return;
    }

    const substance = data.substances[0];

    const embed = Helpers.TemplatedMessageEmbed()
      .setTitle(`${substance.name} effect information`)
      .addField(
        'Effects (randomly selected)',
        Effects.createEffectsList(substance)
      )
      .addField(
        'More information',
        Effects.createFullEffectListLink(substance)
      );

    message.channel.send({ embed }).catch(console.error);
  } catch(err) {
    console.error(err);
  }
};
