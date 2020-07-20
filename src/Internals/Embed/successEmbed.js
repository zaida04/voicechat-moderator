const {
	MessageEmbed
} = require("discord.js");

class successEmbed extends MessageEmbed {
	constructor(description, { author, client } = {}) {
		super();
		super.setColor("GREEN");
		super.setTitle("Success!");
		super.setDescription(description);
		if(author && client) {
			super.setAuthor(author.tag, author.displayAvatarURL());
			super.setFooter(client.user.tag, client.user.displayAvatarURL());
		}
	}

}
module.exports = successEmbed;