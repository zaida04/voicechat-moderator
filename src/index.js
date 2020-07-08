const { Client, Collection } = require("discord.js");
const colors = require("colors");
const client = new Client();

const { token, main_guild } = require("../config");
const settingsProvider = require("./internals/settingsProvider");
client.commands = new Collection();
client.main_guild = main_guild;
client.on("ready", async () => {
	try {
		client.settings = await (new settingsProvider()).init();
		await require("./Internals/loadEvents.js")(client);
		await require("./Internals/loadCommands.js")(client);
		console.log(`\n\nVoiceChat Moderator has been logged in as ${client.user.tag}.\nMain Guild: ${client.guilds.cache.get(main_guild).name}\n\n`.brightBlue);
		require("log-timestamp");
	} catch(e) {
		console.log(colors.red(`An error occured on starting up, process terminated. ${e}`));
		process.exit();
	}
});

client.login(token);