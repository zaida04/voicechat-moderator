const { Client, Collection } = require("discord.js");
const colors = require("colors");
require("./Internals/structures/Guild");
const client = new Client();

const { token } = require("../config");
const DatabaseManager = require("./Internals/Managers/DatabaseManager");
const ConnectionsManager = require("./Internals/Managers/ConnectionsManager");
client.db = new DatabaseManager();
client.commands = new Collection();
client.connections = new ConnectionsManager(client);
client.utilities = require("./Internals/load/loadUtilities");

client.on("ready", async () => {
	try {
		await require("./Internals/load/loadEvents.js")(client);
		await require("./Internals/load/loadCommands.js")(client);
		require("log-timestamp");
		console.log(`\n\nVoiceChat Moderator has been logged in as ${client.user.tag}.\n\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`.brightBlue);
	} catch(e) {
		console.log(colors.red(`An error occured on starting up, process terminated. ${e}`));
		process.exit();
	}
});

client.login(token);