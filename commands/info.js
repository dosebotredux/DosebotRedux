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
    _drug = "3-meo-pcp";
  }
  if (_drug === "3meopce") {
    _drug = "3-meo-pce";
  }
  if (_drug === "ghb") {
    _drug = "GHB";
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
      "**Addiction potential: **\n```\n" +
      substance.addictionPotential +
      "```" +
      tolerance_message;
    } else {
      var channel_message = "Error " + console.error;
    }
    
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
    // Dosage variables
    var dosageUnit = dosageMessageArray[i].dose.units;
    var thresholdDosage = dosageMessageArray[i].dose.threshold;
    var lightDosage = dosageMessageArray[i].dose.light;
    var commonDosage = dosageMessageArray[i].dose.common;
    var strongDosage = dosageMessageArray[i].dose.strong;
    var heavyDosage = dosageMessageArray[i].dose.heavy;
    
    // Dosage message
    // Add dosage + name
    if (dosageMessageArray[i].name) {
      dosageMessage += "**Dosage** (" + dosageMessageArray[i].name + ")\n```";
    }
    if (!!thresholdDosage) {
      // has threshold dosage information
      if (typeof thresholdDosage == "number") {
        dosageMessage += `Threshold: ${thresholdDosage}${dosageUnit}\n`;
      } else {
        dosageMessage += `Threshold: ${thresholdDosage.min} - ${
          thresholdDosage.max
        }${dosageUnit}\n`;
      }
    } else {
      dosageMessage += "No threshold dose information\n";
    }
    // Light
    if (!!lightDosage) {
      // has light dosage information
      if (typeof lightDosage == "number") {
        dosageMessage += `Light: ${lightDosage}${dosageUnit}\n`;
      } else {
        dosageMessage += `Light: ${lightDosage.min} - ${
          lightDosage.max
        }${dosageUnit}\n`;
      }
    } else {
      dosageMessage += "No light dose information\n";
    }
    // Common
    if (!!commonDosage) {
      // has common dosage information
      if (typeof commonDosage == "number") {
        dosageMessage += `Common: ${commonDosage}${dosageUnit}\n`;
      } else {
        dosageMessage += `Common: ${commonDosage.min} - ${
          commonDosage.max
        }${dosageUnit}\n`;
      }
    } else {
      dosageMessage += "No common dose information\n";
    }
    // Strong
    if (!!strongDosage) {
      // has strong dosage information
      if (typeof strongDosage == "number") {
        dosageMessage += `Strong: ${strongDosage}${dosageUnit}\n`;
      } else {
        dosageMessage += `Strong: ${strongDosage.min} - ${
          strongDosage.max
        }${dosageUnit}\n`;
      }
    } else {
      dosageMessage += "No strong dose information\n";
    }
    // Heavy
    if (!!heavyDosage) {
      // has heavy dosage information
      if (typeof heavyDosage == "number") {
        dosageMessage += `Heavy: ${heavyDosage}${dosageUnit}\n\`\`\``;
      } else {
        dosageMessage += `Heavy: ${heavyDosage.min} - ${
          heavyDosage.max
        }${dosageUnit}\n\`\`\``;
      }
    } else {
      dosageMessage += "No heavy dose information\n```";
    }
    // Duration
    var duration = dosageMessageArray[i].duration;
    
    // Duration message
    // If duration isn't null
    if (!!duration) {
      dosageMessage +=
      "**Duration** (" + dosageMessageArray[i].name + ")" + "```";
      // Onset
      if (!!duration.onset) {
        dosageMessage += `Onset: ${duration.onset.min} - ${
          duration.onset.max
        } ${duration.onset.units}\n`;
      } else {
        dosageMessage += "No onset information.\n";
      }
      // Comeup
      if (!!duration.comeup) {
        dosageMessage += `Comeup: ${duration.comeup.min} - ${
          duration.comeup.max
        } ${duration.comeup.units}\n`;
      } else {
        dosageMessage += "No comeup information.\n";
      }
      // Peak
      if (!!duration.peak) {
        dosageMessage += `Peak: ${duration.peak.min} - ${duration.peak.max} ${
          duration.peak.units
        }\n`;
      } else {
        dosageMessage += "No peak information.\n";
      }
      // Offset
      if (!!duration.offset) {
        dosageMessage += `Offset: ${duration.offset.min} - ${
          duration.offset.max
        } ${duration.offset.units}\n`;
      } else {
        dosageMessage += "No offset information.\n";
      }
      // Afterglow
      if (!!duration.afterglow) {
        dosageMessage += `Afterglow: ${duration.afterglow.min} - ${
          duration.afterglow.max
        } ${duration.afterglow.units}\n`;
      } else {
        dosageMessage += "No afterglow information.\n";
      }
      // Total
      if (!!duration.total) {
        dosageMessage += `Total: ${duration.total.min} - ${
          duration.total.max
        } ${duration.total.units}\n\`\`\``;
      } else {
        dosageMessage += "No total information.\n````";
      }
    } else {
      dosageMessage += "No duration information.```";
    }
  }
  console.log(dosageMessage);
  return dosageMessage;
}
