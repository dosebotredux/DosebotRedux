//Kaylee message
exports.run = (client, message, args) => {
  message.channel
  .send(
      "**Assistance**: Taken drugs or have questions about taking drugs? Concerned or have any questions? Visit the TripSit Chat: <https://chat.tripsit.me/>\n\nNeed a healthy dose of **good vibes?** Check out the PsychonautWiki Good Vibes page: <https://psychonautwiki.org/wiki/Good_vibes>\n\nThis Youtube channel is dedicated to sending positive vibes: <https://www.youtube.com/user/TheMeditativeMind>\n\n**Everything is going to be okay!** You are *awesome*, everyone here loves, cares, and supports you! **Take long, slow, deep breaths** and focus on each breath in and out!"
  )
  .catch(console.error);
};
