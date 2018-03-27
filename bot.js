const Discord = require("discord.js");
//const DiscordIO = require('discord.io');
const client = new Discord.Client();
const settings = require("./auth.json");
const triggered = client.emojis.find("name", "smile");
const Browser = require("zombie");
var fs = require("fs");
var path = require("path");
var util = require("util");

// Require substance JSON
const compounds = require("./compounds.json");

client.on("ready", () => {
	console.log("I'm Online");
});

var prefix = "~";

client.on("guildMemberAdd", member => {
	//logs every user who joins into the console
	console.log(member.user.username);
	console.log(member.toString());
	console.log(member.id.toString());
});

client.on("message", message => {
	if (message.author === client.user) return;
	
	var msg = message;
	
	// Ping/pong
	if (message.content.startsWith(prefix + "ping")) {
		message.channel.send("pong");
	}
	
	// Help information
	if (message.content.toLowerCase().includes("--help")) {
		message.channel.send(
			"```Available commands: \n --help \n --psychtolerance [number of days since last dose] \n --dxmcalc [weight in pounds] \n --info [substance] \n ```"
		);
	}
	
	// SEI blurb
	if (message.content.toLowerCase().includes("--sei")) {
		message.channel.send(
			"The Subjective Effect Index - http://www.effectindex.com \nFounded by <@!295422447887450114>"
		);
	}
	
	// LSD tolerance dosage calculator
	if (
		message.content.toLowerCase().includes("--lsdtolerance") ||
		message.content.toLowerCase().includes("--psychtolerance")
	) {
		// Usage --psychtolerance [days since last trip]. calculates tolerance/extra dose needed to achieve normal effects
		
		var str = message.content;
		var result = str.split(" ");
		var x = parseFloat(result[result.length - 1]);
		var y = Math.pow(x - 14, 4) / 150 + (20 - x / 14 * 20) + 100;

		// If < 14 days perform calculations, if greater then return no tolerance
		if (x <= 14) {
			if (x < 3) {
				// If days since last dose would give a very high calculated dose return a warning
				message.channel.send(
					"Take ~" +
					Math.ceil(y / 10) * 10 +
					"% of the drug to reach full effects.\n Warning: Negative effects may be amplified with a high dose of a psychedelic."
				);
			} else {
				message.channel.send(
					"Take ~" +
					Math.ceil(y / 10) * 10 +
					"% of the drug to reach full effects."
				);
			}
		} else {
			message.channel.send(
				"You should not have a tolerance, take 100% of desired dosage."
			);
		}
	}
	
	//calc dxm plateau dosages. usage --dxmcalc [weight in pounds]
	if (message.content.toLowerCase().includes("--dxmcalc")) {
		var str = message.content;
		var result = str.split(" ");
		
		message.channel.send("DoseBot recommends:");
		
		message.channel.send(
			parseFloat(result[result.length - 1]) * 0.8 +
			"mg to " +
			parseFloat(result[result.length - 1]) * 1.2 +
			"mg of DXM for 1st Plateau"
		);
		
		message.channel.send(
			parseFloat(result[result.length - 1]) * 1.75 +
			"mg to " +
			parseFloat(result[result.length - 1]) * 3.15 +
			"mg of DXM for 2nd Plateau"
		);
		
		message.channel.send(
			parseFloat(result[result.length - 1]) * 3.5 +
			"mg to " +
			parseFloat(result[result.length - 1]) * 6.6 +
			"mg of DXM for 3rd Plateau"
		);
		
		message.channel.send(
			parseFloat(result[result.length - 1]) * 6.6 +
			"mg to " +
			parseFloat(result[result.length - 1]) * 10 +
			"mg of DXM for 4th Plateau \n**Warning: Doses exceeding 1500mg are dangerous and even an experienced user should not consider them to be safe.**"
		);
	}
	
	if (message.content.toLowerCase().includes("--info")) {
		var str = message.content;
		var result = str.split(" ");
		var _drug = str
		.toLowerCase()
		.replace("-info ", "", -1)
		.replace(/-/g, "", -1)
		.replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
		
		console.log(compounds[_drug]);
		if (compounds[_drug] != undefined) {
			// Dosage info/intro
			message.channel.send(
				"**" +
				compounds[_drug].name +
				"** information" +
				"\n\n" +
				"**Psychoactive class:** " +
				compounds[_drug].psychoactiveClass +
				"\n\n" +
				"**Chemical class:** " +
				compounds[_drug].chemicalClass +
				"\n\n" +
				"**Dosage**" +
				"```" +
				"\nThreshold: " +
				compounds[_drug].threshold +
				compounds[_drug].unit +
				"\nLight: " +
				compounds[_drug].low +
				compounds[_drug].unit +
				"\nModerate: " +
				compounds[_drug].medium +
				compounds[_drug].unit +
				"\nHeavy: " +
				compounds[_drug].high +
				compounds[_drug].unit +
				"```" +
				"**Duration**" +
				"```" +
				"\nTotal: " +
				compounds[_drug].durationTotal +
				"\nOnset: " +
				compounds[_drug].durationOnset +
				"\nComeup: " +
				compounds[_drug].durationComeUp +
				"\nPeak: " +
				compounds[_drug].durationPeak +
				"\nOffset: " +
				compounds[_drug].durationOffset +
				"\nAfterglow: " +
				compounds[_drug].durationAfterglow +
				"```" +
				"**Harm potential**" +
				"```" +
				"\n" +
				compounds[_drug].harmPotential +
				"```" +
				"**Tolerance**" +
				"```" +
				"\n" +
				compounds[_drug].tolerance +
				"```"
			);
		}
		
		// DXM calculator message
		if (message.content.toLowerCase().includes("dxm")) {
			setTimeout(function() {
				message.channel.send(
					"To calculate DXM dose:\n```-dxmcalc [weight in pounds]```"
				);
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
			); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
		}, 1000);
	}
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
});

// Create an event listener for messages
client.on("message", message => {
	// If the message is "what is my avatar"
	if (message.content.toLowerCase().includes("--avatar")) {
		// Send the user's avatar URL
		message.reply(message.author.avatarURL);
	}
});

client.login(settings.token);
