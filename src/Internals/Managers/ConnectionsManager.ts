import { Guild } from "discord.js";
import { Collection, Client } from "discord.js";
import GuildConnections from "./GuildConnections";

class ConnectionsManager {
    _connections: any;
    constructor(client: Client) {
        Object.defineProperty(this, "client", client);
        this._connections = new Collection();
    }
    get guilds() {
        return this._connections;
    }
    add(guild: Guild) {
        if (!guild.me || !guild.me.voice.channel) return;
        if (!this.guilds.has(guild.id)) {
            let guild_connection = new GuildConnections({
                guild: guild,
                connection: guild.me.voice.connection,
                activeChannel: guild.me.voice.channel.id,
            });
            this.guilds.set(guild.id, guild_connection);
            return guild_connection;
        }
        return this.guilds.get(guild.id);
    }
    delete(guild: Guild) {
        if (this.guilds.has(guild.id)) return this.guilds.delete(guild.id);
    }
}

export default ConnectionsManager;
