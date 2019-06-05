// About message
const Discord = require('discord.js');
const rp = require('request-promise');

exports.run = (client, message, args) => {

  var tokens = message.content.split(' ');
  tokens.shift();
  const effect = tokens.join("-");

  console.log(`effect: ${effect}`);

  // Declare the location of the API URL
  let url = `https://www.effectindex.com/api/effects/${effect}`;

  rp(`${url}`)
    .then(function(body) {
      const effectInfo = JSON.parse(body);
      console.log(effectInfo.effect.summary_raw);

      const embed = new Discord.RichEmbed()
        .attachFile("./assets/logo.png")
        .setThumbnail('attachment://logo.png')
        .setAuthor('DoseBot Redux', 'attachment://logo.png')
        .setColor('747474')
        .setFooter('Please use drugs responsibly', 'attachment://logo.png')
        .setTimestamp()
        .setURL("https://github.com/dosebotredux")
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

      const replicationURL = `https://www.effectindex.com${replicationName}`;

      return replicationURL;
    } else {
      console.log('we are in the wrong place');
      // Return a blank image if no replicaiton is for as richembed fields cant be empty
      return 'https://i.imgur.com/3mENLpk.png';
    }
  }
};
