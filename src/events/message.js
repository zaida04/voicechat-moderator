const incorrectUsageEmbed = require("../internals/embed/incorrectUsageEmbed");

module.exports = async message => {
	let prefix = (await message.guild.prefix) || "g!";
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== "text") {
		return message.reply(new incorrectUsageEmbed("Sorry, but you can't execute that command inside DMs!"));
	}
	//if the command *has* a required permissions array, and the executor does not have these said permissions, do not continue
	if (command.permissions && !message.member.hasPermission(command.permissions, false, true, true)) {
		return message.reply(new incorrectUsageEmbed(`Sorry, but you do not have the permissions: ${command.permissions.join(", ")}`));
	}
	//if the command has the property args as true, and the amount of args are not equal to the required args length AND the required length isn't set to -1 (unlimited args)
	if (command.args && args.length < command.args) {
		return message.channel.send(new incorrectUsageEmbed(`Sorry, either you didn't provide any arguments or you provided too many! ${command.usage ? `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\`` : ""}`));
	}
	try {
		//wrap it in an async because most of the commands should return a promise that we would like to await.
		await command.execute(message, args);
	} catch (e) {
		return message.channel.send(`An internal exception has occured. This should not happen, and we'd like to ask you to join our support server that you can access using \`${prefix}support\` and to copy paste the error below and the command code into https://pastebin.com/ and share it with us. \n\n The error to copy paste: \`\`\` ${e} \`\`\`\n **Please Include this: Command Name: ${command.name}**`);
	}
};