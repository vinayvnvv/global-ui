var custom = require('./../../customize/custom.json');
var fs = require('fs');
var common =require('./common');
var env = require('./../env.json');
var components_structure = require('./../default/components_structure.json');
var colors_log = require('colors');


var componentIncludeService  = function() {
	var custom_modules = (custom ? ( custom.modules ? ( custom.modules.components ? custom.modules.components : null) : null) : null);
	this.generateMainSaas = function(callback) {
		console.log(env.project.logsPrefix + "Checking custom modules selected...".blue);
		if(!custom_modules) {
			console.log(env.project.logsPrefix + "No custom modules selected!".green);
			return callback(false)
		};
		var contents = "";
		contents += "@charset 'utf-8'\n";
		contents += "//add common\n@import '" + env.src.sassIncludeFile  + "'\n";  //add init vars to top
		contents += "//components\n";
		for(var i=0;i<custom_modules.length;i++) {
			if(components_structure[custom_modules[i]]) {
				console.log(colors_log.magenta.underline("\t\t" + custom_modules[i]));
				contents += "@import '" + components_structure[custom_modules[i]].src  + "'\n";
			}
		}

		fs.writeFile(env.src.sassCustomizedMainFile, contents, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log(env.project.logsPrefix + "Custom modules built!".green);
		    callback(true);
		}); 


	}
}
module.exports = new componentIncludeService();