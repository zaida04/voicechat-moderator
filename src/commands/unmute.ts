import { Message } from "discord.js";

export default {
    name: "unmute",
    description: "unmute a muted person",
    aliases: ["um"],
    permissions: ["MUTE_MEMBERS"],
    category: "voice",
    usage: "<mention>",
    execute: async (message: Message) => {
        if (!message.mentions.users.first())
            return message.channel.send(
                new message.client.utilities.incorrectUsageEmbed("You must mention a person for this to work.")
            );
        if (!message.mentions.members?.first()?.voice.channel)
            return message.channel.send(
                new message.client.utilities.incorrectUsageEmbed("That person is not in a voice channel!")
            );
        await message.mentions.members?.first()?.voice.setMute(false);
        return message.channel.send(
            new message.client.utilities.successEmbed(`${message.mentions.members.first()} has been unmuted.`, message)
        );
    },
};
