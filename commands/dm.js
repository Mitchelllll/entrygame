const Discord = require('discord.js');
module.exports.run = async (message, args) => {

    var user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    var msg = args.slice(1).join(" ");

    if (!msg) return message.channel.send({
        embed: {
            title: "Direct Message",
            description: `You need to enter a message that you want to send to ${user}`,
            color: "RED",
            timestamp: new Date(),
            footer: {
                text: message.member.displayName
            }
        }
    });
    user.send(msg);
    message.channel.send({
        embed: {
            title: `Succesfully send a message to ${user} (${user.id})`,
            description: `Message content:\n${msg}\n\nThis message will be deleted in 10 seconds, so ${user} will never find out.`,
            color: "GREEN",
            timestamp: new Date()
        }
    }).then(msg => msg.delete({ timeout: 10000 }));

}

module.exports.help = {
    name: 'dm',
    description: 'Send a dm to someone!',
    args: true,
    usage: '<user> <message>',
    cooldown: 10,
    aliases: ['send']
}