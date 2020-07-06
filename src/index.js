const { Client, Collection } = require("discord.js");
const colors = require("colors");
const client = new Client();

const { token, main_guild } = require("../config");
let settings = require("../settings.json");
client.commands = new Collection();
client.main_guild = main_guild;
client.settings = settings;

client.on("ready", async () => {
	try {
		await require("./functions/loadEvents.js")(client);
		await require("./functions/loadCommands.js")(client);
		console.log(colors.brightGreen(`VoiceChat Moderator has been logged in as ${client.user.tag}.\nMain Guild: ${client.guilds.cache.get(main_guild).name}`));
	} catch(e) {
		console.log(colors.red(`An error occured on starting up, process terminated. ${e}`));
		process.exit();
	}
});

client.login(token);