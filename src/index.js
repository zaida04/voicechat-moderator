const { Client, Collection } = require("discord.js");
const colors = require("colors");
require("./Internals/Structures/Guild");
const client = new Client();

const { token } = require("../config");
const DatabaseManager = require("./Internals/Managers/DatabaseManager");
const ConnectionsManager = require("./Internals/Managers/ConnectionsManager");
client.db = new DatabaseManager();
client.commands = new Collection();
client.connections = new ConnectionsManager(client);
client.utilities = require("./Internals/load/loadUtilities");

(async() => {
	await require("./Internals/load/loadEvents.js")(client);
	await require("./Internals/load/loadCommands.js")(client);
})();

client.on("ready", async () => {
	try {
		client.mention = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
		console.log(`\nVoiceChat Moderator has been logged in as ${client.user.tag}.\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`.brightBlue);
		require("log-timestamp");
	} catch(e) {
		console.log(colors.red(`An error occured on starting up, process terminated. ${e}`));
		process.exit();
	}
});

client.login(token);