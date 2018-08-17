// Sad doris message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing randomUser on ${message.guild.name}**********`
  );

  let users = message.guild.members;

  users.forEach(user => {
    console.log(user.displayName);
  });

  console.log(users);
};
