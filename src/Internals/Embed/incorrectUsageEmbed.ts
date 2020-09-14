import { MessageEmbed } from "discord.js";

class incorrectUsageEmbed extends MessageEmbed {
    constructor(description: string) {
        super();
        super.setColor("RED");
        super.setTitle("You have incorrectly used this command!");
        super.setDescription(description);
    }
}
export default incorrectUsageEmbed;
