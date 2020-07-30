const { Schema, model } = require("mongoose");

const Guild = new Schema({
	_id: String,
	settings: {
		prefix: String,
		threshold: String,
		punishment: String,
		notifyChannel: {
			type: String,
			default: null
		}
	}
});

module.exports = model("Guild", Guild);