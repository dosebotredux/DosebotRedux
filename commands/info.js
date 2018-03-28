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
  
  results.then(function(data) {
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
    if (roa.duration) {
      console.log(roa.duration);
      
      var duration_message = "**Duration** (" + roa.name + ")\n```\n";
      
      //check for existence or don't print lines
      if (roa.duration.total) {
        duration_message +=
        "Total: " +
        roa.duration.total.min +
        "-" +
        roa.duration.total.max +
        " " +
        roa.duration.total.units +
        "\n";
      }
      
      if (roa.duration.onset) {
        duration_message +=
        "Onset: " +
        roa.duration.onset.min +
        "-" +
        roa.duration.onset.max +
        " " +
        roa.duration.onset.units +
        "\n";
      }
      
      if (roa.duration.comeup) {
        duration_message +=
        "Comeup: " +
        roa.duration.comeup.min +
        "-" +
        roa.duration.comeup.max +
        " " +
        roa.duration.comeup.units +
        "\n";
      }
      
      if (roa.duration.peak) {
        duration_message +=
        "Peak: " +
        roa.duration.peak.min +
        "-" +
        roa.duration.peak.max +
        " " +
        roa.duration.peak.units +
        "\n";
      }
      
      if (roa.duration.offset) {
        duration_message +=
        "Offset: " +
        roa.duration.offset.min +
        "-" +
        roa.duration.offset.max +
        " " +
        roa.duration.offset.units +
        "\n";
      }
      if (roa.duration.afterglow.min && roa.duration.afterglow.max) {
        duration_message +=
        "Afterglow: " +
        roa.duration.afterglow.min +
        "-" +
        roa.duration.afterglow.max +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      } else if (roa.duration.afterglow.min) {
        duration_message +=
        "Afterglow: " +
        roa.duration.afterglow.min +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      } else if (roa.duration.afterglow) {
        duration_message +=
        "Afterglow: " +
        roa.duration.afterglow +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      }
    }

    if (roa.duration) {
      console.log(roa.duration);
      
      var duration_message_2 = "**Duration** (" + roa.name + ")\n```\n";
      
      //check for existence or don't print lines
      if (roa.duration.total) {
        duration_message_2 +=
        "Total: " +
        roa.duration.total.min +
        "-" +
        roa.duration.total.max +
        " " +
        roa.duration.total.units +
        "\n";
      }
      
      if (roa.duration.onset) {
        duration_message_2 +=
        "Onset: " +
        roa.duration.onset.min +
        "-" +
        roa.duration.onset.max +
        " " +
        roa.duration.onset.units +
        "\n";
      }
      
      if (roa.duration.comeup) {
        duration_message_2 +=
        "Comeup: " +
        roa.duration.comeup.min +
        "-" +
        roa.duration.comeup.max +
        " " +
        roa.duration.comeup.units +
        "\n";
      }
      
      if (roa.duration.peak) {
        duration_message_2 +=
        "Peak: " +
        roa.duration.peak.min +
        "-" +
        roa.duration.peak.max +
        " " +
        roa.duration.peak.units +
        "\n";
      }
      
      if (roa.duration.offset) {
        duration_message_2 +=
        "Offset: " +
        roa.duration.offset.min +
        "-" +
        roa.duration.offset.max +
        " " +
        roa.duration.offset.units +
        "\n";
      }
      if (roa.duration.afterglow.min && roa.duration.afterglow.max) {
        duration_message_2 +=
        "Afterglow: " +
        roa.duration.afterglow.min +
        "-" +
        roa.duration.afterglow.max +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      } else if (roa.duration.afterglow.min) {
        duration_message_2 +=
        "Afterglow: " +
        roa.duration.afterglow.min +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      } else if (roa.duration.afterglow) {
        duration_message_2 +=
        "Afterglow: " +
        roa.duration.afterglow +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      }
    }
    
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
      duration_message +
      "**Addiction potential: **\n```\n" +
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
    buildDosageMessage(substance);

    
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
      "More information: <https://psychonautwiki.org/wiki/" + pw_drug + ">"
    )
    .catch(console.error); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
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
    if (i > 0) {
      dosageMessage +=
      "\n"
    }
    if (dosageMessageArray[i].name) {
      dosageMessage += 
      "**Dosage** (" + dosageMessageArray[i].name + ")\n"
    }
    if (dosageMessageArray[i].dose.threshold) {
      dosageMessage += 
      "```\nThreshold: " +
      dosageMessageArray[i].dose.threshold +
      dosageMessageArray[i].dose.units +
      "\n"
    } else {
      dosageMessage +=
      "```\n"
    }
    if (dosageMessageArray[i].dose.light.min) {
      dosageMessage +=
      "Light: " +
      dosageMessageArray[i].dose.light.min +
      "-" +
      dosageMessageArray[i].dose.light.max +
      dosageMessageArray[i].dose.units + 
      "\n"
    } else if (dosageMessageArray[i].dose.light) {
      dosageMessage +=
      "Light: " +
      dosageMessageArray[i].dose.light +
      dosageMessageArray[i].dose.units + 
      "\n"
    }
    if (dosageMessageArray[i].dose.common.min) {
      dosageMessage +=
      "Common: " +
      dosageMessageArray[i].dose.common.min +
      "-" +
      dosageMessageArray[i].dose.common.max +
      dosageMessageArray[i].dose.units + 
      "\n"
    } else if (dosageMessageArray[i].dose.common) {
      dosageMessage +=
      "Common: " +
      dosageMessageArray[i].dose.light +
      dosageMessageArray[i].dose.units + 
      "\n"
    }
    if (dosageMessageArray[i].dose.strong.min) {
      dosageMessage +=
      "Strong: " +
      dosageMessageArray[i].dose.strong.min +
      "-" +
      dosageMessageArray[i].dose.strong.max +
      dosageMessageArray[i].dose.units + 
      "\n"
    } else if (dosageMessageArray[i].dose.strong) {
      dosageMessage +=
      "Strong: " +
      dosageMessageArray[i].dose.light +
      dosageMessageArray[i].dose.units + 
      "\n"
    }
    if (dosageMessageArray[i].dose.heavy.min) {
      dosageMessage +=
      "Heavy: " +
      dosageMessageArray[i].dose.heavy.min +
      "-" +
      dosageMessageArray[i].dose.heavy.max +
      dosageMessageArray[i].dose.units + 
      "\n```\n"
    } else if (dosageMessageArray[i].dose.heavy) {
      dosageMessage +=
      "Heavy: " +
      dosageMessageArray[i].dose.heavy +
      dosageMessageArray[i].dose.units + 
      "\n```\n"
    }
  }
  console.log(dosageMessage);
  return dosageMessage;
}

function buildDurationMessage(substance) {

}