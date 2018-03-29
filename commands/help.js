//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  message.channel
  .send(
    "```Available commands: \n --about\n --help \n --tolerance [number of days since last dose] \n --info [substance]```"
  )
  .catch(console.error);
};
