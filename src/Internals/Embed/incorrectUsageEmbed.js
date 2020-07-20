const { MessageEmbed } = require("discord.js");

class incorrectUsageEmbed extends MessageEmbed {
	constructor(description) {
		super();
		super.setColor("RED");
		super.setTitle("You have incorrectly used this command!");
		super.setDescription(description);
	}

}
module.exports = incorrectUsageEmbed;