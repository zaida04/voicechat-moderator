const Guild = require("../Database/Models/Guild");
class DatabaseGuildManager {
	constructor() {

	}
	async get(id) {
		return Guild.findById(id);
	}
	async create(id) {
		return (new Guild({
			"_id": id,
			"settings": {
				"prefix": "g!",
				"threshold": "medium",
				"punishment": "vc_mute"
			}
		})).save();
	}
	async edit(id, {prefix = null, threshold = null, punishment = null}) {
		let update = {};
		prefix ? update["prefix"] : null;
		threshold ? update["threshold"] : null;
		punishment ? update["punishment"] : null;
		return Guild.findByIdAndUpdate(id, update);
	}
	async delete(id) {
		return Guild.findByIdAndDelete(id);
	}
}
module.exports = DatabaseGuildManager;