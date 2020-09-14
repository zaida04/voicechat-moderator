import { Guild } from "discord.js";

export default async (guild: Guild) => {
    if (await guild.client.db.guilds.get(guild.id)) return guild.client.db.guilds.delete(guild.id);
};
