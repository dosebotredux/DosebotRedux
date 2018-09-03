exports.run = (client, message, args) => {
  console.log(`**********Executing effects on ${message.guild.name}**********`);
  // Modules
  const Discord = require('discord.js');
  const sanitizeSubstanceName = require('../../include/sanitize-substance-name.js');
  const Effects = require('../../include/effects.js');

  const { request } = require('graphql-request');

  const str = message.content;
  // Removes all symbols and puts everything in lower case so bot finds the images easier
  const drug = str
    .toLowerCase()
    .replace('--effects ', '', -1)
    .replace(/-/g, '', -1)
    .replace(/ /g, '', -1);
  drug = sanitizeSubstanceName(drug);

  // loads graphql query from separate file as "query" variable
  const query = require('../../queries/effects.js').effect(drug);

  request('https://api.psychonautwiki.org', query)
    .then(data => {
      console.log(data); // SHOW ME WHAT YOU GOT

      if (data.substances.length == 0) {
        message.channel
          .send(
            `There are no substances matching \`${drug}\` on PsychonautWiki.`
          )
          .catch(console.error);
        return;
      }

      if (data.substances.length > 1) {
        message.channel
          .send(
            `There are multiple substances matching \`${drug}\` on PsychonautWiki.`
          )
          .catch(console.error);
        return;
      }
      const substance = data.substances[0];

      const embed = new Discord.RichEmbed()
        .setTitle(`${substance.name} effect information`)
        .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
        .setColor('747474')
        .setFooter(
          'Please use drugs responsibly',
          'https://i.imgur.com/7R8WDwE.png'
        )
        .setThumbnail('https://i.imgur.com/7R8WDwE.png')
        .setTimestamp()
        .setURL('http://www.dosebot.org')
        .addField(
          'Effects (randomly selected)',
          Effects.createEffectsList(substance)
        )
        .addField(
          'More information',
          Effects.createFullEffectListLink(substance)
        );

      message.channel.send({ embed }).catch(console.error);
    })
    .catch(console.log);
};
