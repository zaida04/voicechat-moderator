import { blue } from "colors";
import { Client } from "discord.js";

import fileInteraction from "./fileInteraction";

export default async (client: Client) => {
    try {
        let events = await fileInteraction.readdir(`${__dirname}/../../events`);
        events.forEach((event: any) => {
            if (!event.endsWith(".js")) return;
            const evt = require(`../../events/${event}`);
            let evtName = event.split(".")[0];
            console.log(blue(`Event ${evtName} loaded`));
            client.on(evtName, evt.bind(null));
        });
    } catch (e) {
        console.log(`An error occured while loading in the events. Process terminated. ${e}`);
    }
};
