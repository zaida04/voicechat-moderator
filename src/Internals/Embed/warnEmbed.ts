import { MessageEmbed } from "discord.js";

class warnEmbed extends MessageEmbed {
    constructor(description: string) {
        super();
        super.setColor("#E5CA11");
        super.setTitle("Warning!");
        super.setDescription(description);
    }
}
export default warnEmbed;
