//illusion :()
exports.run = (client, message, args) => {
  console.log(`**********Executing illusion on ${message.guild.name}**********`);

  message.channel
  .send(
    "https://www.youtube.com/watch?v=whV-gi9Fb4A\n\nI know it's hard to tell how mixed up you feel\nHoping what you need is behind every door\nEach time you get hurt, I don't want you to change\nBecause everyone has hopes, you're human after all\nThe feeling sometimes, wishing you were someone else\nFeeling as though you never belong\nThis feeling is not sadness, this feeling is not joy\nI truly understand. Please, don't cry now\n\nPlease don't go, I want you to stay\nI'm begging you please, please don't leave here\nI don't want you to hate\nFor all the hurt that you feel\nThe world is just illusion, trying to change you\n\nBeing like you are\nWell this is something else, who would comprehend?\nBut some that do, lay claim\nDivine purpose blesses them\nThat's not what I believe, and it doesn't matter anyway\nA part of your soul ties you to the next world\nOr maybe to the last, but I'm still not sure\nBut what I do know, is to us the world is different\nAs we are to the world but I guess you would know that\n\nPlease don't go, I want you to stay\nI'm begging you please, please don't leave here\nI don't want you to hate for all the hurt that you feel\nThe world is just illusion trying to change you\nPlease don't go, I want you to stay\nI'm begging you please, oh please don't leave here\nI don't want you to change\nFor all the hurt that you feel\nThis world is just illusion, always trying to change you"
  )
  .catch(console.error);
};
