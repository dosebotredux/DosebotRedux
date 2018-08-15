const mongoose = require("mongoose");
// add quote
exports.run = (client, message, args) => {
  console.log(`**********Executing heart on ${message.guild.name}**********`);

  db.on("error", console.error.bind(console, "connection error:"));
  // db.once("open", function() {
  //   console.log(`Connected to database`);
  //   let quoteSchema = new mongoose.Schema({
  //     quote: String,
  //     author: String
  //   });
  //   let Quote = mongoose.model("quotes", quoteSchema);

  //   let quoteToAdd = new Quote({
  //     quote: "Test",
  //     author: "Bob"
  //   });

  //   quoteToAdd.save(function(err, quoteToAdd) {
  //     if (err) return console.error(err);
  //   });
  // });
};
