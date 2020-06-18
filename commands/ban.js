const Discord = require('discord.js');
module.exports = class ban {
    constructor(){
    this.name = 'ban',
    this.description = 'Ban a member!',
    this.args = true,
    this.usage = '<user> [reason]',
    this.guildOnly = true,
    this.cooldown = 0
    }
    run(message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to ban members.\`\`\`");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to ban members. Fix this problem before you try again.\`\`\`");

        var banUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        var reason = args.slice(1).join(" ") || "No reason given.";
        if (!banUser) return message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");

        banUser.ban(reason).catch(err => {
            if (err) return message.channel.send("\`\`\`🔴 An error has occurred.\`\`\`");
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
};