const Discord = require('discord.js');
const ms = require('ms');
module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to tempmute members.\`\`\`");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to tempmute members. Fix this problem before you try again.\`\`\`");
    if (!args[0]) return message.channel.send("\`\`\`🔴 You must give a member that you want to tempmute.\`\`\`");

    var tempmuteUser = message.guild.member(message.mentions.users.first() || message.quild.members.get(args[0]));
    if (!tempmuteUser) return message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
    if (tempmuteUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("\`\`\`🟥 You can not tempmute a staff member.\`\`\`");

    var muteRole = message.guild.roles.cache.get('719919298201518152')

    var tempmuteTime = args[1];
    if (!tempmuteTime) return message.channel.send('\`\`\`🟥 Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
    await (tempmuteUser.roles.add(muteRole.id));
    message.channel.send(`Succesfully tempmuted ${tempmuteUser} for ${tempmuteTime}.`);

    setTimeout(() => {
        tempmuteUser.roles.remove(muteRole.id);
        message.channel.send(`${tempmuteUser}'s tempmute has ended.`);
    }, ms(tempmuteTime));

}

module.exports.help = {
    name: "tempmute"
}