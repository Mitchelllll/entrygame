const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "Normal",
    aliases: ["sinfo", "si"],
    description: "Get information about this server!",
    guildOnly: true,
    run: async (message, args, emojis, prefix) => {
        var date = message.guild.createdAt;
        var search = /(.*)T(.*)\+/i;
        var result = date.match(search);

        var tempYear = result[1].split('-');
        var tempTime = result[2].split(':');

        var dutchDate = tempYear[2] + ' ' + tempYear[1] + ' ' + tempYear[0] + ' - ' + tempTime[0] + ':' + tempTime[1];

        var date2 = message.guild.createdAt;
        var search = /(.*)T(.*)\+/i;
        var result = date2.match(search);

        var tempYear = result[1].split('-');
        var tempTime = result[2].split(':');

        var dutchDate2 = tempYear[2] + ' ' + tempYear[1] + ' ' + tempYear[0] + ' - ' + tempTime[0] + ':' + tempTime[1];

        message.channel.send({
            embed: {
                title: message.guild.name,
                color: "#0000ff",
                thumbnail: {
                    url: message.guild.iconURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : null
                },
                fields: [
                    { name: "Server ID:", value: message.guild.id },
                    { name: "Server Owner:", value: message.guild.owner },
                    { name: "Server Region:", value: message.guild.region },
                    { name: "Server Created at:", value: dutchDate },
                    // { name: "Amount humans:", value: message.guild.id },
                    // { name: "Amount bots:", value: message.guild.id },
                    // { name: "Amount online:", value: message.guild.id },
                    // { name: "Text channels:", value: message.guild.id },
                    // { name: "Voice channels:", value: message.guild.id },

                    { name: "Member count:", value: message.guild.memberCount },
                    { name: "You joined at:", value: dutchDate2 },
                ],
                footer: {
                    text: message.member.displayName
                },
                timestamp: new Date()
            }
        });

    }
}