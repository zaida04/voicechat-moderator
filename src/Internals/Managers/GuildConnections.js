const {
	Collection
} = require("discord.js");
const Connection = require("../Voice/Connection");

class GuildConnections {
	constructor(data) {
		this._members = new Collection();
		this._guild = data.guild;
		this._connection = data.connection;
		this._activeChannelID = data.activeChannel;
	}
	get members() {
		return this._members;
	}
	get connection() {
		return this._connection;
	}
	get activeChannelID() {
		return this._activeChannelID;
	}
	get guild() {
		return this._guild;
	}
	add(member) {
		if (!this.members.has(member.id)) {
			let member_connection = new Connection({"guild": member.guild, "connection": member.guild.me.voice.connection, "member": member, "channel": member.guild.activeVC});
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