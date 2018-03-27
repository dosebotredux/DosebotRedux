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
const test = require("./test.json");

const warnBuffer = 3;
const maxBuffer = 5;
const interval = 1000;
const warningMessage = "stop spamming or I'll whack your head off.";
const banMessage = "has been banned for spamming, anyone else?";
const maxDuplicatesWarning = 5;
const maxDuplicatesBan = 10;

const authors = [];
var warned = [];
var banned = [];
var messagelog = [];

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
			// "Available commands: --help, --lsdtolerance [number of days since last dose], --dxmcalc [weight in lbs], --info [substance]",
			"```Available commands: \n --help \n --lsdtolerance [number of days since last dose] \n --dxmcalc [weight in lbs] \n --info [substance] \n ```"
		);
	}
	
	// SEI blurb
	if (message.content.toLowerCase().includes("--sei")) {
		message.channel.send(
			"The Subjective Effect Index - http://www.effectindex.com \nFounded by <@!295422447887450114>"
		);
	}
	
	// LSD tolerance dosage calculator
	if (message.content.toLowerCase().includes("--lsdtolerance") || message.content.toLowerCase().includes("--psychtolerance")) {
		// Usage --lsdtolerance [days since last trip]. calculates tolerance/extra dose needed to achieve normal effects
		
		var str = message.content;
		var result = str.split(" ");
		var x = parseFloat(result[result.length - 1]);
		var y = Math.pow(x - 14, 4) / 150 + (20 - x / 14 * 20) + 100;
		
		if (x < 3) { // If days since last dose would give a very high calculated dose return a warning
			message.channel.send(
				"Take ~" + Math.ceil(y / 10) * 10 + "% of the drug to reach full effects.\n Warning: Negative effects may be amplified with a high dose of a psychedelic."
			);
		} else {
			message.channel.send(
				"Take ~" + Math.ceil(y / 10) * 10 + "% of the drug to reach full effects."
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
		
		console.log(test[_drug]);
		if (test[_drug] != undefined) {
			// Dosage info/intro
			message.channel.send(
				"**" + test[_drug].name + "** information" +
				"\n\n" +
				"**Psychoactive class:** " + test[_drug].psychoactiveClass +
				"\n\n" +
				"**Chemical class:** " + test[_drug].chemicalClass +
				"\n\n" +
				"**Dosage**" +
				"```" +
				"\nThreshold: " + test[_drug].threshold +
				"\nLight: " + test[_drug].low + test[_drug].unit + 
				"\nModerate: " + test[_drug].medium + test[_drug].unit +
				"\nHeavy: " + test[_drug].high + test[_drug].unit	+ 
				"```" + 
				"**Duration**" + 
				"```" +
				"\nTotal: " + test[_drug].durationTotal +
				"\nOnset: " + test[_drug].durationOnset +
				"\nComeup: " + test[_drug].durationComeUp +
				"\nPeak: " + test[_drug].durationPeak +
				"\nOffset: " + test[_drug].durationOffset +
				"\nAfterglow: " + test[_drug].durationAfterglow +
				"```" +
				"**Harm potential**" +
				"```" + 
				"\n" + test[_drug].harmPotential +
				"```" +
				"**Tolerance**" + 
				"```" +
				"\n" + 
				test[_drug].tolerance +
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
			message.channel.send("MORE: <https://psychonautwiki.org/wiki/" + pw_drug + ">"); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
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
	// 		test[_drug].name
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
	if (message.content.toLowerCase().includes("what is my avatar")) {
		// Send the user's avatar URL
		message.reply(message.author.avatarURL);
	}
});

client.login(settings.token);
