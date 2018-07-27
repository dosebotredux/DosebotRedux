// Sends a random Bob Ross video to the channel
exports.run = (client, message, args) => {
  console.log(`**********Executing bobross on ${message.guild.name}**********`);

  // response = `<@${message.author.id}> `;

  // // If someone mentions a person at the end of the bobross command,
  // // make sure those people are mentioned with the response
  // if (!!message.mentions) {
  //   message.mentions.users.forEach(function(user, id) {
  //     response += `<@${id}> `;
  //   });
  // }

  // response += `Enjoy a random episode of The Joy of Painting: <https://mityurl.com/y/cDIn/r>\n`;

  message.channel.send(generateBobRossResponse()).catch(console.error);

  function generateBobRossResponse(message) {
    let response = `<@${message.author.id}> `;

    if (!!message.mentions) {
      message.mentions.user.forEach(function(id) {
        response += `<@${id}> `;
      });

      response += `Enjoy a random episode of The Joy of Painting by Bob Ross: <https://mityurl.com/y/cDIn/r`;
    }
  }
};
