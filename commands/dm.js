const Discord = require('discord.js');
module.exports.run = async (message, args) => {

    var user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    var msg = args.slice(1).join(/ +/g);

    if (!msg) return message.channel.send({
        embed: {
            title: "Direct Message",
            description: `You need to enter a message that you want to send to ${author}`,
            color: "RED",
            timestamp: new Date(),
            footer: {
                text: message.member.displayName
            }
        }
    });

    message.user.send(msg);

}

module.exports.help = {
    name: 'dm',
    description: 'Send a dm to someone!',
    args: true,
    usage: '<user> <message>',
    cooldown: 10,
    aliases: ['send']
}