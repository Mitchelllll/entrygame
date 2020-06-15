const Discord = require('discord.js');
const ms = require('ms');
module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to tempban members.\`\`\`");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to tempban members. Fix this problem before you try again.\`\`\`");
    if (!args[0]) return message.channel.send("\`\`\`🔴 You must give a member that you want to tempban.\`\`\`");

    var tempbanUser = message.guild.member(message.mentions.users.first() || message.quild.members.get(args[0]));
    if (!tempbanUser) return message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
    if (tempbanUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("\`\`\`🟥 You can not tempban a staff member.\`\`\`");

    var tempbanTime = args[1];
    if (!tempbanTime) return message.channel.send('\`\`\`🟥 Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
    tempbanUser.ban();
    message.channel.send(`Succesfully tempbanned ${tempbanUser} for ${tempbanTime}.`);

    setTimeout(() => {

        message.guild.members.unban(tempbanUser);
        message.guild.member(tempbanUser).createDM().then(dm => dm.send('Zie je dit?'));
        // message.guild.member(tempbanUser).send('Zie je dit?');
        message.channel.send(`${tempbanUser}'s tempban has ended.`);
    }, ms(tempbanTime));

}

module.exports.help = {
    name: "tempban"
}