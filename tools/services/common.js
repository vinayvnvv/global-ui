var Service = function() {
	this.isValidJson = function(json) {
		try {
			if(JSON.stringify(json))
				return true;
		} catch(err) {
			console.error(err)
			return false;
		}
	}
	this.hasOnlyWhiteSpaces = function(str) {
		if (!str.replace(/\s/g, '').length) {
		    return true;
		} else {
			return false;
		}
	}

	this.hasInvalidValue = function(str) {
		if(str == "" || this.hasOnlyWhiteSpaces(str))
			return true;
		return false;
	}
}
module.exports = new Service();