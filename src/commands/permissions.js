module.exports = {
	"name": "permissions",
	"category": "utilities",
	"usage": "",
	"execute": async (message) => {
		return message.channel.send(`My current permissions for this guild are: ${message.guild.me.permissions.toArray().map(x=>`\`${x}\``).join(", ")}`);
	}
};