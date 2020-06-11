const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

    var botEmbed = new Discord.MessageEmbed()
        .setTitle("Server Info")
        .setDescription(`Server information about ${message.guild.name}`)
        .setColor("#0000ff")
        .addFields(
            { name: "Server name:", value: message.guild.name },
            { name: "Member count:", value: message.guild.memberCount },
            { name: "Server created at:", value: message.guild.createdAt },
            { name: "You joined at:", value: message.guild.joinedAt }
        )
        .addField("Bot name:", client.user.username)
        .setThumbnail(message.guild.iconURL)
        .setFooter(message.member.displayName)
        .setTimestamp();

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "serverinfo"
}