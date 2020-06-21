const Discord = require('discord.js');

module.exports = {
    name: "close",
    category: "Admin",
    description: "Close a ticket!",
    guildOnly: true,
    run: async (message, args, emojis) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to close tickets.\`\`\`")
        if (message.channel.name.startsWith("ticket-")) {
            message.channel.delete();
        } else {
            message.channel.send({
                embed: {
                    title: "This is not a ticket",
                    description: `The channel ${message.channel} is not a ticket.\n\n You can only use this command in tickets.`,
                    color: "RED"
                }
            });
        }

    }
}