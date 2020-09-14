const { Schema, model } = require("mongoose");

const Guild = new Schema({
    _id: String,
    settings: {
        prefix: String,
        threshold: String,
        punishment: String,
        notifyChannel: {
            type: String,
            default: null,
        },
    },
});

export default model("Guild", Guild);
