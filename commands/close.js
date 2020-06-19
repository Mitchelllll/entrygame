const Discord = require('discord.js');
const emojis = require('././data/emojis.json');

module.exports.run = async (message, args) => {

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
    name: 'close',
    description: 'Close a ticket!',
    guildOnly: true,
    cooldown: 20
}