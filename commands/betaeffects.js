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

      const embed = new Discord.RichEmbed()
        .setAuthor("DoseBot", "https://i.imgur.com/kE2rWdv.png")
        .setColor("747474")
        .setFooter(
          "Please use drugs responsibly",
          "https://i.imgur.com/kE2rWdv.png"
        )
        .setThumbnail("https://i.imgur.com/kE2rWdv.png")
        .setTimestamp()
        .setURL("http://www.dosebot.org")
        .addField(
          `**${createEffectFieldTitle(effectInfo)} description**`,
          createSummaryField(effectInfo)
        )
        .addField(`Links`, createLinksField());

      message.channel.send({ embed });
    })
    .catch(function(err) {
      console.error(err);

      message.channel.send(`Unknown error has occurred`);
    });

  function createSummaryField(effectJSON) {
    return `${effectJSON.effect.summary_raw}`;
  }

  function createEffectFieldTitle(effectJSON) {
    return `${effectJSON.effect.name}`;
  }

  // Builds the link field
  function createLinksField(effect) {
    const effectURL = `https://beta.effectindex.com/effects/${effect}`;

    return `[Effect Index article](${effectURL})`;
  }

  function createReplicationField() {}
};
