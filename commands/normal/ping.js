const Discord = require('discord.js');

module.exports = {
    name: "ping",
    category: "Normal",
    description: "Check my respondtime!",
    run: async (message, args, emojis, prefix) => {
        message.channel.send(`🏓 Pong!\nI reacted in ${Date.now() - message.createdTimestamp}ms!`);

    }
}