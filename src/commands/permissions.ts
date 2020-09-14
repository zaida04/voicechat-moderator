import { Message } from "discord.js";

export default {
    name: "permissions",
    category: "utilities",
    usage: "",
    execute: async (message: Message) => {
        return message.channel.send(
            `My current permissions for this guild are: ${message.guild?.me?.permissions
                .toArray()
                .map((x) => `\`${x}\``)
                .join(", ")}`
        );
    },
};
