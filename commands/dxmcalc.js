//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
//fix this so it sends all in one block instead of a separate messages
exports.run = (client, message, args) => {
    var str = message.content;
    var result = str.split(" ");

    message.channel.send("DoseBot recommends:").catch(console.error);

    message.channel.send(
      parseFloat(result[result.length - 1]) * 0.8 +
        "mg to " +
        parseFloat(result[result.length - 1]) * 1.2 +
        "mg of DXM for 1st Plateau"
    ).catch(console.error);

    message.channel.send(
      parseFloat(result[result.length - 1]) * 1.75 +
        "mg to " +
        parseFloat(result[result.length - 1]) * 3.15 +
        "mg of DXM for 2nd Plateau"
    ).catch(console.error);

    message.channel.send(
      parseFloat(result[result.length - 1]) * 3.5 +
        "mg to " +
        parseFloat(result[result.length - 1]) * 6.6 +
        "mg of DXM for 3rd Plateau"
    ).catch(console.error);

    message.channel.send(
      parseFloat(result[result.length - 1]) * 6.6 +
        "mg to " +
        parseFloat(result[result.length - 1]) * 10 +
        "mg of DXM for 4th Plateau\n**Warning: Doses exceeding 1500mg are dangerous and even an experienced user should not consider them to be safe.**"
    ).catch(console.error);
  }