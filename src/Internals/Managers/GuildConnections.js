const {
	Collection
} = require("discord.js");
const Connection = require("../voice/Connection");

class GuildConnections {
	constructor(data) {
		this._members = new Collection();
		this._guild = data.guild;
		this._connection = data.connection;
	}
	get members() {
		return this._members;
	}
	get connection() {
		return this._connection;
	}
	add(member) {
		if (!this.members.has(member.id)) {
			let member_connection = new Connection({"guild": member.guild, "connection": member.guild.me.voice.connection, "member": member});
			this.members.set(member.id, member_connection);
			return member_connection;
		}
		return this.members.get(member.id);
	}
	remove(member) {
		if (this.members.has(member.id)) return this.members.delete(member.id);
	}
}

module.exports = GuildConnections;