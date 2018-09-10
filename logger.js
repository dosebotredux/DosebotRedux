module.exports = function Logger() {
  return {
    execute: function(client, message) {
      if (message.guild.id === '332288651394547712' && !message.author.bot) {
        const servers = client.guilds;
        const loggingServer = servers.find(server => {
          return server.id === '469206008078663691';
        });
        const loggingChannel = loggingServer.channels.find(channel => {
          return channel.id === '488796522692083713';
        });

        const author = message.author.username;
        const messageContent = message.content;
        const channelName = message.channel.name;
        const loggedMessage = `Channel: ${channelName}
        Author: ${author}
        Message: ${messageContent}`;

        loggingChannel.send(loggedMessage);
      }
    }
  };
};
