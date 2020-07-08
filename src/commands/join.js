const incorrectUsageEmbed = require("../internals/incorrectUsageEmbed");
const successEmbed = require("../internals/successEmbed");

module.exports = {
	"name": "join",
	"category": "voice",
	"usage": "[id/mention]",
	"description": "Join a mentioned voice channel, or a voice channel that the command executor is in",
	"aliases": ["joinvc", "vc", "connect"],
	"execute": async (message, [id]) => {
		if (id) {
			let mentioned_channel = message.guild.channels.cache.get(id);
			if (mentioned_channel.type !== "voice") return message.channel.send(new incorrectUsageEmbed("That is not a voice channel!"));
			if (mentioned_channel.members < 1) return message.channel.send(new incorrectUsageEmbed("Sorry, but the channel you mentioned doesn't have anyone in it!"));
			await mentioned_channel.join();
			return message.channel.send(new successEmbed(`Successfully joined ${mentioned_channel.name}`));
		}
		if (message.member.voice.channel) {
			await message.member.voice.channel.join();
			return message.channel.send(new successEmbed(`Successfully joined ${message.member.voice.channel}`, message));
		}
		return message.channel.send(new incorrectUsageEmbed("You must either be in a voice channel, or give the id of a voice channel with members in it."));
	}
};