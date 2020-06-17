const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to send embeds.\`\`\`");
    var seperator = "|";

    if (args[0] == null) {
        return message.channel.send({
            embed: {
                title: "Usage:",
                description: `Create an embed by doing the following: \n${prefix}embed <title> ${seperator} <message> ${seperator} <color> ${seperator} <channel>`,
                color: "ff0000",
                footer: {
                    text: message.member.displayName
                },
                timestamp: new Date()
            }
        });
    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#0B33BF";
    if (argsList[3] === undefined) argsList[3] = "general";

    var options = {
        title: argsList[0],
        message: argsList[1] || "",
        color: argsList[2].trim(),
        channel: argsList[3].trim()
    }

    var channel = message.member.guild.channels.cache.find(ch => ch.name === options.channel);
    if (!channel) return message.channel.send("\`\`\`🔴 This channel does not excist.\`\`\`");

    return channel.send({
        embed: {
            title: options.title,
            color: options.color,
            description: options.message,
            footer: {
                text: message.member.displayName
            },
            timestamp: new Date()
        }
    })

}

module.exports.help = {
    name: "embed",
    description: "Send a nice message!",
    category: "Admin commands",
    usage: `embed <title> | [message] | [color] | [channel]`
    
}