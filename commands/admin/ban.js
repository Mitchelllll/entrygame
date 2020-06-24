const Discord = require('discord.js');

module.exports = {
    name: "ban",
    category: "Admin",
    description: "Ban a member!",
    args: true,
    usage: "<user> [reason]",
    guildOnly: true,
    run: async (message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noPermsEmbed)
        // if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to ban members. Fix this problem before you try again.\`\`\`");

        var banUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        var reason = args.slice(1).join(" ") || "No reason given.";
        if (!banUser && args[0]) {
            message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
            return;
        } else if (banUser) {
            banUser.ban(reason).catch(err => {
                if (err) return message.channel.send(errorEmbed);
            });

            message.channel.send({
                embed: {
                    color: "RED",
                    footer: {
                        text: message.member.displayName
                    },
                    description: `**Banned:** ${banUser} (${banUser.id})\n**Banned by:** ${message.author}\n**Reason:** ${reason}`
                }
            });
        }

    }
}