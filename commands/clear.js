const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you do not have permissions to delete messages.");
    if (!args[0]) return message.channel.send("🟠 Give a number.");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]);
        var pUser = message.guild.member(message.mentions.users.first());

        if (!pUser && !args[1]) {
            await message.channel.bulkDelete(amount).then(() => {

                if (args[0] <= 0) {
                    message.channel.send("\`\`\`🟠 Enter a number bigger then 0.\`\`\`").then(m => m.delete({ timeout: 2500 }));
                } else if (args[0] == 1) {
                    var clearEmbedOne = new Discord.MessageEmbed()
                        .setTitle(`Cleared ${amount} message.`)
                        .setDescription(`I cleared ${amount} message.`)
                        .setColor("GREEN")
                        .setTimestamp()
                        .setFooter(message.member.displayName);
                    message.channel.send(clearEmbedOne);
                } else {
                    var clearEmbed = new Discord.MessageEmbed()
                        .setTitle(`Cleared ${amount} messages.`)
                        .setDescription(`I cleared ${amount} messages.`)
                        .setColor("GREEN")
                        .setTimestamp()
                        .setFooter(message.member.displayName);
                    message.channel.send(clearEmbed);
                }
            });
        } else if(pUser && args[1]) {

            let dMsg = 0;
            let oUser = 0;
            message.channel.messages.fetch({ limit: amount }).then(msgs => {
                msgs.forEach(msg => {
                    if (msg.author.id == pUser.id && msg.author.id != client.user.id) {
                        msg.delete().then(() => {
                            // console.log("deleted: " + msg.content)
                        })
                        dMsg++
                    } else {
                        console.log("Couldnt delete message of: " + msg.author.tag)
                        oUser++
                    }
                });
            }).then(() => {

                if (args[0] <= 0) {
                    message.channel.send("\`\`\`🟠 Enter a number bigger then 0.\`\`\`").then(m => m.delete({ timeout: 2500 }));
                } else if (args[0] == 1) {
                    var clearEmbedOne = new Discord.MessageEmbed()
                        .setTitle(`Cleared ${dMsg - 1} message.`)
                        .setDescription(`I cleared ${dMsg - 1} message from ${pUser.user.tag}.`)
                        .setColor("GREEN")
                        .setTimestamp()
                        .setFooter(message.member.displayName);
                    message.channel.send(clearEmbedOne);
                } else {
                    var clearEmbed = new Discord.MessageEmbed()
                        .setTitle(`Cleared ${dMsg} messages.`)
                        .setDescription(`I cleared ${dMsg} messages from ${pUser.user.tag}.`)
                        .setColor("GREEN")
                        .setTimestamp()
                        .setFooter(message.member.displayName);
                    message.channel.send(clearEmbed);
                }
            });
        }

    } else {
        return message.channel.send("\`\`\`🔴 Enter a valid number.\`\`\`");
    }

}

module.exports.help = {
    name: "clear"
}