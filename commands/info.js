//the big enchilada
//!!!refactor in progress!!!
//tested with --info lsd, --info dmt, --info salvia

exports.run = (client, message, args) => {
  const { request } = require("graphql-request");
  
  var str = message.content;
  var result = str.split(" ");
  var _drug = str
  .toLowerCase()
  .replace("--info ", "", -1)
  .replace(/-/g, "", -1)
  .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  
  // Temporary hardcoded solution to dxm/dph problem
  if (_drug === "dxm") {
    _drug = "dextromethorphan";
  }
  if (_drug === "dph") {
    _drug = "diphenhydramine";
  }
  if (_drug === "3meopcp") {
    _drug = "3-meo-pcp"
  }
  if (_drug === "3meopce") {
    _drug = "3-meo-pce"
  }
  if (_drug === "ghb") {
    _drug = "GHB"
  }
  
  if (_drug != undefined) {
    console.log(_drug);
    
    // loads graphql query from separate file as "query" variable
    var query = require("../queries/info.js").info(_drug);
    
    console.log(query);
    
    let substanceRequest = function(data) {
      return request("https://api.psychonautwiki.org", query).then(data => {
      return data;
    });
  };
  
  let results = substanceRequest();
  
  console.log(results); // Promise { <pending> }
  
  results
  .then(function(data) {
    console.log(data.substances); //will log results.
    
    var substance = data.substances[0];
    
    //now that we've grabbed the substance object, we can dissect further
    var roas = substance.roas;
    console.log(roas);
    
    //roa = "preferred roa"
    //right now we grab first roa as the roa to display
    //in future, maybe use a "preferred roas" json file with mapped substance names => roa
    //also future, needs to be workable via a subsection command (--dosage sublingual lsd, --dosage oral lsd)
    var roa = roas[0];
    
    //this block cobbles together the dosage information section
    //first check if there is dosage information for first (eventually preferred!!!) roa
    //required, some substances (salvia for example) return null for dose object
    if (roa.dose) {
      var dosage_message = buildDosageMessage(substance);
    }
    
    //this block cobbles together the duration information section
    //first check if there is duration information for (eventually preferred!!!) roa
    //required, some substances (salvia for example) return null for duration object
    
    //fill out tolerance section if tolerance exists
    if (substance.tolerance) {
      var tolerance_message = buildToleranceMessage(substance);
    } else {
      var tolerance_message = "";
    }
    
    //HERE'S WHERE ALL THE MAGIC COMES TOGETHER
    if (dosage_message != undefined) {
      var channel_message =
      "**" +
      substance.name +
      " information**\n\n" +
      // // These are broken in the API
      // "**Psychoactive class: **" +
      // "insert psychoactive class\n" +
      // "**Chemical class: **\n\n" +
      dosage_message +
      "\n**Addiction potential: **\n```\n" +
      substance.addictionPotential +
      "```\n" +
      tolerance_message;
    } else {
      var channel_message = "Error " + console.error;
    }
    
    //print output to channel (and also console)
    // console.log(channel_message);
    // console.log(dosage_message_2);
    // console.log(substance.roas.length);
    // console.log(substance.roas);
    
    message.channel.send(channel_message).catch(console.error);
    
    // DXM calculator message
    if (message.content.toLowerCase().includes("dxm")) {
      message.channel
      .send("To calculate DXM dose:\n```-dxmcalc [weight in pounds]```")
      .catch(console.error);
    }
    
    if (!isNaN(_drug.charAt(0))) {
      pw_drug = _drug
      .toUpperCase()
      .replace(/ACO/g, "-AcO-")
      .replace(/MEO/g, "-MeO-");
    } else {
      pw_drug = _drug.charAt(0).toUpperCase() + _drug.slice(1);
    }
    
    if (pw_drug.length == 3) pw_drug = pw_drug.toUpperCase();
    
    if (pw_drug == "Dipt") pw_drug = "DiPT";
    if (pw_drug == "Moxy") pw_drug = "5-MeO-MiPT";
    if (pw_drug == "Molly") pw_drug = "MDMA";
    if (pw_drug == "Mdma") pw_drug = "MDMA";
    
    message.channel
    .send(
      "More information: <https://psychonautwiki.org/wiki/" +
      pw_drug +
      ">"
    )
    .catch(console.error); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
  })
  .catch(function(error) {
    console.log("promise reected/errored out");
    console.log(error);
  });
}
};

// Functions
function buildToleranceMessage(substance) {
  var tolerance_message =
  "**Tolerance**```\n" +
  "Full: " +
  substance.tolerance.full +
  "\n" +
  "Half: " +
  substance.tolerance.half +
  "\n" +
  "Baseline: " +
  substance.tolerance.zero +
  "```";
  
  return tolerance_message;
}
function buildDosageMessage(substance) {
  var dosageMessageArray = [];
  
  for (let i = 0; i < substance.roas.length; i++) {
    dosageMessageArray[i] = substance.roas[i];
  }
  // console.log(dosageMessageArray);
  
  var dosageMessage = "";
  console.log(dosageMessageArray);
  // if (dosageMessageArray[0].dose.heavy) {
  //   dosageMessage += dosageMessageArray[0].dose.heavy;
  // }
  
  for (let i = 0; i < dosageMessageArray.length; i++) {
    var dosageUnit = dosageMessageArray[i].dose.units;
    var thresholdDosage = dosageMessageArray[i].dose.threshold;
    var lightDosage = dosageMessageArray[i].dose.light;
    var commonDosage = dosageMessageArray[i].dose.common;
    var strongDosage = dosageMessageArray[i].dose.strong;
    var heavyDosage = dosageMessageArray[i].dose.heavy;
    if (i > 0) {
      dosageMessage += "\n";
    }
    if (dosageMessageArray[i].name) {
      dosageMessage += "**Dosage** (" + dosageMessageArray[i].name + ")\n";
    }
    if (!!thresholdDosage) {
      // has heavy dosage information
      if (typeof thresholdDosage == "number") {
        dosageMessage += `Heavy: ${thresholdDosage}${dosageUnit}\n\n`
      } else {
        dosageMessage += `Heavy: ${thresholdDosage.min} - ${thresholdDosage.max}${dosageUnit}\n\n`
      }
    } else {
      dosageMessage += "No heavy dose information\n\n"
    }
    // Light
    if (!!lightDosage) {
      // has heavy dosage information
      if (typeof lightDosage == "number") {
        dosageMessage += `Heavy: ${lightDosage}${dosageUnit}\n\n`
      } else {
        dosageMessage += `Heavy: ${lightDosage.min} - ${lightDosage.max}${dosageUnit}\n\n`
      }
    } else {
      dosageMessage += "No heavy dose information\n\n"
    }
    // Common
    if (!!commonDosage) {
      // has heavy dosage information
      if (typeof commonDosage == "number") {
        dosageMessage += `Heavy: ${commonDosage}${dosageUnit}\n\n`
      } else {
        dosageMessage += `Heavy: ${commonDosage.min} - ${commonDosage.max}${dosageUnit}\n\n`
      }
    } else {
      dosageMessage += "No heavy dose information\n\n"
    }
    // Strong
    if (!!strongDosage) {
      // has heavy dosage information
      if (typeof strongDosage == "number") {
        dosageMessage += `Heavy: ${strongDosage}${dosageUnit}\n\n`
      } else {
        dosageMessage += `Heavy: ${strongDosage.min} - ${strongDosage.max}${dosageUnit}\n\n`
      }
    } else {
      dosageMessage += "No heavy dose information\n\n"
    }
    // Heavy
    if (!!heavyDosage) {
      // has heavy dosage information
      if (typeof heavyDosage == "number") {
        dosageMessage += `Heavy: ${heavyDosage}${dosageUnit}\n\n`
      } else {
        dosageMessage += `Heavy: ${heavyDosage.min} - ${heavyDosage.max}${dosageUnit}\n\n`
      }
    } else {
      dosageMessage += "No heavy dose information\n\n"
    }
    // if (dosageMessageArray[i].dose.threshold) {
    //   console.log(1);
    //   dosageMessage +=
    //   "```\nThreshold: " +
    //   dosageMessageArray[i].dose.threshold +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // } else {
    //   console.log(2);
    //   dosageMessage += "```\n";
    // }
    // if (dosageMessageArray[i].dose.light.min) {
    //   console.log(3);
    //   dosageMessage +=
    //   "Light: " +
    //   dosageMessageArray[i].dose.light.min +
    //   "-" +
    //   dosageMessageArray[i].dose.light.max +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // } else if (dosageMessageArray[i].dose.light) {
    //   console.log(4);
    //   dosageMessage +=
    //   "Light: " +
    //   dosageMessageArray[i].dose.light +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].dose.common.min) {
    //   console.log(5);
    //   dosageMessage +=
    //   "Common: " +
    //   dosageMessageArray[i].dose.common.min +
    //   "-" +
    //   dosageMessageArray[i].dose.common.max +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // } else if (dosageMessageArray[i].dose.common) {
    //   console.log(6);
    //   dosageMessage +=
    //   "Common: " +
    //   dosageMessageArray[i].dose.common +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].dose.strong.min) {
    //   console.log(7);
    //   dosageMessage +=
    //   "Strong: " +
    //   dosageMessageArray[i].dose.strong.min +
    //   "-" +
    //   dosageMessageArray[i].dose.strong.max +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // } else if (dosageMessageArray[i].dose.strong) {
    //   console.log(8);
    //   dosageMessage +=
    //   "Strong: " +
    //   dosageMessageArray[i].dose.strong +
    //   dosageMessageArray[i].dose.units +
    //   "\n";
    // }
    // if (!!dosageMessageArray[i].dose.heavy) {
    //   console.log(9);
    //   dosageMessage +=
    //   "Heavy: " +
    //   dosageMessageArray[i].dose.heavy.min +
    //   "-" +
    //   dosageMessageArray[i].dose.heavy.max +
    //   dosageMessageArray[i].dose.units +
    //   "\n```\n";
    // } else if (dosageMessageArray[i].dose.heavy) {
    //   console.log(10);
    //   dosageMessage +=
    //   "Heavy: " +
    //   dosageMessageArray[i].dose.heavy +
    //   dosageMessageArray[i].dose.units +
    //   "\n```\n";
    // }
    // Duration
    // dosageMessage += "**Duration** (" + dosageMessageArray[i].name + ")\n```";
    
    // if (dosageMessageArray[i].duration.total.min) {
    //   console.log(11);
    //   dosageMessage +=
    //   "Total: " +
    //   dosageMessageArray[i].duration.total.min +
    //   "-" +
    //   dosageMessageArray[i].duration.total.max +
    //   " " +
    //   dosageMessageArray[i].duration.total.units +
    //   "\n";
    // } else if (dosageMessageArray[i].duration.total) {
    //   dosageMessage +=
    //   "Total: " +
    //   dosageMessageArray[i].duration.total +
    //   " " +
    //   dosageMessageArray[i].duration.total.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].duration.onset.min) {
    //   dosageMessage +=
    //   "Onset: " +
    //   dosageMessageArray[i].duration.onset.min +
    //   "-" +
    //   dosageMessageArray[i].duration.onset.max +
    //   " " +
    //   dosageMessageArray[i].duration.onset.units +
    //   "\n";
    // } else if (dosageMessageArray[i].duration.onset) {
    //   dosageMessage +=
    //   "Onset: " +
    //   dosageMessageArray[i].duration.onset +
    //   " " +
    //   dosageMessageArray[i].duration.onset.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].duration.comeup.min) {
    //   dosageMessage +=
    //   "Comeup: " +
    //   dosageMessageArray[i].duration.comeup.min +
    //   "-" +
    //   dosageMessageArray[i].duration.comeup.max +
    //   " " +
    //   dosageMessageArray[i].duration.comeup.units +
    //   "\n";
    // } else if (dosageMessageArray[i].duration.comeup) {
    //   dosageMessage +=
    //   "Comeup: " +
    //   dosageMessageArray[i].duration.comeup +
    //   " " +
    //   dosageMessageArray[i].duration.comeup.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].duration.peak.min) {
    //   dosageMessage +=
    //   "Peak: " +
    //   dosageMessageArray[i].duration.peak.min +
    //   "-" +
    //   dosageMessageArray[i].duration.peak.max +
    //   " " +
    //   dosageMessageArray[i].duration.peak.units +
    //   "\n";
    // } else if (dosageMessageArray[i].duration.peak) {
    //   dosageMessage +=
    //   "Peak: " +
    //   dosageMessageArray[i].duration.peak +
    //   " " +
    //   dosageMessageArray[i].duration.peak.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].duration.offset.min) {
    //   dosageMessage +=
    //   "Offset: " +
    //   dosageMessageArray[i].duration.offset.min +
    //   "-" +
    //   dosageMessageArray[i].duration.offset.max +
    //   " " +
    //   dosageMessageArray[i].duration.offset.units +
    //   "\n";
    // } else if (dosageMessageArray[i].duration.offset) {
    //   dosageMessage +=
    //   "Offset: " +
    //   dosageMessageArray[i].duration.offset +
    //   " " +
    //   dosageMessageArray[i].duration.offset.units +
    //   "\n";
    // }
    // if (dosageMessageArray[i].duration.afterglow.min) {
    //   dosageMessage +=
    //   "Afterglow: " +
    //   dosageMessageArray[i].duration.afterglow.min +
    //   "-" +
    //   dosageMessageArray[i].duration.afterglow.max +
    //   " " +
    //   dosageMessageArray[i].duration.afterglow.units +
    //   "\n```";
    // } else if (dosageMessageArray[i].duration.afterglow) {
    //   dosageMessage +=
    //   "Afterglow: " +
    //   dosageMessageArray[i].duration.afterglow +
    //   " " +
    //   dosageMessageArray[i].duration.afterglow.units +
    //   "\n```";
    // }
  }
  console.log(dosageMessage);
  return dosageMessage;
}
