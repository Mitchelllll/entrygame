const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    var botEmbed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setColor("#0000ff")
        .addFields(         /* https://gyazo.com/ce411f07d186f7428dd1f4982f301b08 */
            { name: "Server ID:", value: message.guild.id },
            { name: "Server Owner:", value: message.guild.owner },
            { name: "Server Region:", value: message.guild.region },
            { name: "Server Created at:", value: message.guild.createdTimestamp() },
            // { name: "Amount humans:", value: message.guild.id },
            // { name: "Amount bots:", value: message.guild.id },
            // { name: "Amount online:", value: message.guild.id },
            // { name: "Text channels:", value: message.guild.id },
            // { name: "Voice channels:", value: message.guild.id },

            { name: "Member count:", value: message.guild.memberCount },
            { name: "You joined at:", value: message.guild.joinedTimestamp() },
            // { name: "Roles:", value: }
        )
        .addField("Bot name:", client.user.username)
        .setThumbnail(message.guild.iconURL)
        .setFooter(message.member.displayName)
        .setTimestamp();

    message.channel.send({embed: {
        title: message.guild.name,
        color: "#0000ff",
        fields: {
            name: "Server ID:", value: message.guild.id,
            name: "Server Owner:", value: message.guild.owner,
            name: "Server Region:", value: message.guild.region,
            name: "Server Created at:", value: message.guild.createdTimestamp,
            // name: "Amount humans:", value: message.guild.id,
            // name: "Amount bots:", value: message.guild.id,
            // name: "Amount online:", value: message.guild.id,
            // name: "Text channels:", value: message.guild.id,
            // name: "Voice channels:", value: message.guild.id,

            name: "Member count:", value: message.guild.memberCount,
            name: "You joined at:", value: message.guild.joinedTimestamp,
        },
        footer: {
            text: client.user.username
        },
        timestamp: new Date(),
        thumbnail: {
            url: message.guild.iconURL
        }
    }});

}

module.exports.help = {
    name: "serverinfo",
    aliases: ["sinfo"],
    description: "Get information about this server!",
    category: "Normal commands",
    usage: "serverinfo"
}