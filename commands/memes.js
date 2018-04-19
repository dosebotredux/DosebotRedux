//displays list of memes. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  message.channel
  .send(
    "```Available memes: \n --catgirl \n --cocoa \n --dong \n --eve \n --frogmodai \n --geometry \n --graham \n --greentea \n --heart \n --josie \n --kaylee \n --kayleetriggered \n --catfeud \n --memes \n --shay \n --uwotm8```"
  )
  .catch(console.error);
};
