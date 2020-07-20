const { Schema, model } = require("mongoose");

const Guild = new Schema({
	_id: String,
	settings: {
		prefix: String,
		threshold: String,
		punishment: String
	}
});

module.exports = model("Guild", Guild);