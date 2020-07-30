const {
	MessageEmbed
} = require("discord.js");

class punishEmbed extends MessageEmbed {
	constructor(description) {
		super();
		super.setColor("RED");
		super.setTitle("Punished!");
		super.setDescription(description);
	}

}
module.exports = punishEmbed;