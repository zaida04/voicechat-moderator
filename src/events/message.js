const incorrectUsageEmbed = require("../internals/embed/incorrectUsageEmbed");

module.exports = async message => {
	if(message.author.bot) return;
	if(!message.guild) return message.channel.send("Sorry, but I can only be used in a server.");
	let prefix = await message.guild.prefix;
	const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	if(!commandName) return message.channel.send(`The current prefix for this guild is: \`${prefix}\``);
	const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	//if the command *has* a required permissions array, and the executor does not have these said permissions, do not continue
	if (command.permissions && !message.member.hasPermission(command.permissions, false, true, true)) {
		return message.reply(new incorrectUsageEmbed(`Sorry, but you do not have the permissions: ${command.permissions.join(", ")}`));
	}
	//if the command has the property args as true, and the amount of args are not equal to the required args length AND the required length isn't set to -1 (unlimited args)
	if (command.args && args.length < command.args) {
		return message.channel.send(new incorrectUsageEmbed(`Sorry, either you didn't provide any arguments or you provided too many! ${command.usage ? `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\`` : ""}`));
	}
	try {
		await command.execute(message, args);
	} catch (e) {
		return message.channel.send(`An internal exception has occured. This should not happen, and we'd like to ask you to join our support server that you can access using \`${prefix}support\` and to copy paste the error below and the command code into https://pastebin.com/ and share it with us. \n\n The error to copy paste: \`\`\` ${e} \`\`\`\n **Please Include this: Command Name: ${command.name}**`);
	}
};

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");