let punishment_options = ["vc_mute", "vc_kick", "g_kick", "g_ban", "g_mute"];

module.exports = {
	"name": "settings",
	"usage": "[option] [valuetosetto]",
	"category": "admin",
	"permissions": ["MANAGE_GUILD"],
	"description": "Change the settings of the bot.",
	"execute": async (message, [option, setvalue]) => {
		let {
			incorrectUsageEmbed
		} = message.client.utilities;
		let response;
		let changed;
		switch (option) {
		case "prefix": {
			if (setvalue) {
				if (setvalue === await message.guild.prefix) return message.channel.send(new incorrectUsageEmbed("That is already the existing value!"));
				message.guild.setPrefix(setvalue);
				changed = `Prefix has been changed to: \`${setvalue}\``;
			} else response = `Prefix: \`${await message.guild.prefix}\``;
			break;
		}
		case "punishment": {
			if (setvalue) {
				if (setvalue === await message.guild.punishment) return message.channel.send(new incorrectUsageEmbed("That is already the existing value!"));
				if (!punishment_options.includes(setvalue)) return message.channel.send(new incorrectUsageEmbed(`Sorry, but you can only choose from the following to set the punishment to: ${punishment_options.map(x => `\`${x}\``).join(", ")}`));
				message.guild.setPunishment(setvalue);
				changed = `Punishment has been changed to: \`${setvalue}\``;
			} else response = `Punishment: \`${await message.guild.punishment}\``;
			break;
		}
		case "threshold": {
			if (setvalue) {
				if (setvalue == await message.guild.threshold) return message.channel.send(new incorrectUsageEmbed("That is already the existing value!"));
				if (setvalue !== "low" && setvalue !== "medium" && setvalue !== "high") return message.channel.send(new incorrectUsageEmbed("You can only set the threshold to either `low`, `medium`, or `high`"));
				message.guild.setThreshold(setvalue);
				changed = `Threshold Level has been changed to: \`${setvalue}\``;
			} else response = `Threshold Level: \`${await message.guild.threshold}\``;
			break;
		}
		default: {
			return message.channel.send(`Settings options: \`prefix\`, \`punishment\`, \`threshold\`.\nYou can do \`${await message.guild.prefix}settings [option]\` to see what the current value is for that option.`);
		}
		}
		if (changed) {
			return message.channel.send(changed);
		}
		if (response) {
			return message.channel.send(response);
		}
	}
};