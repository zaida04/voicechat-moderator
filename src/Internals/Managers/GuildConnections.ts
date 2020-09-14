const { Collection } = require("discord.js");
const Connection = require("../Voice/Connection");

class GuildConnections {
    _members: any;
    _guild: any;
    _connection: any;
    _activeChannelID: any;
    _cases: any;
    constructor(data: { guild: any; connection: any; activeChannel: any }) {
        this._members = new Collection();
        this._guild = data.guild;
        this._connection = data.connection;
        this._activeChannelID = data.activeChannel;
        this._cases = new Collection();
    }

    punish(id: any, punishment: any) {
        if (this.cases.has(id)) {
            let retrieve = this.cases.get(id);
            retrieve.push(punishment);
            return this.cases.set(id, retrieve);
        }
        return this.cases.set(id, [punishment]);
    }
    get cases() {
        return this._cases;
    }
    get members() {
        return this._members;
    }
    get connection() {
        return this._connection;
    }
    get activeChannelID() {
        return this._activeChannelID;
    }
    get guild() {
        return this._guild;
    }
    add(member: { id: any; guild: { me: { voice: { connection: any } }; activeVoice: any } }) {
        if (!this.members.has(member.id)) {
            let member_connection = new Connection({
                guild: member.guild,
                connection: member.guild.me.voice.connection,
                member: member,
                channel: member.guild.activeVoice,
                guildConnection: this,
            });
            this.members.set(member.id, member_connection);
            return member_connection;
        }
        return this.members.get(member.id);
    }
    remove(member: { id: any }) {
        if (this.members.has(member.id)) return this.members.delete(member.id);
    }
}

export default GuildConnections;
