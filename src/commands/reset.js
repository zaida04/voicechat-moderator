module.exports = {
	"name": "reset",
	"description": "reset the settings of the server",
	"permissions": ["MANAGE_GUILD"],
	"execute": async (message, [confirm]) => {
		if(confirm === "confirm") {
			await message.client.db.raw.Guild.findByIdAndDelete(message.guild.id);
			await message.client.db.guilds.create(message.guild.id);
			return message.channel.send(new message.client.utilities.successEmbed("Server settings have been successfully reset!", message));
		}
		else return message.channel.send(new message.client.utilities.warnEmbed(`WARNING: this will revert ALL settings. If you are sure about this, please do \`${await message.guild.prefix}reset confirm\``));
	}
};