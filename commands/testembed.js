const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Test embed")
  .setAuthor("DoseBot", "http://www.dosebot.org/images/dose.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("ea125e")
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("Please use drugs responsiblty", "http://www.dosebot.org/images/dose.png")
  .setImage("http://www.dosebot.org/images/dose.png")
  .setThumbnail("http://www.dosebot.org/images/dose.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("This is a field title, it can hold 256 characters",
    "This is a field value, it can hold 2048 characters.")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Inline Field", "They can also be inline.", true)
  /*
   * Blank field, useful to create some space.
   */
  .addBlankField(true)
  .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

  message.channel.send({embed});
};
