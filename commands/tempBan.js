const Discord = require('discord.js');
const emojis = require('./data/emojis.json');

const ms = require('ms');
module.exports.run = async (message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to tempban members.\`\`\`");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to tempban members. Fix this problem before you try again.\`\`\`");

    var tempbanUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!tempbanUser && args[0]) {
        message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
        return;
    } else if (tempbanUser) {
        if (tempbanUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("\`\`\`🟥 You can not tempban a staff member.\`\`\`");

        var tempbanTime = args[1];
        if (!tempbanTime) return message.channel.send('\`\`\`🟥 Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
        tempbanUser.ban();
        message.channel.send(`Succesfully tempbanned ${tempbanUser} for ${tempbanTime}.`);

        setTimeout(() => {

            message.guild.members.unban(tempbanUser);
            message.channel.send(`${tempbanUser}'s tempban has ended.`);

        }, ms(tempbanTime));

    }
}

module.exports.help = {
    name: 'tempban',
    description: 'Ban a member for a specified time!',
    args: true,
    usage: '<user> <time (s/m/h/d)>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['tban']
}