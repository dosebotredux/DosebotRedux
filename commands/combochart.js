//tripsit combo chart message
exports.run = (client, message, args) => {
  message.channel
  .send(
    "Drug combination chart: https://wiki.tripsit.me/images/3/3a/Combo_2.png"
  )
  .catch(console.error);
};
