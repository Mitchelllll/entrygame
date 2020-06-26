const Discord = require('discord.js');

module.exports = {
    name: "ping",
    category: "Normal",
    description: "Check my respondtime!",
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        message.channel.send({
            embed: {
                title: `🏓 Pinging...`,
                timestamp: new Date(),
                color: "GREEN",
                footer: {
                    text: message.member.displayName
                }
            }
        }).then(msg => msg.edit({
            embed: {
                title: `🏓 Pong!`,
                description: `My ping is ${client.ws.ping}ms!`,
                timestamp: new Date(),
                color: "GREEN",
                footer: {
                    text: message.member.displayName
                }
            }
        }));

    }
}