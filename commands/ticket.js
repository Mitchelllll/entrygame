const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketExcists = false;
    message.guild.cache.array.forEach(channel => {
        ticketExcists = true;
        message.channel.send("You already have an open ticket.");
        return;
    });

    if (ticketExcists) return;

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            (createdChannel) => {
                createdChannel.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                    SEND_MESSAGES: false,
                    VIEW_MESSAGES: false
                });

                createdChannel.updateOverwrite(message.author.id, {
                    CREATE_INSTAND_INVITE: false,
                    READ_MESSAGES: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                createdChannel.channel.send({
                    embed: {
                        title: `Hello ${message.author.username}`,
                        footer: {
                            text: `Staff is on it's way, wait patiently.`
                        }
                    }
                });

            }
        }
    )

    message.channel.send({
        embed: {
            title: `Hello ${message.author.username}!`,
            description: `Your ticket has been created!`,
            fiels: [
                {
                    name: `Ticket: ${createdChannel.name}`
                }
            ]
        }
    });

}

module.exports.help = {
    name: "ticket"
}