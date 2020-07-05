const { Schema, model } = require("mongoose");
const Level = Schema({
    userID: String,
    guildID: String,
    exp: Number,
    // level: Number
});

module.exports = model("level", Level);