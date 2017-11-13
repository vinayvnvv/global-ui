var custom = require('./../../customize/custom.json');
var colors_palette = require('./../default/colors.json');
var site_colors = require('./../default/site_colors.json');
var fs = require('fs');
var common =require('./common');
var colors_log = require('colors');
var env = require('./../env.json');

var colorsServive = function() {
	var custom_primary_colors = (custom ? ( custom.vars ? ( custom.vars.colors ? custom.vars.colors : null) : null) : null);
	var custom_fixed_colors = (custom ? ( custom.modules ? ( custom.modules.extra_colors ? custom.modules.extra_colors : null) : null) : null);
	this.definePrimaryColors = function() {
		var colors = custom_primary_colors;
		if(!colors || colors.length == 0) return "";
		var contents = "//primary colors\n";
		if(common.isValidJson(colors)) {
			console.info(env.project.logsPrefix + "Creating primary color palette....".blue)
		} else {
			console.error("Error in JSON");
			return false;
		}

		for(i=0;i<colors.length;i++) {
			for(p in colors[i]) {
				if(common.hasInvalidValue(colors[i][p])) continue; //skip if value is empty
				console.log(colors_log.magenta.underline("\t\t" + p));
				contents += "$" + p + ": " + colors[i][p] + '\n';
			}
		}
		return contents;
	}

	this.defineFixedColors = function() {
		var colors = custom_fixed_colors;
		if(!colors || colors.length == 0) return "";
		var contents = "//fixed colors palette\n";
		if(common.isValidJson(colors)) {
			console.info(env.project.logsPrefix + "Creating fixed color palette....".blue)
		} else {
			console.error("Error in JSON");
			return false;
		}
		for(var i=0;i<colors.length;i++) {
			var clr = colors_palette.find(function(color) {
				if(color.value == colors[i]) return color;
			});
			console.log(colors_log.magenta.underline("\t\t" + clr.value + ""));
			contents += "$" + clr.value + ": " + clr.hex_code + '\n';
		}
		return contents;
	}

	this.generatePrimaryColorsArray = function() { //return array with color&invert-color
		var colors = custom_primary_colors;
		if(!colors) return this.generateDefaultPrimaryArray();
		if(colors.length == 0) return "";
		var contents = "";
		if(common.isValidJson(colors)) {
			console.info(env.project.logsPrefix + "Creating primary color array....".cyan)
		} else {
			console.error("Error in JSON");
			return false;
		}

		for(i=0;i<colors.length;i++) { //format => "grey": ($grey, findColorInvert($grey))
			for(p in colors[i]) {
				contents += "'" + p + "': ($" + p + ", findColorInvert($" + p + '))';
			}
			if(i != colors.length-1) contents += ","; //add coomma when its last item
			contents += " "; //space btwn each array;
		}
		return contents;
	}

	this.generateFixedColorsArray = function() { //return array with color&invert-color
		var colors = custom_fixed_colors;
		if(!colors) return this.generateDefaultFixedArray();
		if(colors.length == 0) return "";
		var contents = "";
		if(common.isValidJson(colors)) {
			console.info(env.project.logsPrefix + "Creating fixed color array....".cyan)
		} else {
			console.error("Error in JSON");
			return false;
		}
		for(var i=0;i<colors.length;i++) { //format => "grey": ($grey, findColorInvert($grey))
			var clr = colors_palette.find(function(color) {
				if(color.value == colors[i]) return color;
			});
			contents += "'" + clr.value + "': ($" + clr.value + ", findColorInvert($" + clr.value + '))';
			if(i != colors.length-1) contents += ","; //add coomma when its last item
			contents += " "; //space btwn each array;
		}
		return contents;
	}

	this.generateDefaultPrimaryArray = function() {
		var contents = "";
		console.log(env.project.logsPrefix + "Creating default primary color array....".cyan)
		for(var i=0;i<site_colors.length;i++) {
			contents += "'" + site_colors[i] + "': ($" + site_colors[i] + ", findColorInvert($" + site_colors[i] + '))';
			if(i != site_colors.length-1) contents += ","; //add coomma when its last item
			contents += " "; //space btwn each array;
		}
		return contents;
	}

	this.generateDefaultFixedArray = function() {
		var contents = "";
		console.log(env.project.logsPrefix + "Creating default color array....".cyan)
		for(var i=0;i<colors_palette.length;i++) {
			contents += "'" + colors_palette[i].value + "': ($" + colors_palette[i].value + ", findColorInvert($" + colors_palette[i].value + '))';
			if(i != colors_palette.length-1) contents += ","; //add coomma when its last item
			contents += " "; //space btwn each array;
		}
		return contents;
	}

	this.generateColorsArray = function(array) { //format => $colors: (array) !default
		var contents = "//colors array\n";
		contents += "$colors: (" + array + ")";
		return contents;
	}
}

module.exports = new colorsServive();