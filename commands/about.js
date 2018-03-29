//Josie message
exports.run = (client, message, args) => {
  message.channel
  .send(
    "DoseBot automatically sources dosage, duration, tolerance, and harm reduction information from <http://www.psychonautwiki.org> and <https://effectindex.com>.\n\nIt was created by <@278301453620084736>, <@295422447887450114>, and <@249800037050220545> with the goal of raising awareness of harm reduction best practices, as well as the Subjective Effect Index. Based on KGB by Stas Constantine\n\nFor a complete list of commands type '--help'.\n\nFor more information see <https://effectindex.com/dosebot> or join the Subjective Effect Documentation discord server at <https://discord.gg/2J5XBfX>."
  )
  .catch(console.error);
};
