const { successEmbed } = require("../Internals/load/loadUtilities");

module.exports = async(guild) => {
	if(!(await guild.client.db.guilds.get(guild.id))) guild.client.db.guilds.create(guild.id);
	if(guild.systemChannel) return guild.systemChannel.send(new successEmbed("Thank you for inviting me to your server!\nYou can see all of my commands [here](http://voice.smld.xyz/)"));
	else return;
};