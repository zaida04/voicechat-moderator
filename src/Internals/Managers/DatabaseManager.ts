const mongoose = require("mongoose");
const { database_uri } = require("../../../config");
const GuildManager = require("../Managers/DatabaseGuildManager");
const Guild = require("../Database/Models/Guild");

class DatabaseManager {
    _guilds: any;
    _db: any;
    constructor() {
        mongoose.connect(database_uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        this._guilds = new GuildManager();
        this._db = mongoose.connection;
    }
    get db() {
        return this._db;
    }
    get guilds() {
        return this._guilds;
    }
    get raw() {
        return {
            Guild,
        };
    }
}

export default DatabaseManager;
