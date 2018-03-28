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
      console.log(roa.dose);
      
      var dosage_message = "**Dosage** (" + roa.name + ")\n```\n";
      
      //check for existence of the min bound of each dosage level. if there is no min bound then it will not be printed
      if (roa.dose.threshold) {
        dosage_message +=
        "Threshold: " + roa.dose.threshold + roa.dose.units + "\n";
      }
      if (roa.dose.light.min) {
        dosage_message +=
        "Light: " +
        roa.dose.light.min +
        "-" +
        roa.dose.light.max +
        roa.dose.units +
        "\n";
      } else if (roa.dose.light) {
        dosage_message += "Light: " + roa.dose.light + roa.dose.units + "\n";
      }
      if (roa.dose.common.min) {
        dosage_message +=
        "Common: " +
        roa.dose.common.min +
        "-" +
        roa.dose.common.max +
        roa.dose.units +
        "\n";
      } else if (roa.dose.common) {
        dosage_message +=
        "Common: " + roa.dose.common + roa.dose.units + "\n";
      }
      if (roa.dose.strong.min) {
        dosage_message +=
        "Strong: " +
        roa.dose.strong.min +
        "-" +
        roa.dose.strong.max +
        roa.dose.units +
        "\n";
      } else if (roa.dose.strong) {
        dosage_message +=
        "Strong: " + roa.dose.strong + roa.dose.units + "\n";
      }
      if (roa.dose.heavy.min) {
        dosage_message +=
        "Heavy: " +
        roa.dose.heavy.min +
        "-" +
        roa.dose.heavy.max +
        roa.dose.units +
        "\n" +
        "```\n";
      } else if (roa.dose.heavy) {
        dosage_message += "Heavy: " + roa.dose.heavy + roa.dose.units + "\n";
      }
      dosage_message += "```";
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
      if (roa.duration.afterglow.min) {
        duration_message +=
        "Afterglow: " +
        roa.duration.afterglow.min +
        "-" +
        roa.duration.afterglow.max +
        " " +
        roa.duration.afterglow.units +
        "\n```\n";
      }
      
      // duration_message += "Afterglow: \n```\n";
    }
    
    //fill out tolerance section if tolerance exists
    if (substance.tolerance) {
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
    } else {
      var tolerance_message = "";
    }
    
    //HERE'S WHERE ALL THE MAGIC COMES TOGETHER
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
    
    //print output to channel (and also console)
    console.log(channel_message);
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
