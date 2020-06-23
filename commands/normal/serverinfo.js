const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "Normal",
    aliases: ["sinfo", "si"],
    description: "Get information about this server!",
    guildOnly: true,
    run: async (message, args, emojis, prefix) => {

        let time = message.guild.createdAt.toTimeString("nl-NL", {timeZone: "Europe/Amsterdam"});
        let date = message.guild.createdAt.toDateString("nl-NL", {timeZone: "Europe/Amsterdam"});
        let str = `${time}: ${date}`

        let time2 = message.member.joinedAt.toTimeString("nl-NL", {timeZone: "Europe/Amsterdam"});
        let date2 = message.member.joinedAt.toDateString("nl-NL", {timeZone: "Europe/Amsterdam"});
        let str2 = `${time2}: ${date2}`

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
                    { name: "Server Created at:", value: str },
                    // { name: "Amount humans:", value: message.guild.id },
                    // { name: "Amount bots:", value: message.guild.id },
                    // { name: "Amount online:", value: message.guild.id },
                    // { name: "Text channels:", value: message.guild.id },
                    // { name: "Voice channels:", value: message.guild.id },

                    { name: "Member count:", value: message.guild.memberCount },
                    { name: "You joined at:", value: str2 },
                ],
                footer: {
                    text: message.member.displayName
                },
                timestamp: new Date()
            }
        });

    }
}