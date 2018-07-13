// Sends a random trippy video to the channel
exports.run = (client, message, args) => {
  console.log(`**********Executing video on ${message.guild.name}**********`);

  response = `<@${message.author.id}> `

  // If someone mentions a person at the end of the bobross command,
  // make sure those people are mentioned with the response
  if (!!message.mentions) {
    message.mentions.users.forEach(function(user,id) {
      response += `<@${id}> `
    })
  }

  response += `Enjoy a random trippy video: <http://mityurl.com/y/VuLy/r>\n`

  message.channel.send(response).catch(console.error);
}
