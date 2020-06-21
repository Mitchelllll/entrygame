const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "ping",
    category: "Normal",
    description: "Check my respondtime!",
    run: async (message, args, emojis) => {
        message.channel.send(`🏓 Pong!\nI reacted in ${client.ws.ping}ms!`);

    }
}