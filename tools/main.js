var fs = require('fs');
var custom = require('./../customize/custom.json');
var colors_palette = require('./default/colors.json');
var common = require('./services/common');
var colors_service = require('./services/colors');
var env = require('./env.json');
var sassService = require('./services/sass');
var colors = require('colors');
var task = function() {


	this.buildAll = function() {
		this.buildColors(()=> {
			this.buildCss();
		});
	}

	this.buildColors = function(callback) {
		var contents = "";
		var colors_array = "";
		contents += colors_service.definePrimaryColors();
		contents += colors_service.defineFixedColors();

		var primary_colors_array = colors_service.generatePrimaryColorsArray();
		var fixed_colors_array = colors_service.generateFixedColorsArray();
		var comma_seperater = ((!common.hasOnlyWhiteSpaces(primary_colors_array) && !common.hasOnlyWhiteSpaces(fixed_colors_array) ) ? "," : "");

		var colors_array = primary_colors_array + comma_seperater + fixed_colors_array;
		if(!common.hasOnlyWhiteSpaces(colors_array)) {
			colors_array = colors_service.generateColorsArray(colors_array)
		} else {
			colors_array = "";
		}

		contents += colors_array;

		fs.writeFile(env.outDir.customizedColors, contents, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log(env.project.logsPrefix + "Colors built!".green);
		    callback();
		}); 
	}


	this.buildCss = function() {
		sassService.buildCss(function() {
			console.log(env.project.logsPrefix + 'CSS built success!!....'.green);
			sassService.minifyCss();
		});
	}
	
}

module.exports = new task();
