const Discord = require('discord.js');

// Function for creating combo message
function createComboMessage(combos, name) {
  return new Discord.RichEmbed()
    .setTitle(`**${name} combo information**`)
    .setAuthor('DoseBot Redux', 'https://i.imgur.com/7R8WDwE.png')
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

module.exports = {
  createComboMessage,
  pluckQueryResponse,
  generateEmbedComboString
};
