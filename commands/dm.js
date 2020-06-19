const Discord = require('discord.js');
module.exports.run = async (message, args) => {

    var user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    var msg = args.slice(1).join(/ +/g);

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