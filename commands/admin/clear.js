const Discord = require('discord.js');

module.exports = {
    name: "clear",
    category: "Admin",
    aliases: ["purge", "delete"],
    description: "Delete a specified number of messages!",
    args: true,
    usage: "<amount> [user]",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsEmbed);

        if (Number.isInteger(parseInt(args[0]))) {

            var amount = parseInt(args[0]);
            var pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

            if (!pUser && !args[1]) {
                message.channel.bulkDelete(amount).then(() => {

                    if (args[0] <= 0) {
                        message.channel.send("\`\`\`🟠 Enter a number bigger then 0.\`\`\`").then(m => m.delete({ timeout: 2500 })).catch(err => {
                            message.channel.send(errorEmbed);
                        });
                    } else if (args[0] == 1) {
                        var clearEmbedOne = new Discord.MessageEmbed()
                            .setTitle(`Cleared ${amount} message.`)
                            .setDescription(`I cleared ${amount} message.`)
                            .setColor("GREEN")
                            .setTimestamp()
                            .setFooter(message.member.displayName);
                        message.channel.send(clearEmbedOne).then(msg => msg.delete({ timeout: 7000 }));
                    } else {
                        var clearEmbed = new Discord.MessageEmbed()
                            .setTitle(`Cleared ${amount} messages.`)
                            .setDescription(`I cleared ${amount} messages.`)
                            .setColor("GREEN")
                            .setTimestamp()
                            .setFooter(message.member.displayName);
                        message.channel.send(clearEmbed).then(msg => msg.delete({ timeout: 7000 }));
                    }
                }).catch(err => {
                    message.channel.send(errorEmbed);
                });
            } else if (pUser && args[1]) {

                let dMsg = 0;
                let oUser = 0;
                message.channel.messages.fetch({ limit: amount }).then(msgs => {
                    msgs.forEach(msg => {
                        if (msg.author.id == pUser.id && msg.author.id != client.user.id) {
                            msg.delete().catch((err) => {
                                message.channel.send(errorEmbed);
                            });
                            dMsg++
                        } else {
                            console.log("Couldnt delete message of: " + msg.author.tag)
                            oUser++
                        }
                    });
                }).then(() => {

                    if (args[0] <= 0) {
                        message.channel.send("\`\`\`🟠 Enter a number bigger then 0.\`\`\`").then(m => m.delete({ timeout: 2500 })).catch(err => {
                            message.channel.send(errorEmbed);
                        });
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
                }).catch(err => {
                    message.channel.send(errorEmbed);
                });
            }

        } else {
            return message.channel.send(errorEmbed);
        }

    }
}