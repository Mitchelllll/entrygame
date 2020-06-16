const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    message.channel.send({
        embed: {
            title: message.guild.name,
            color: "#0000ff",
            fields: [
                { name: "Server ID:", value: message.guild.id },
                { name: "Server Owner:", value: message.guild.owner },
                { name: "Server Region:", value: message.guild.region },
                { name: "Server Created at:", value: new Date() - message.guild.createdTimestamp },
                // { name: "Amount humans:", value: message.guild.id },
                // { name: "Amount bots:", value: message.guild.id },
                // { name: "Amount online:", value: message.guild.id },
                // { name: "Text channels:", value: message.guild.id },
                // { name: "Voice channels:", value: message.guild.id },

                { name: "Member count:", value: message.guild.memberCount },
                { name: "You joined at:", value: new Date() - message.guild.joinedTimestamp },
            ],
            footer: {
                text: message.member.displayName
            },
            timestamp: new Date(),
            thumbnail: {
                url: message.guild.iconURL
            }
        }
    });

}

module.exports.help = {
    name: "serverinfo",
    aliases: ["sinfo"],
    description: "Get information about this server!",
    category: "Normal commands",
    usage: "serverinfo"
}