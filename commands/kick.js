const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to kick members.\`\`\`");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to kick members. Fix this problem before you try again.\`\`\`");
    if (!args[0]) return message.channel.send("\`\`\`🔴 You must give a member that you want to kick.\`\`\`");

    var kickUser = message.guild.member(message.mentions.users.first() || message.quild.members.get(args[0]));
    var reason = args.slice(1).join(" ") || "No reason given.";
    if (!kickUser) return message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
    var embedPrompt = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("React within 30 seconds")
        .setDescription(`Do you want to kick ${kickUser}?`)

    var embedKicked = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Kicked:** ${kickUser} (${kickUser.id})
        **Kicked by:** ${message.author}
        **Reason:** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        // var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

        // if (emoji === "✅") {
        //     msg.delete();
        //     kickUser.kick(reason).catch(err => {
        //         if (err) return message.channel.send("\`\`\`🔴 An error has occurred.\`\`\`");
        //     });

        //     message.channel.send(embedKicked);
        // } else if (emoji === "❌") {
        //     msg.delete();
        //     return message.channel.send("\`\`\`🟥 Kick has been cancelled.\`\`\`").then(m => m.delete(5000)).catch(err => {
        //         message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
        //     });
        // } else msg.delete(); message.channel.send("\`\`\`🟠 You need to click on one of the reactions to either confirm or cancel the kick.\`\`\`");

        message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(collected => {

            if (collected.first().content.toLocaleLowerCase() == "yes") {

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send("\`\`\`🔴 An error has occurred.\`\`\`")
                });

                message.channel.send(embedKicked);

            } else if (collected.first().content.toLocaleLowerCase() == "no") {

                message.channel.send("\`\`\`🟥 Kick has been cancelled\`\`\`").then(m => m.delete(5000));

            } else msg.delete(); message.channel.send("\`\`\`🟠 You need to react with 'yes' or 'no' to either confirm or cancel the kick.\`\`\`");

        }).catch(err => {
            message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
        });
    }).catch(err => {
        message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
    });
    async function promptMessage(message, author, time, reactions) {
        time *= 1000;
        for (const reaction of reactions) {
            await message.react(reaction);
        }

        var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

        return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name).catch(err => {
            message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
        });

    }
}

module.exports.help = {
    name: "kick",
    description: "Kick a member!",
    category: "Admin commands",
    usage: `kick <user>`
}