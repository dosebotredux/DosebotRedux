// Usage --tolerance [days since last trip]. calculates tolerance/extra dose needed to achieve normal effects
exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var x = parseFloat(result[result.length - 1]);
  var y = Math.pow(x - 14, 4) / 150 + (20 - (x / 14) * 20) + 100;

  // If < 14 days perform calculations, if greater then return no tolerance
  if (x <= 14) {
    if (x < 3) {
      // If days since last dose would give a very high calculated dose return a warning
      message.channel
        .send(
          "Take approximately **" +
            Math.ceil(y / 10) * 10 +
            "%** of the drug to reach full effects.\nWarning: Negative effects may be amplified with a high dose of a psychedelic.\n\nhttp://i47.tinypic.com/2qvcw79.jpg"
        )
        .catch(console.error);
    } else {
      message.channel
        .send(
          "Take approximately " +
            Math.ceil(y / 10) * 10 +
            "% of the drug to reach full effects.\n\nhttp://i47.tinypic.com/2qvcw79.jpg"
        )
        .catch(console.error);
    }
  } else {
    message.channel
      .send(
        "You should not have a tolerance, take 100% of desired dosage.\n\nhttp://i47.tinypic.com/2qvcw79.jpg"
      )
      .catch(console.error);
  }
};
