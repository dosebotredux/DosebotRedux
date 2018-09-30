module.exports.generateDosageField = generateDosageField;
module.exports.generateWarningField = generateWarningField;
module.exports.generateLinksField = generateLinksField;

// Function for calculating dosages
function calculateDosages(weight, isKilos) {
  let weightInLbs;

  if (isKilos) {
    weightInLbs = Math.floor(weight * 2.2);
  } else {
    weightInLbs = weight;
  }

  // kaylee's formula for dxm weight calculation
  const calculatedDoseModifier = 2 * getLog(125, weightInLbs) - 1;

  // Return a dosage object
  return {
    lightMin: Math.floor(100 * calculatedDoseModifier),
    lightMaxCommonMin: Math.floor(200 * calculatedDoseModifier),
    commonMaxStrongMin: Math.floor(400 * calculatedDoseModifier),
    strongMaxHeavy: Math.floor(700 * calculatedDoseModifier)
  };
}

// Function for getting log base 125
function getLog(x, y) {
  return Math.log(y) / Math.log(x);
}

// Function for generating dosage field
function generateDosageField(weight, isKilos) {
  const dosageObject = calculateDosages(weight, isKilos);
  const dosageArray = [];

  if (isKilos) {
    dosageArray.push(`Dosages for: **${weight}kg**\n`);
  } else {
    dosageArray.push(`Dosages for: **${weight}lbs**\n`);
  }

  dosageArray.push(
    `**First plateau**: ${dosageObject.lightMin}-${
      dosageObject.lightMaxCommonMin
    }mg`
  );
  dosageArray.push(
    `**Second plateau**: ${dosageObject.lightMaxCommonMin}-${
      dosageObject.commonMaxStrongMin
    }mg`
  );
  dosageArray.push(
    `**Third plateau**: ${dosageObject.commonMaxStrongMin}-${
      dosageObject.strongMaxHeavy
    }mg`
  );
  dosageArray.push(`**Fourth plateau**: ${dosageObject.strongMaxHeavy}+mg`);

  return dosageArray.join('\n');
}

// Function for generating warning field
function generateWarningField() {
  return `These recommendations are an approximation and are on the lower end for harm reduction purposes, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.`;
}

// Function for generating links field
function generateLinksField() {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/DXM)
  [Tripsit](http://drugs.tripsit.me/dxm)
  [Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)`;
}
