const { readdir } = require("./fileInteraction");

module.exports = async (client) => {
	let commands = await readdir(`${__dirname}/../commands`);
	commands.forEach(file => {
		const command = require(`../commands/${file}`);
		return client.commands.set(command.name, command);
	});
};