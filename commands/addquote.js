const mongoose = require("mongoose");
// add quote
exports.run = (client, message, args) => {
  console.log(`**********Executing heart on ${message.guild.name}**********`);

  mongoose.connect(
    `mongodb://${process.env.MONGO_DB_USER}:${
      process.env.MONGO_DB_PASS
    }@ds121282.mlab.com:21282/dosebot_quotes`
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log(`Connected to database`);
    let quoteSchema = new mongoose.Schema({
      quote: String,
      author: String
    });
    let Quote = mongoose.model("quotes", quoteSchema);

    let quoteToAdd = new Quote({
      quote: "Test",
      author: "Bob"
    });

    quoteToAdd.save(function(err, quoteToAdd) {
      if (err) return console.error(err);
    });
  });
};
