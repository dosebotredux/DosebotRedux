//the big enchilada
exports.run = (client, message, args) => {
    const { request } = require("graphql-request");
    
    var str = message.content;
    var result = str.split(" ");
    var _drug = str
      .toLowerCase()
      .replace("--info_old ", "", -1)
      .replace(/-/g, "", -1)
      .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier

    if (_drug != undefined) {
      substance = _drug;
      console.log(_drug);
      console.log(substance);
      var query = `{
				substances(query: "${substance}") {
					name
					addictionPotential
					tolerance {
						full
						half
						zero
					}
					# routes of administration
					roas {
						name
						
						dose {
							units
							threshold
							heavy
							common { min max }
							light { min max }
							strong { min max }
						}
						
						duration {
							afterglow { min max units }
							comeup { min max units }
							duration { min max units }
							offset { min max units }
							onset { min max units }
							peak { min max units }
							total { min max units }
						}
						
						bioavailability {
							min max
						}
					}
				}
			}`;
      request("https://api.psychonautwiki.org", query).then(data =>
        message.channel.send(
          // console.log(query),
          // console.log(data.substances[0].name),
          "**" +
            data.substances[0].name +
            " information**\n" +
            "\n" +
            "**Psychoactive class: **" +
            "insert psychoactive class\n" +
            "**Chemical class: **\n" +
            "\n" +
            "**Dosage**" +
            " (" +
            data.substances[0].roas[0].name +
            ")" +
            "\n" +
            "```\n" +
            "Threshold: " +
            data.substances[0].roas[0].dose.threshold +
            data.substances[0].roas[0].dose.units +
            "\n" +
            "Light: " +
            data.substances[0].roas[0].dose.light.min +
            "-" +
            data.substances[0].roas[0].dose.light.max +
            data.substances[0].roas[0].dose.units +
            "\n" +
            "Common: " +
            data.substances[0].roas[0].dose.common.min +
            "-" +
            data.substances[0].roas[0].dose.common.max +
            data.substances[0].roas[0].dose.units +
            "\n" +
            "Strong: " +
            data.substances[0].roas[0].dose.strong.min +
            "-" +
            data.substances[0].roas[0].dose.strong.max +
            data.substances[0].roas[0].dose.units +
            "\n" +
            "Heavy: " +
            data.substances[0].roas[0].dose.heavy +
            data.substances[0].roas[0].dose.units +
            "\n" +
            "```" +
            "\n" +
            "**Duration**" +
            "\n```" +
            "Total: " +
            data.substances[0].roas[0].duration.total.min +
            "-" +
            data.substances[0].roas[0].duration.total.max +
            " " +
            data.substances[0].roas[0].duration.total.units +
            "\n" +
            "Onset: " +
            data.substances[0].roas[0].duration.onset.min +
            "-" +
            data.substances[0].roas[0].duration.onset.max +
            " " +
            data.substances[0].roas[0].duration.onset.units +
            "\n" +
            "Comeup: " +
            data.substances[0].roas[0].duration.comeup.min +
            "-" +
            data.substances[0].roas[0].duration.comeup.max +
            " " +
            data.substances[0].roas[0].duration.comeup.units +
            "\n" +
            "Peak: " +
            data.substances[0].roas[0].duration.peak.min +
            "-" +
            data.substances[0].roas[0].duration.peak.max +
            " " +
            data.substances[0].roas[0].duration.peak.units +
            "\n" +
            "Offset: " +
            data.substances[0].roas[0].duration.offset.min +
            "-" +
            data.substances[0].roas[0].duration.offset.max +
            " " +
            data.substances[0].roas[0].duration.offset.units +
            "\n" +
            "Afterglow: " +
            "\n" +
            "```" +
            "\n" +
            "**Addiction potential: **" +
            "\n" +
            "```\n" +
            data.substances[0].addictionPotential +
            "```\n" +
            "**Tolerance**" +
            "```\n" +
            "Full: " +
            data.substances[0].tolerance.full +
            "\n" +
            "Half: " +
            data.substances[0].tolerance.half +
            "\n" +
            "Baseline: " +
            data.substances[0].tolerance.zero +
            "```"
        ).catch(console.error)
      );
      console.log(query);
      // // Dosage info/intro
      // message.channel.send(
      //   "**" +
      //     compounds[_drug].name +
      //     "** information" +
      //     "\n\n" +
      //     "**Psychoactive class:** " +
      //     compounds[_drug].psychoactiveClass +
      //     "\n\n" +
      //     "**Chemical class:** " +
      //     compounds[_drug].chemicalClass +
      //     "\n\n" +
      //     "**Dosage**" +
      //     "```" +
      //     "\nThreshold: " +
      //     compounds[_drug].threshold +
      //     compounds[_drug].unit +
      //     "\nLight: " +
      //     compounds[_drug].low +
      //     compounds[_drug].unit +
      //     "\nModerate: " +
      //     compounds[_drug].medium +
      //     compounds[_drug].unit +
      //     "\nStrong: " +
      //     compounds[_drug].strong +
      //     compounds[_drug].unit +
      //     "\nHeavy: " +
      //     compounds[_drug].high +
      //     compounds[_drug].unit +
      //     "```" +
      //     "**Duration**" +
      //     "```" +
      //     "\nTotal: " +
      //     compounds[_drug].durationTotal +
      //     "\nOnset: " +
      //     compounds[_drug].durationOnset +
      //     "\nComeup: " +
      //     compounds[_drug].durationComeUp +
      //     "\nPeak: " +
      //     compounds[_drug].durationPeak +
      //     "\nOffset: " +
      //     compounds[_drug].durationOffset +
      //     "\nAfterglow: " +
      //     compounds[_drug].durationAfterglow +
      //     "```" +
      //     "**Harm potential**" +
      //     "```" +
      //     "\n" +
      //     compounds[_drug].harmPotential +
      //     "```" +
      //     "**Tolerance**" +
      //     "```" +
      //     "\n" +
      //     compounds[_drug].tolerance +
      //     "```"
      // );
    }

    // DXM calculator message
    if (message.content.toLowerCase().includes("dxm")) {
      setTimeout(function() {
        message.channel.send(
          "To calculate DXM dose:\n```-dxmcalc [weight in pounds]```"
        ).catch(console.error);
      }, 1500);
    }

    // //special cases
    // if (_drug == "dipt") _drug = "dipt";
    // if (_drug == "moxy") _drug = "5meomipt";
    // if (_drug == "molly") _drug = "mdma";
    // if (_drug == "ecstasy") _drug = "mdma";

    // if (_drug == "morningglory") {
    // 	_drug = "lsa";
    // }
    // if (_drug == "hawaiianbabywoodrose") {
    // 	_drug = "lsa";
    // }

    // console.log(_drug);

    // var __drug = "https://the700club.000webhostapp.com/kgb/" + _drug + ".png"; // where all the images are hosted. images should be saved as all lowercase and without symbols (ex: 5meomipt.png)

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

    // message.channel.send(pw_drug + " information:", { file: __drug });

    setTimeout(function() {
      message.channel.send(
        "More information: <https://psychonautwiki.org/wiki/" + pw_drug + ">"
      ).catch(console.error); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
    }, 2000);
  // if (message.content.toLowerCase().includes("--info")) {
  // 	var str = message.content;
  // 	var result = str.split(" ");
  // 	var _drug = str
  // 	.toLowerCase()
  // 	.replace("-info ", "", -1)
  // 	.replace(/-/g, "", -1)
  // 	.replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier

  // 	message.channel.send(
  // 		compounds[_drug].name
  // 	);

  // 	//special cases
  // 	if (_drug == "dipt") _drug = "dipt";
  // 	if (_drug == "moxy") _drug = "5meomipt";
  // 	if (_drug == "molly") _drug = "mdma";
  // 	if (_drug == "ecstasy") _drug = "mdma";

  // 	if (_drug == "morningglory") {
  // 		_drug = "lsa";
  // 	}
  // 	if (_drug == "hawaiianbabywoodrose") {
  // 		_drug = "lsa";
  // 	}

  // 	console.log(_drug);

  // 	var __drug = "https://the700club.000webhostapp.com/kgb/" + _drug + ".png"; // where all the images are hosted. images should be saved as all lowercase and without symbols (ex: 5meomipt.png)

  // 	if (!isNaN(_drug.charAt(0))) {
  // 		pw_drug = _drug
  // 		.toUpperCase()
  // 		.replace(/ACO/g, "-AcO-")
  // 		.replace(/MEO/g, "-MeO-");
  // 	} else {
  // 		pw_drug = _drug.charAt(0).toUpperCase() + _drug.slice(1);
  // 	}

  // 	if (pw_drug.length == 3) pw_drug = pw_drug.toUpperCase();

  // 	if (pw_drug == "Dipt") pw_drug = "DiPT";
  // 	if (pw_drug == "Moxy") pw_drug = "5-MeO-MiPT";
  // 	if (pw_drug == "Molly") pw_drug = "MDMA";
  // 	if (pw_drug == "Mdma") pw_drug = "MDMA";

  // 	message.channel.send(pw_drug + " information:", { file: __drug });

  // 	setTimeout(function() {
  // 		message.channel.send("MORE: https://psychonautwiki.org/wiki/" + pw_drug); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
  // 	}, 1000);

  // 	if (message.content.toLowerCase().includes("dxm")) {
  // 		setTimeout(function() {
  // 			message.channel.send(
  // 				"To calculate DXM dose for weight do:\n```-dxmcalc [weight in pounds]```"
  // 			);
  // 		}, 1500);
  // 	}
  // }

  // if (message.content.toLowerCase().includes("-druglist")) {
  // 	message.channel.send("``` - LSD\n - MDMA\n - DMT```"); //this needs updating, but it might be easily to somehow read the directory of where all the images are stored and list all the files there - the ".png"
  // }
}