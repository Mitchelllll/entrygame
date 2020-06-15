const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    var userName = message.author.username;

    var ticketExcists = false;
    message.guild.channels.cache.forEach(channel => {
        if (channel.name == "ticket-" + userName.toLowerCase()) {
            ticketExcists = true;
            message.channel.send("You already have an open ticket.");
            return;
        }
    });

    if (ticketExcists) return;

    message.guild.channels.create("ticket-" + userName.toLowerCase(), { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            });

            createdChannel.updateOverwrite(message.author.id, {
                CREATE_INSTANT_INVITE: false,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                READ_MESSAGE_HISTORY: true,
                VIEW_CHANNEL: false,
                ADD_REACTIONS: true
            });

            createdChannel.send({
                embed: {
                    title: `Hello ${message.author.username}`,
                    description: "Staff is on it's way, wait patiently.",
                }
            });

            message.channel.send({
                embed: {
                    title: `Hello ${message.author.username}!`,
                    description: `Your ticket has been created! \n\n Ticket: ${createdChannel}`,
                }
            });

        }
    ).catch(err => {
        message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
    });

}

module.exports.help = {
    name: "ticket"
}