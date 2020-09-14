import { Client, Collection } from "discord.js";
import colors from "colors";
import "./Internals/Structures/Guild";
import utils from "./Internals/Load/loadUtilities";
const client = new Client();

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Record<string, any>>;
        db: DatabaseManager;
        connections: ConnectionsManager;
        utilities: typeof utils;
        mention: RegExp;
    }
    interface Guild {
        prefix: Promise<string>;
        threshold: Promise<string>;
        punishment: Promise<string>;
        settings: Promise<any>;
        details: Promise<any>;
        activeConnection: string;
        activeChannel: string;
        notifyChannel: string;
        setPrefix: (value: any) => Promise<any>;
        setThreshold: (value: any) => Promise<any>;
        setPunishment: (value: any) => Promise<any>;
        setNotify: (value: any) => Promise<any>;
    }
}

import { token } from "../config";
import DatabaseManager from "./Internals/Managers/DatabaseManager";
import ConnectionsManager from "./Internals/Managers/ConnectionsManager";
import { GuildChannel } from "discord.js";
client.db = new DatabaseManager();
client.commands = new Collection();
client.connections = new ConnectionsManager(client);
client.utilities = utils;

(async () => {
    await require("./Internals/Load/loadEvents.js")(client);
    await require("./Internals/Load/loadCommands.js")(client);
})();

client.on("ready", async () => {
    try {
        if (client.user) {
            client.mention = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
            console.log(
                colors.blue(
                    `\nVoiceChat Moderator has been logged in as ${client.user.tag}.\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`
                )
            );
        }
        require("log-timestamp");
    } catch (e) {
        console.log(colors.red(`An error occured on starting up, process terminated. ${e}`));
        process.exit();
    }
});

client.login(token);
