// About message
import Discord from 'discord.js';
import rp from 'request-promise';

import * as Helpers from '../include/helpers.js';

type EffectJsonFormat = {
  effect: {
    summary_raw: string;
    name: string;
    social_media_image: string;
  }
};

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {

  var tokens = message.content.split(' ');
  tokens.shift();
  const effect = tokens.join("-");

  console.log(`effect: ${effect}`);

  // Declare the location of the API URL
  let url = `https://www.effectindex.com/api/effects/${effect}`;

  rp(`${url}`).then(function(body) {
    const effectInfo = JSON.parse(body) as EffectJsonFormat;
    console.log(effectInfo.effect.summary_raw);

    const embed = Helpers.TemplatedMessageEmbed()
      .setImage(createReplicationField(effectInfo))
      .addField(
        `**${createEffectFieldTitle(effectInfo)} summary**`,
        createSummaryField(effectInfo)
      )
      .addField('Links', createLinksField(effect, effectInfo));

    message.channel.send({ embed });
  }).catch(function(err) {
    console.error(err);
    message.channel.send(`Error: ${effect} is not found on Effect Index`);
  });

  function createSummaryField(effectJSON: EffectJsonFormat) {
    return `${effectJSON.effect.summary_raw}`;
  }

  function createEffectFieldTitle(effectJSON: EffectJsonFormat) {
    return `${effectJSON.effect.name}`;
  }

  // Builds the link field
  function createLinksField(effect: string, effectJSON: EffectJsonFormat) {
    const effectURL = `https://www.effectindex.com/effects/${effect}`;

    return `[${effectJSON.effect.name} on Effect Index](${effectURL})`;
  }

  function createReplicationField(effectJSON: EffectJsonFormat) {
    if (effectJSON.effect.social_media_image) {
      console.log('we\'re in the right place');
      const replicationName = effectJSON.effect.social_media_image;

      const replicationURL = `https://www.effectindex.com${replicationName}`;

      return replicationURL;
    } else {
      console.log('we are in the wrong place');
      // Return a blank image if no replicaiton is for as MessageEmbed fields cant be empty
      return 'https://i.imgur.com/3mENLpk.png';
    }
  }
};
