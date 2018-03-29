//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  message.channel
  .send(
    "```Available commands: \n --about\n --help \n --tolerance [number of days since last dose] \n --dxmcalc [weight in pounds] \n --info [substance] \n ```"
  )
  .catch(console.error);
};
