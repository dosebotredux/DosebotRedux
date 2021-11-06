import Discord from 'discord.js';
import rp from 'request-promise';

import { sanitizeSubstanceName } from '../include/sanitize-substance-name';
import * as Helpers from '../include/helpers';

type ApiSubstance = {
  name: string;
  effects: {
    name: string
  }[];
};

function createEffectsList(substance: ApiSubstance) {
  // const substance = data.substances[0];
  const effects = substance.effects;
  const numberOfEffects = effects.length;
  const randomNumberArray = [];
  const namesUnderscoresRemovedArray: string[] = [];

  while (randomNumberArray.length < 10) {
    randomNumberArray.push(Math.floor(Math.random() * numberOfEffects));
  }

  randomNumberArray.forEach(element => {
    namesUnderscoresRemovedArray.push(effects[element].name.replace(/ /g, '_'));
  });

  const messages = [];

  // loops through effects and add their name to the message variable
  for (let i = 0; i < randomNumberArray.length; i++) {
    messages.push( `-[${effects[randomNumberArray[i]].name}](https://psychonautwiki.org/wiki/${namesUnderscoresRemovedArray[i]})`);
  }
  return messages.join('\n');
}

function createFullEffectListLink(substance: ApiSubstance) {
  return `These effects were randomly selected from a larger list - [see all effects](https://psychonautwiki.org/wiki/${ substance.name }#Subjective_effects)`;
}


import effectQuery from '../queries/effects.js';

async function fetchAndParseURL(url: string): Promise<any> {
  try {
    const responseData = await rp(url);

    return JSON.parse(responseData);
  } catch (err) {
    console.error(err);
  }

  return null;
}

async function fetchPWSubstanceData(substanceName: string) {
  const query = effectQuery.effect(substanceName);

  const encodedQuery = encodeURIComponent(query);

  return fetchAndParseURL(`https://api.psychonautwiki.org/?query=${encodedQuery}`);
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
      .addField('Effects (randomly selected)', createEffectsList(substance))
      .addField('More information', createFullEffectListLink(substance));

    message.reply({ embeds: [embed], files: ["./assets/logo.png"] });
  } catch(err) {
    console.error(err);
  }
};
