var custom = require('./../../customize/custom.json');
var fs = require('fs');
var common =require('./common');
var colors_log = require('colors');
var env = require('./../env.json');


var SiteService = function() {
	var custom_site_colors = (custom ? ( custom.vars ? ( custom.vars.site ? (custom.vars.site.colors ?  custom.vars.site.colors : null) : null) : null) : null);
	var custom_site_family = (custom ? ( custom.vars ? ( custom.vars.site ? (custom.vars.site.font ?  custom.vars.site.font : null) : null) : null) : null);
	var custom_site_dimensions = (custom ? ( custom.vars ? ( custom.vars.site ? (custom.vars.site.dimensions ?  custom.vars.site.dimensions : null) : null) : null) : null);
	this.buildSiteColors = function() {
		var site_colors = custom_site_colors;
		if(!site_colors) return "";
		var contents = "";
		console.log(env.project.logsPrefix + "Creating site color....".blue);
		for(p in site_colors) {
			console.log(colors_log.magenta.underline("\t\t" + p + ": " + site_colors[p]));
			contents += "$" + p + ": " + site_colors[p] + '\n';
		}
		if(common.hasOnlyWhiteSpaces(contents)) return "";
		else return "//site colors\n" + contents;
	}

	this.buildSiteFont = function() {
		var site_family = custom_site_family;
		if(!site_family) return "";
		var contents = "";
		console.log(env.project.logsPrefix + "Creating site fonts....".blue);
		for(p in site_family) {
			console.log(colors_log.magenta.underline("\t\t" + p + ": " + site_family[p]));
			contents += "$" + p + ": " + site_family[p] + '\n';
		}
		if(common.hasOnlyWhiteSpaces(contents)) return "";
		else return "//fonts \n" + contents;
	}

	this.buildSiteDimensions = function() {
		var site_dimensions = custom_site_dimensions;
		if(!site_dimensions) return "";
		var contents = "";
		console.log(env.project.logsPrefix + "Creating site Dimensions....".blue);
		for(p in site_dimensions) {
			console.log(colors_log.magenta.underline("\t\t" + p + ": " + site_dimensions[p]));
			contents += "$" + p + ": " + site_dimensions[p] + '\n';
		}
		if(common.hasOnlyWhiteSpaces(contents)) return "";
		else return "//dimensions \n" + contents;
	}

}

module.exports = new SiteService();