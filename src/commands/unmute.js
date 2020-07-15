module.exports = {
	"name": "unmute",
	"description": "unmute a muted person",
	"aliases": ["um"],
	"category": "voice",
	"usage": "<mention>",
	"execute": async (message) => {
		if(!message.mentions.users.first()) return message.channel.send(new message.client.utilities.incorrectUsageEmbed("You must mention a person for this to work."));
		await message.mentions.members.first().voice.setMute(false);
		return message.channel.send(new message.client.utilities.successEmbed(`${message.mentions.members.first()} has been unmuted.`));
	}
};