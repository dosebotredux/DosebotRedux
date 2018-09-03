// About message
const Discord = require('discord.js');
const rp = require('request-promise');

exports.run = (client, message, args) => {
  console.log(
    `**********Executing effectinfo on ${message.guild.name}**********`
  );

  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content; // --betaeffects acuity enhancement
  var result = str.split(' '); // [--betaeffects, acuity, enhancement]
  var effect = str
    .toLowerCase()
    .replace('--effectinfo ', '', -1)
    .replace(/-/g, '', -1)
    .replace(/ /g, '-', -1); // acuity enhancement

  console.log(`effect: ${effect}`);

  // Declare the location of the API URL
  let url = `https://www.effectindex.com/api/effects/${effect}`;

  rp(`${url}`)
    .then(function(body) {
      const effectInfo = JSON.parse(body);
      console.log(effectInfo.effect.summary_raw);

      const embed = new Discord.RichEmbed()
        .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
        .setColor('747474')
        .setFooter(
          'Please use drugs responsibly',
          'https://i.imgur.com/7R8WDwE.png'
        )
        .setThumbnail('https://i.imgur.com/7R8WDwE.png')
        .setTimestamp()
        .setURL('http://www.dosebot.org')
        .setImage(createReplicationField(effectInfo))
        .addField(
          `**${createEffectFieldTitle(effectInfo)} summary**`,
          createSummaryField(effectInfo)
        )
        .addField('Links', createLinksField(effect, effectInfo));

      message.channel.send({ embed });
    })
    .catch(function(err) {
      console.error(err);

      message.channel.send(`Error: ${effect} is not found on Effect Index`);
    });

  function createSummaryField(effectJSON) {
    return `${effectJSON.effect.summary_raw}`;
  }

  function createEffectFieldTitle(effectJSON) {
    return `${effectJSON.effect.name}`;
  }

  // Builds the link field
  function createLinksField(effect, effectJSON) {
    const effectURL = `https://www.effectindex.com/effects/${effect}`;

    return `[${effectJSON.effect.name} on Effect Index](${effectURL})`;
  }

  function createReplicationField(effectJSON) {
    if (effectJSON.effect.social_media_image) {
      console.log('we\'re in the right place');
      const replicationName = effectJSON.effect.social_media_image;

      const replicationURL = `https://www.effectindex.com/img/gallery/${replicationName}`;

      return replicationURL;
    } else {
      console.log('we are in the wrong place');
      // Return a blank image if no replicaiton is for as richembed fields cant be empty
      return 'https://i.imgur.com/3mENLpk.png';
    }
  }
};
