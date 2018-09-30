const Discord = require('discord.js');
const sanitizeSubstanceName = require('../../include/sanitize-substance-name.js');
const rp = require('request-promise');

exports.run = (client, message, args) => {
  const drug = message.content
    .toLowerCase()
    .replace('--testc ', '', -1)
    .replace(/-/g, '', -1)
    .split(' ');

  drug[0] = sanitizeSubstanceName(drug[0]);

  const tripSitAPIURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${
    drug[0]
  }`;

  if (drug.length === 1) {
    rp(tripSitAPIURL)
      .then(function(response) {
        // If we have an error send the error to the channel
        if (response.err === true) {
          message.channel.send(
            `Error fetching combos from TripSit: ${response.data.msg}`
          );
          return;
        } else {
          // Pluck what we need from the response
          const { name, combos } = pluckQueryResponse(response);
          // Generate the string for the message
          const combosString = generateEmbedComboString(combos);

          // Send the message
          message.channel.send(createComboMessage(combosString, name));
        }
      })
      .catch(function(err) {
        console.log(err);
        message.channel.send(
          `Error getting ${drug[0]} combos from TripSit API`
        );
      });
  }
};

// Function for creating combo message
function createComboMessage(combos, name) {
  return new Discord.RichEmbed()
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
}

// Function for extracting combo information from query response
function pluckQueryResponse(response) {
  console.log(response);
  // Extract data
  const queryResults = JSON.parse(response);
  const name = queryResults.data[0].pretty_name;
  const combos = queryResults.data[0].combos;

  // Return object with needed data
  return { name, combos };
}

// Function for creating combo string for embed
function generateEmbedComboString(combosObject) {
  const comboArr = [];

  // Loop through the combos object and push the formatted combo to the comboArr
  for (const combo in combosObject) {
    if (combosObject.hasOwnProperty(combo)) {
      const element = combosObject[combo];
      const substanceCombo = `${capitalize(combo)}: ${element.status}`;

      comboArr.push(substanceCombo);
    }
  }
  // Sort and return it
  return comboArr.sort().join('\n');
}

// Function for capitalizing
function capitalize(name) {
  return name.toUpperCase();
}
