exports.run = (client, message, args) => {
  console.log(
    `**********Executing fourthdimension on ${message.guild.name}**********`
  );

  message.channel
    .send(
      "_Either there's a purpose or I'm headed out at breakfast.\nTake a drink. Take a drag.\nOne more coffee. Ugly hat.\nNo more mirrors. Woolen bag.\nAnd I am gone._"
    )
    .catch(console.error);
};
