module.exports = {
	"name": "leave",
	"category": "voice",
	"usage": "",
	"aliases": ["exit"],
	"execute": async (message) => {
		if(!message.guild.me.voice.connection) return message.channel.send(new message.client.utilities.incorrectUsageEmbed("I am not in a voice channel!"));
		await message.guild.me.voice.connection.disconnect();
		return message.channel.send(new message.client.utilities.successEmbed("Successfully disconnected from the voice channel.", message));
	}
};