//Kaylee message
exports.run = (client, message, args) => {
  message.channel
  .send(
      "Assistance: Taken drugs or have questions about taking drugs? Concerned or have any questions? Visit the TripSit Chat: https://chat.tripsit.me/\nThis Youtube channel is dedicated to sending positive vibes: https://www.youtube.com/user/TheMeditativeMind\n\nEverything is going to be okay! You are awesome, everyone here loves, cares, and supports you! Take long, slow, deep breaths and focus on each breath in and out!"
  )
  .catch(console.error);
};
