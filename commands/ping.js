const Discord = require('discord.js');
module.exports.run = async (message, args) => {

    message.channel.send(`🏓 Pong!\nI reacted in ${parseInt(client.ws.ping)}ms!`);

}

module.exports.help = {
    name: 'ping',
    description: 'Check my respondtime!',
    cooldown: 0
}