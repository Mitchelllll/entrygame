const Discord = require('discord.js');
const emojis = require('././data/emojis.json');

module.exports.run = async (message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to kick members.\`\`\`");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to kick members. Fix this problem before you try again.\`\`\`");

    var kickUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    var reason = args.slice(1).join(" ") || "No reason given.";
    if (!kickUser && args[0]) {
        message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
        return;
    } else if(kickUser) {
        kickUser.kick(reason).catch(err => {
            if (err) return message.channel.send("\`\`\`🔴 An error has occurred.\`\`\`")
        });

        message.channel.send({
            embed: {
                color: "RED",
                footer: {
                    text: message.member.displayName
                },
                description: `**Kicked:** ${kickUser} (${kickUser.id})\n**Kicked by:** ${message.author}\n**Reason:** ${reason}`
            }
        });
    }
}

module.exports.help = {
    name: 'kick',
    description: 'Kick a member!',
    args: true,
    usage: '<user>',
    guildOnly: true,
    cooldown: 0
}