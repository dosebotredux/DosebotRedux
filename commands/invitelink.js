exports.run = (client, message, args) => {
  message.channel
    .send('Want to invite Dosebot Redux to your server? Click this: https://discordapp.com/oauth2/authorize?&client_id=435987984450453505&scope=bot&permissions=268486656')
    .catch(console.error);
}
