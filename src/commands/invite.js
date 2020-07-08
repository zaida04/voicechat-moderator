const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "invite",
	"category": "utilities",
	"usage": "",
	"description": "create an invite link to invite this bot",
	"execute": async (message) => {
		return message.channel.send(new MessageEmbed().setTitle("Invite the bot to your server!").setDescription(`[inv here!](https://discordapp.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=334851910)`));
	}
};