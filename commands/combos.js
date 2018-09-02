const Discord = require('discord.js');
const sanitizeSubstanceName = require('../include/sanitize-substance-name.js');
const rp = require('request-promise');

exports.run = (client, message, args) => {
  console.log(`**********Executing combos on ${message.guild.name}**********`);

  const { request } = require('graphql-request');

  var str = message.content;
  var drug = str
    .toLowerCase()
    .replace('--combos ', '', -1)
    .replace(/-/g, '', -1);

  let drugArr = drug.split(' ');
  console.log(drugArr);
  let tripSitURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${
    drugArr[0]
  }`;

  drugArr[0] = sanitizeSubstanceName(drugArr[0]);

  if (drugArr.length === 1) {
    rp(tripSitURL)
      .then(function(response) {
        let queryResults = JSON.parse(response);
        let name = queryResults.data[0].pretty_name;
        let combos = queryResults.data[0].combos;
        let comboArr = [];

        Object.keys(combos).forEach(key => {
          comboArr.push(`${capitalize(key)}: ${combos[key].status}`);
        });

        comboArr.sort();

        let channelMessage = comboArr.join('\n');
        createComboMessage(channelMessage, message, name);
      })
      .catch(function(err) {
        console.log(err);
        message.channel.send(`Error getting ${drug} combos from TripSit API`);
      });
  } else if (drugArr.length > 1) {
    rp(tripSitURL)
      .then(function(response) {
        let queryResults = JSON.parse(response);
        let name = queryResults.data[0].pretty_name;
        let combos = queryResults.data[0].combos;
        let comboArr = [];
        let keys = Object.keys(combos);

        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === drugArr[1]) {
            comboArr.push(`${capitalize(keys[i])}: ${combos[keys[i]].status}`);
          }
        }

        comboArr.sort();

        let channelMessage = comboArr.join('\n');
        createComboMessage(channelMessage, message, name);
      })
      .catch(function(err) {
        console.log(err);
        message.channel.send(`Error getting ${drug} combos from TripSit API`);
      });
  } else {
    message.channel.send('Error: Tell Cocoa to stop writing spaghetti code');
  }

  //// Functions
  // Create combo message
  function createComboMessage(combos, message, name) {
    const embed = new Discord.RichEmbed()
      .setTitle(`**${name} combo information**`)
      .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
      .setColor('747474')
      .setFooter(
        'Please use drugs responsibly',
        'https://i.imgur.com/7R8WDwE.png'
      )
      .setThumbnail('https://i.imgur.com/7R8WDwE.png')
      .setTimestamp()
      .setURL('http://www.dosebot.org')
      .addField('Combos', combos);

    message.channel.send({ embed });
  }

  // Capitalization function
  function capitalize(name) {
    return name.toUpperCase();
  }
};
