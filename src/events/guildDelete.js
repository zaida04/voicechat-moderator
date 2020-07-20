module.exports = async(guild) => {
	if(await guild.client.db.guilds.get(guild.id)) return guild.client.db.guilds.delete(guild.id);
};