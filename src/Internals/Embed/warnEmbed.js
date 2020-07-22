const {
	MessageEmbed
} = require("discord.js");

class warnEmbed extends MessageEmbed {
	constructor(description) {
		super();
		super.setColor("#E5CA11");
		super.setTitle("Warning!");
		super.setDescription(description);
	}

}
module.exports = warnEmbed;