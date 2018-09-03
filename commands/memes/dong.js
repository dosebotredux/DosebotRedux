// Displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  console.log(`**********Executing dong on ${message.guild.name}**********`);

  // Sends the dong meme
  message.channel
    .send("ヽ༼ຈل͜ຈ༽ﾉ raise your dongers ヽ༼ຈل͜ຈ༽ﾉ")
    .catch(console.error);
};
