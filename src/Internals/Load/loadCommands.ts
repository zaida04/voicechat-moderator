import { blue, bold } from "colors";
import { Client } from "discord.js";
import fileInteraction from "./fileInteraction";

export default async (client: Client) => {
    let commands = await fileInteraction.readdir(`${__dirname}/../../commands`);
    commands.forEach((file: any) => {
        const command = require(`../../commands/${file}`);
        return client.commands.set(command.name, command);
    });
    console.log(bold(blue("\nCommands Loaded: ")));
    let table_cmds = client.commands.map((x) => {
        return {
            name: x.name,
            category: x.category ? x.category : "no category",
        };
    });
    console.table(table_cmds);
};
