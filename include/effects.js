module.exports.createEffectsList = createEffectsList;
module.exports.createFullEffectListLink = createFullEffectListLink;

function createEffectsList(substance) {
  // const substance = data.substances[0];
  const effects = substance.effects;
  const numberOfEffects = effects.length;
  const randomNumberArray = [];
  const namesUnderscoresRemovedArray = [];

  while (randomNumberArray.length < 10) {
    randomNumberArray.push(Math.floor(Math.random() * numberOfEffects));
  }

  randomNumberArray.forEach(element => {
    namesUnderscoresRemovedArray.push(effects[element].name.replace(/ /g, '_'));
  });

  var messages = [];

  // loops through effects and add their name to the message variable
  for (let i = 0; i < randomNumberArray.length; i++) {
    messages.push(
      `-[${
        effects[randomNumberArray[i]].name
      }](https://psychonautwiki.org/wiki/${namesUnderscoresRemovedArray[i]})`
    );
  }
  return messages.join('\n');
}

function createFullEffectListLink(substance) {
  return `These effects were randomly selected from a larger list - [see all effects](https://psychonautwiki.org/wiki/${
    substance.name
  }#Subjective_effects)`;
}
