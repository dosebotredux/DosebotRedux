module.exports.generateDosageField = generateDosageField;
module.exports.generateWarningField = generateWarningField;
module.exports.generateLinksField = generateLinksField;

// Function for calculating dosages
function calculateDosages(weight) {
  // kaylee's formula for dxm weight calculation
  const calculatedDoseModifier = 2 * getLog(125, weight) - 1;

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
function generateDosageField(weight) {
  const dosageObject = calculateDosages(weight);
  return `**First plateau**: ${dosageObject.lightMin}-${
    dosageObject.lightMaxCommonMin
  }mg
  **Second plateau**: ${dosageObject.lightMaxCommonMin}-${
  dosageObject.commonMaxStrongMin
}mg
  **Third plateau**: ${dosageObject.commonMaxStrongMin}-${
  dosageObject.strongMaxHeavy
}mg
  **Fourth plateau**: ${dosageObject.strongMaxHeavy}+mg`;
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
