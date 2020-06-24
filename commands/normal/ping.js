const Discord = require('discord.js');

module.exports = {
    name: "ping",
    category: "Normal",
    description: "Check my respondtime!",
    run: async (message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        message.channel.send('🏓 Pinging...').then(msg => msg.edit({
            embed: {
                title: `🏓 Pong!`,
                description: `My ping is ${Date.now() - message.createdTimestamp}ms!`,
                timestamp: new Date(),
                color: "GREEN",
                footer: {
                    text: message.member.displayName
                }
            }
        }));

    }
}