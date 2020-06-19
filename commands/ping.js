const Discord = require('discord.js');
const emojis = require('././data/emojis.json');

const client = new Discord.Client();

module.exports.run = async (message, args) => {

    message.channel.send(`🏓 Pong!\nI reacted in ${Date.now() - message.createdTimestamp}ms!`);

}

module.exports.help = {
    name: 'ping',
    description: 'Check my respondtime!',
    cooldown: 0
}