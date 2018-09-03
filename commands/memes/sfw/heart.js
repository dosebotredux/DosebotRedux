//Heart message
exports.run = (client, message, args) => {
  console.log(`**********Executing heart on ${message.guild.name}**********`);

  message.channel
    .send(
      ":black_heart::heart:️:heart:️:black_heart::heart::heart::black_heart:\n:heart::purple_heart::yellow_heart::purple_heart::yellow_heart::purple_heart::heart:\n:heart:️:purple_heart::yellow_heart::heart:️:yellow_heart::purple_heart::heart:️\n:black_heart::heart:️:purple_heart::yellow_heart::purple_heart::heart:️:black_heart:\n:black_heart::black_heart::heart:️:purple_heart::heart:️:black_heart::black_heart:\n:black_heart::black_heart::black_heart::heart:️:black_heart::black_heart::black_heart:"
    )
    .catch(console.error);
};
