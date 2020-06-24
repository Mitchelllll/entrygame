const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "ping",
    category: "Normal",
    description: "Check my respondtime!",
    run: async (message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        message.channel.send('🏓 Pinging...').then(msg => msg.edit({
            embed: {
                title: `🏓 Pong!`,
                description: `My ping is ${Math.round(client.ws.ping)}ms!`,
                timestamp: new Date(),
                color: "GREEN",
                footer: {
                    text: message.member.displayName
                }
            }
        }));

    }
}