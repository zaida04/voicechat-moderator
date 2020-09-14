const { Structures } = require("discord.js");

Structures.extend("Guild", (Guild: any) => {
    return class extends Guild {
        constructor(...args: any) {
            super(...args);
        }
        get prefix() {
            return getPrefix(this.client, this.id);
        }
        setPrefix(value: any) {
            return this.client.db.guilds.edit(this.id, {
                prefix: value,
            });
        }
        get threshold() {
            return getThreshold(this.client, this.id);
        }
        setThreshold(value: any) {
            return this.client.db.guilds.edit(this.id, {
                threshold: value,
            });
        }
        get punishment() {
            return getPunishment(this.client, this.id);
        }
        setPunishment(value: any) {
            return this.client.db.guilds.edit(this.id, {
                punishment: value,
            });
        }
        get notifyChannel() {
            return getNotifyChannel(this.client, this.id);
        }
        setNotify(id: any) {
            return this.client.db.guilds.edit(this.id, {
                notify: id,
            });
        }
        get settings() {
            return getSettings(this.client, this.id);
        }
        get details() {
            return getDetails(this.client, this.id);
        }
        get activeConnection() {
            return this.client.connections.guilds.get(this.id);
        }
        get activeVoice() {
            return this.client.connections.guilds.get(this.id)
                ? this.channels.cache.get(this.client.connections.guilds.get(this.id).activeChannelID)
                : null;
        }
    };
});

async function getNotifyChannel(client: { db: { guilds: { get: (arg0: any) => any } } }, id: any) {
    return (await client.db.guilds.get(id)).settings.notifyChannel;
}

async function getPrefix(client: { db: { guilds: { get: (arg0: any) => any; create: (arg0: any) => any } } }, id: any) {
    if (!(await client.db.guilds.get(id))) {
        return (await client.db.guilds.create(id)).settings.prefix;
    } else return (await client.db.guilds.get(id)).settings.prefix;
}
async function getThreshold(client: { db: { guilds: { get: (arg0: any) => any } } }, id: any) {
    return (await client.db.guilds.get(id)).settings.threshold;
}
async function getPunishment(client: { db: { guilds: { get: (arg0: any) => any } } }, id: any) {
    return (await client.db.guilds.get(id)).settings.punishment;
}
async function getSettings(client: { db: { guilds: { get: (arg0: any) => any } } }, id: any) {
    return (await client.db.guilds.get(id)).settings;
}
async function getDetails(client: { db: { guilds: { get: (arg0: any) => any } } }, id: any) {
    return await client.db.guilds.get(id);
}
