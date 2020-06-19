const Discord = require('discord.js');
const emojis = require('././data/emojis.json');

var seperator = "|";
module.exports.run = async (message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to send embeds.\`\`\`");

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
    name: 'embed',
    description: 'Send a nice message!',
    args: true,
    usage: `<title> ${seperator} <message> ${seperator} [color] ${seperator} [channel]`,
    cooldown: 20,
    aliases: ['say']
}