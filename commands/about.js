const Discord = require("discord.js");

//about message
exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
  .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
  .setColor("747474")
  .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
  .setThumbnail("https://kek.gg/i/svRNH.png")
  .setTimestamp()
  .setImage("https://psychonautwiki.org/w/thumb.php,qf=You_do_not_need_to_understand.gif,awidth=419.pagespeed.ce._yCpj9CanE.gif")
  .setURL("http://www.dosebot.org")
  .addField("Assistance", "Taken drugs or have questions about taking drugs? Concerned or have any questions? Visit the TripSit Chat: <https://chat.tripsit.me/>\nNeed a healthy dose of **good vibes**? Check out the PsychonautWiki Good Vibes page: <https://psychonautwiki.org/wiki/Good_vibe>\nThis Youtube channel is dedicated to sending positive vibes: <https://www.youtube.com/user/TheMeditativeMind>\n**Everything is going to be okay!** You are awesome, everyone here loves, cares, and supports you! **Take long, slow, deep breaths** and focus on each breath in and out!")

  message.channel.send({embed});
};
