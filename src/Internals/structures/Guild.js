const { Structures } = require("discord.js");

Structures.extend("Guild", Guild => {
	return class extends Guild {
		constructor(...args) {
			super(...args);
		}
		get activeVoice() {
			return this.client.connections.guilds.get(this.id) ? this.client.connections.guilds.get(this.id).activeChannel : null;
		}
	};
});