import { Message } from "discord.js";

const { inspect } = require("util");

export default {
    name: "eval",
    execute: async (message: Message, args: string[]) => {
        if (message.author.id !== "500765481788112916") return message.reply("no");
        try {
            let code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = inspect(evaled);
            return message.channel.send(clean(evaled).slice(0, 1850), {
                code: "xl",
            });
        } catch (e) {
            return message.reply(`Eval failed. ${e}`);
        }
    },
};

const clean = (text: string) => {
    if (typeof text === "string")
        return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
    else return text;
};
