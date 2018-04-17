//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  message.channel
  .send(
    "```Available commands: \n --about\n --help \n --psytolerance [number of days since last dose] \n --info [substance]\n --effects [substance]\n --effectinfo [effect] \n --randomeffect \n --dxmcalc [weight in pounds]```"
  )
  .catch(console.error);
};
