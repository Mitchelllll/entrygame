const { Schema, model } = require("mongoose");
const defPrefix = require('../data/botConfig.json').prefix;
const Guild = Schema({
    id: String,
    prefix: {
        default: defPrefix,
        type: String
    }
});

module.exports = model("settings", Guild);