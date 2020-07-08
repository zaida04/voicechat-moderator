const incorrectUsageEmbed = require("../internals/incorrectUsageEmbed");

module.exports = {
	"name": "join",
	"usage": "[id/mention]",
	"aliases": ["joinvc", "vc", "connect"],
	"execute": async(message, args) => {
		let mentioned_channel = message.mentions.channels;
		if(mentioned_channel.size > 0) {
			if(mentioned_channel.first().type !== "voice") return message.channel.send(new incorrectUsageEmbed("That is not a voice channel!"));
			if(!mentioned_channel.first().members < 1) return message.channel.send(new incorrectUsageEmbed("Sorry, but the channel you mentioned doesn't have anyone in it!"));
		}
		if(message.member.voice.channel) await message.member.voice.channel.join(); 
	}
};