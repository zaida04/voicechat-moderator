const { inspect } = require("util");

module.exports = {
	"name": "eval",
	"execute": async (message, args) => {
		if (message.author.id !== "500765481788112916") return message.reply("no");
		try {
			let code = args.join(" ");
			let evaled = eval(code);
			if (typeof evaled !== "string")
				evaled = inspect(evaled);
			message.channel.send(clean(evaled).slice(0, 1850), {
				code: "xl"
			});
		} catch (e) {
			message.reply(`Eval failed. ${e}`);
		}
	}
};

const clean = text => {
	if (typeof (text) === "string")
		return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
	else
		return text;
};