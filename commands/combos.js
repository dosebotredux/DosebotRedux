const Combos = require('../include/combos');
const sanitizeSubstanceName = require('../include/sanitize-substance-name.js');
const rp = require('request-promise');

exports.run = (client, message, args) => {
  const drug = message.content
    .toLowerCase()
    .replace(/^[^\s]+ /, '', -1) // remove first word
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
          const { name, combos } = Combos.pluckQueryResponse(response);
          // Generate the string for the message
          const combosString = Combos.generateEmbedComboString(combos);

          // Send the message
          message.channel.send(Combos.createComboMessage(combosString, name));
        }
      })
      .catch(function(err) {
        console.log(err);
        message.channel.send(
          `Error getting **${drug[0]}** combos from TripSit API`
        );
      });
  }
};
