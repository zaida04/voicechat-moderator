import { MessageEmbed } from "discord.js";

class punishEmbed extends MessageEmbed {
    constructor(description: string) {
        super();
        super.setColor("RED");
        super.setTitle("Punished!");
        super.setDescription(description);
    }
}
export default punishEmbed;
