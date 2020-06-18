const Discord = require('discord.js');
module.exports.run = async (message, args) => {

    message.channel.send({
        embed: {
            title: message.guild.name,
            color: "#0000ff",
            fields: [
                { name: "Server ID:", value: message.guild.id },
                { name: "Server Owner:", value: message.guild.owner },
                { name: "Server Region:", value: message.guild.region },
                { name: "Server Created at:", value: message.guild.createdAt },
                // { name: "Amount humans:", value: message.guild.id },
                // { name: "Amount bots:", value: message.guild.id },
                // { name: "Amount online:", value: message.guild.id },
                // { name: "Text channels:", value: message.guild.id },
                // { name: "Voice channels:", value: message.guild.id },

                { name: "Member count:", value: message.guild.memberCount },
                { name: "You joined at:", value: message.guild.joinedAt },
            ],
            footer: {
                text: message.member.displayName
            },
            timestamp: new Date(),
            thumbnail: {
                url: message.guild.iconURL()
            }
        }
    });

    console.log(message.guild);

}

module.exports.help = {
    name: 'serverinfo',
    description: 'Get information about this server!',
    guildOnly: true,
    cooldown: 10,
    aliases: ['sinfo', 'si']
}