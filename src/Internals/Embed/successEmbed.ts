import { User } from "discord.js";
import { Client } from "discord.js";
import { MessageEmbed } from "discord.js";

class successEmbed extends MessageEmbed {
    constructor(description: string, { author, client }: { author?: User; client?: Client } = {}) {
        super();
        super.setColor("GREEN");
        super.setTitle("Success!");
        super.setDescription(description);
        if (author && client && client.user) {
            super.setAuthor(author.tag, author.displayAvatarURL());
            super.setFooter(client.user.tag, client.user.displayAvatarURL());
        }
    }
}
export default successEmbed;
