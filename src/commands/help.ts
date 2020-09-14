import { Message, MessageEmbed } from "discord.js";

export default {
    name: "help",
    usage: "[command]",
    execute: async (message: Message, [commandName]: [commandName: string]) => {
        if (commandName) {
            let cmd =
                message.client.commands.get(commandName) ||
                message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
            if (!cmd)
                return message.channel.send(
                    new message.client.utilities.incorrectUsageEmbed("Sorry, but that command does not exist!")
                );
            let commandEmbed = new MessageEmbed()
                .setColor("PURPLE")
                .setTitle(`Info for ${commandName}`)
                .setDescription(`This guild's prefix is currently: ${await message.guild.prefix}`);
            cmd.description ? commandEmbed.addField("Description", `\`${cmd.description}\``) : null;
            cmd.usage ? commandEmbed.addField("Usage", `\`${await message.guild.prefix}${cmd.usage}\``) : null;
            cmd.aliases && cmd.aliases.length > 0
                ? commandEmbed.addField("Aliases", `${cmd.aliases.map((x) => `\`${x}\``).join(", ")}`)
                : null;
            cmd.permissions
                ? commandEmbed.addField(
                      "Permissions Required",
                      `\`${cmd.permissions.map((x) => `\`${x}\``).join(", ")}\``
                  )
                : null;

            return message.channel.send(commandEmbed);
        }

        let helpEmbed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle("Help Command List")
            .setDescription(
                `You can get more info about a command by doing \`${await message.guild.prefix}help [name/alias]\``
            );
        let categories = message.client.commands.filter((x) => x.category).map((x) => x.category);
        categories = categories.filter((i, index) => categories.indexOf(i) === index);
        categories.forEach((category) => {
            let cmds = message.client.commands.filter((x) => x.category === category);
            helpEmbed.addField(category, cmds.map((x) => `\`${x.name}\``).join(", "));
        });
        return message.channel.send(helpEmbed);
    },
};
