const Guild = require("../Database/Models/Guild");
class DatabaseGuildManager {
	constructor() {

	}
	get(id) {
		return Guild.findById(id);
	}
	create(id) {
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
		prefix ? update["settings.prefix"] = prefix : null;
		threshold ? update["settings.threshold"] = threshold: null;
		punishment ? update["settings.punishment"] = punishment: null;
		return await Guild.findByIdAndUpdate(id, update);
	}
	delete(id) {
		return Guild.findByIdAndDelete(id);
	}
}
module.exports = DatabaseGuildManager;