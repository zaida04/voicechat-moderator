const incorrectUsageEmbed = require("../internals/incorrectUsageEmbed");

let punishment_options = ["vc_mute", "vc_kick", "g_kick", "g_ban", "g_mute"];

module.exports = {
	"name": "settings",
	"usage": "[option] [valuetosetto]",
	"category": "admin",
	"description": "Change the settings of the bot.",
	"execute": async (message, [option, setvalue]) => {
		let response;
		let changed;
		switch (option) {
		case "prefix": {
			if (setvalue) {
				if (setvalue === message.client.settings.prefix) return message.channel.send(new incorrectUsageEmbed("That is already the existing value!"));
				message.client.settings.prefix = setvalue;
				changed = `Prefix has been changed to: \`${setvalue}\``;
			} else response = `Prefix: \`${message.client.settings.prefix}\``;
			break;
		}
		case "punishment": {
			if (setvalue) {
				if (setvalue === message.client.settings.punishment) return message.channel.send(new incorrectUsageEmbed("That is already the existing value!"));
				if(!punishment_options.includes(setvalue)) return message.channel.send(new incorrectUsageEmbed(`Sorry, but you can only choose from the following to set the punishment to: ${punishment_options.map(x => `\`${x}\``).join(", ")}`));
				message.client.settings.punishment = setvalue;
				changed = `Punishment has been changed to: \`${setvalue}\``;
			} else response = `Punishment: \`${message.client.settings.punishment}\``;
			break;
		}
		case "decibel": {
			if (setvalue) {
				if (setvalue == message.client.settings.decibel) return message.channel.send(new incorrectUsageEmbed("That is already the existing value!"));
				if(isNaN(setvalue) || (parseInt(setvalue) > 100 || parseInt(setvalue) < 0)) return message.channel.send(new incorrectUsageEmbed("Sorry, but the decibel count must be a valid integer between 0 and 100 db"));
				message.client.settings.decibel = setvalue;
				changed = `Decibel Level has been changed to: \`${setvalue}\``;
			} else response = `Decibel Level: \`${message.client.settings.decibel}db\``;
			break;
		}
		default: {
			return message.channel.send(`Settings options: \`prefix\`, \`punishment\`, \`decibel\`.\nYou can do \`${message.client.settings.prefix}settings [option]\` to see what the current value is for that option.`);
		}
		}
		if(changed) {
			return message.channel.send(changed);
		}
		if(response) {
			return message.channel.send(response);
		}
	}
};