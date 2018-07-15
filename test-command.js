const CommandSystem = require("./command-system.js");

const input = process.argv
  .filter(function(x, idx) {
    return idx >= 2;
  })
  .join(" ");

console.log(`Command input: ${input}`);

const catchable = {
  catch: function() {}
};

const client = {};

const message = {
  content: input,
  author: {
    bot: false
  },
  channel: {
    send: function(x) {
      console.log(`channel.send: ${x}`);
      return catchable;
    }
  }
};

const commandSystem = CommandSystem();

commandSystem.load(function() {
  commandSystem.execute(client, message);
});
