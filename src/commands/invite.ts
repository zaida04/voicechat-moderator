import { Message } from "discord.js";

const { MessageEmbed } = require("discord.js");

export default {
    name: "invite",
    category: "utilities",
    usage: "",
    description: "create an invite link to invite this bot",
    execute: async (message: Message) => {
        return message.channel.send(
            new MessageEmbed()
                .setTitle("Invite the bot to your server!")
                .setDescription(
                    `[inv here!](https://discordapp.com/oauth2/authorize?client_id=${message.client.user?.id}&scope=bot&permissions=334851910)`
                )
        );
    },
};
