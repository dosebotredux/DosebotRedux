//Josie message
exports.run = (client, message, args) => {
  message.channel.send("DoseBot automatically sources dosage, duration, tolerance, and harm reduction information from <http://www.psychonautwiki.org> and <https://effectindex.com>\n\nIt was created by <@278301453620084736>, <@295422447887450114>, and <@249800037050220545> with the goal of raising awareness of harm reduction best practices, as well as the Subjective Effect Index\n\nFor a complete list of commands type '--help'\n\nFor more information see <https://effectindex.com/dosebot>").catch(console.error);
}