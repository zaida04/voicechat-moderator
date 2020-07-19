const { readdir } = require("./fileInteraction");

module.exports = async (client) => {
	let commands = await readdir(`${__dirname}/../../commands`);
	commands.forEach(file => {
		const command = require(`../../commands/${file}`);
		return client.commands.set(command.name, command);
	});
	console.log("Commands Loaded: ".bold.brightBlue);
	let table_cmds = client.commands.map(x => {
		return {
			"name": x.name,
			"category": x.category ? x.category : "no category"
		};
	});
	console.table(table_cmds);
};