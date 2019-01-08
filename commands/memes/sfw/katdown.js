// Bootcamp motivation message
exports.run = (client, message, args) => {
  console.log(`**********Executing katdown on ${message.guild.name}**********`);
  const endOfYear = 'January 9 2019 05:45:00 GMT-0800';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  const countdown = getTimeRemaining(endOfYear);

  const channelMessage = `${countdown.days} days, ${countdown.hours} hours, ${
    countdown.minutes
  } minutes, ${
    countdown.seconds
  } seconds until KAT MEETUP! <@371151824331210755>`;

  message.channel.send(channelMessage).catch(console.error);
};
