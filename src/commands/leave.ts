import { Message } from "discord.js";

export default {
    name: "leave",
    category: "voice",
    usage: "",
    aliases: ["exit"],
    execute: async (message: Message) => {
        if (!message.guild?.me?.voice.connection)
            return message.channel.send(
                new message.client.utilities.incorrectUsageEmbed("I am not in a voice channel!")
            );
        await message.guild.me.voice.connection.disconnect();
        await message.client.connections.delete(message.guild);
        return message.channel.send(
            new message.client.utilities.successEmbed("Successfully disconnected from the voice channel.", message)
        );
    },
};
