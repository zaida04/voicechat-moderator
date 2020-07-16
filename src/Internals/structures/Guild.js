const {
	Structures
} = require("discord.js");

Structures.extend("Guild", Guild => {
	return class extends Guild {
		constructor(...args) {
			super(...args);
		}
		get prefix() {
			return getPrefix(this.client, this.id);
		}
		setPrefix(value) {
			return this.client.db.guilds.edit(this.id, {
				"prefix": value
			});
		}
		get threshold() {
			return getThreshold(this.client, this.id);
		}
		setThreshold(value) {
			return this.client.db.guilds.edit(this.id, {
				"threshold": value
			});
		}
		get punishment() {
			return getPunishment(this.client, this.id);
		}
		setPunishment(value) {
			return this.client.db.guilds.edit(this.id, {
				"punishment": value
			});
		}
		get settings() {
			return getSettings(this.client, this.id);
		}
		get details() {
			return getDetails(this.client, this.id);
		}
		get activeVoice() {
			return this.client.connections.guilds.get(this.id) ? this.client.connections.guilds.get(this.id).activeChannel : null;
		}
	};
});

async function getPrefix(client, id) {
	return (await client.db.guilds.get(id)).settings.prefix;
}
async function getThreshold(client, id) {
	return (await client.db.guilds.get(id)).settings.threshold;
}
async function getPunishment(client, id) {
	return (await client.db.guilds.get(id)).settings.punishment;
}
async function getSettings(client, id) {
	return (await client.db.guilds.get(id)).settings;
}
async function getDetails(client, id) {
	return (await client.db.guilds.get(id));
}