const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

    try {

        var text = `**${client.user.username} Commands** \n\n **__Commands__** \n `
        message.author.send(text);
        message.channel.send(`\`\`\`An help list has been send to your mailbox (${message.author.diplayName})📬\`\`\``);

    } catch (error) {
        message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
    }

}

module.exports.help = {
    name: "help"
}