// SEI blurb
exports.run = (client, message, args) => {
  console.log(
    `**********Executing geometry on ${message.guild.name}**********`
  );

  message.channel
    .send(
      "So so fast, the sailing ships\nThe outer rim, the innocence\nThe lovely air\nThe wind it breathes\nIt comes\nWhen do you follow, where do you lead?\nWith unclean hand, a fire to feed\nLike the signs of the cosmic\nThe crush of the eyes\nIt's just better in blood like the surest old sun!\n\nhttps://www.youtube.com/watch?v=i4RanjlL7sg"
    )
    .catch(console.error);
};
