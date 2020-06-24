const Discord = require('discord.js');

module.exports = {
    name: "kick",
    category: "Admin",
    description: "Kick a member!",
    args: true,
    usage: "<user> [reason]",
    guildOnly: true,
    run: async (message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(noPermsEmbed);
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to kick members. Fix this problem before you try again.\`\`\`");

        var kickUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        var reason = args.slice(1).join(" ") || "No reason given.";
        if (!kickUser && args[0]) {
            message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
            return;
        } else if (kickUser) {
            kickUser.kick(reason).catch(err => {
                if (err) return message.channel.send(errorEmbed)
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
}