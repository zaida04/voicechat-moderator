const {
	Collection
} = require("discord.js");
const GuildConnections = require("./GuildConnections");

class ConnectionsManager {
	constructor(client) {
		Object.defineProperty(this, "client", client);
		this._connections = new Collection();
	}
	get guilds() {
		return this._connections;
	}
	add(guild) {
		if (!this.guilds.has(guild.id)) {
			let guild_connection = new GuildConnections({
				"guild": guild,
				"connection": guild.me.voice.connection,
				"activeChannel": guild.me.voice.channel.id
			});
			this.guilds.set(guild.id, guild_connection);
			return guild_connection;
		}
		return this.guilds.get(guild.id);

	}
	delete(guild) {
		if (this.guilds.has(guild.id)) return this.guilds.delete(guild.id);
	}
}

module.exports = ConnectionsManager;