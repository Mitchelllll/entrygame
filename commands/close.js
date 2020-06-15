const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

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

module.exports.help = {
    name: "close",
    aliases: ["delete"],
    description: "Close a ticket!",
    category: "Admin commands",
    usage: `${prefix}close`,
    usage: `${prefix}close`
}