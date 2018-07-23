// About message
const Discord = require("discord.js");
const rp = require("request-promise");

exports.run = (client, message, args) => {
  console.log(
    `**********Executing betaeffects on ${message.guild.name}**********`
  );

  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content; // --betaeffects acuity enhancement
  var result = str.split(" "); // [--betaeffects, acuity, enhancement]
  var effect = str
    .toLowerCase()
    .replace("--betaeffects ", "", -1)
    .replace(/-/g, "", -1)
    .replace(/ /g, "-", -1); // acuity enhancement

  console.log(`effect: ${effect}`);

  // Declare the location of the API URL
  let url = `https://beta.effectindex.com/api/effects/${effect}`;

  rp(`${url}`)
    .then(function(body) {
      const effectInfo = JSON.parse(body);
      console.log(effectInfo.effect.summary_raw);
    })
    .catch(function(err) {
      console.error(err);
    });

  const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField("Title", "Summary field");

  message.channel.send({ embed });

  function createSummaryField() {}

  function createLinksField() {}

  function createReplicationField() {}
};
