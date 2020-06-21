const Discord = require('discord.js');

const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./././data/warnings.json", "utf-8"));
module.exports = {
    name: "rwarns",
    category: "Admin",
    aliases: ["warnsr", "dwarns", "warnsd", "deletewarns", "removewarns"],
    description: "Remove all warns from a member or yourself!",
    args: true,
    usage: "<user>",
    guildOnly: true,
    run: async (message, args, emojis) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 You do not have permission to remove warns from members.\`\`\`");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("\`\`\`🔴 I do not have permission to remove warns from members. Fix this problem before you try again.\`\`\`");

        var reason = args.slice(1).join(" ") || "No reason given.";

        var warnUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        var warnUserMe = message.member;

        if (!warnUser && !args[0]) {

            if (!warns[message.guild.id + warnUserMe.id]) warns[message.guild.id + warnUserMe.id] = {
                warnings: 0
            };

            warns[message.guild.id + warnUserMe.id].warnings == 0;

            var embedWarnsRemovedMe = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Warns removed from:** ${warnUserMe} (${warnUserMe.id})
        **Warns removed by:** ${message.author}
        **Reason:** ${reason}`)
                .addField("Amount of warns:", warns[message.guild.id + warnUserMe.id].warnings);
            message.channel.send(embedWarnsRemovedMe);

        } else {

            if (!warns[message.guild.id + warnUser.id]) warns[message.guild.id + warnUser.id] = {
                warnings: 0
            };

            warns[message.guild.id + warnUser.id].warnings == 0;

            var embedWarnsRemoved = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Warns removed from:** ${warnUser} (${warnUser.id})
        **Warns removed by:** ${message.author}
        **Reason:** ${reason}`)
                .addField("Amount of warns:", warns[message.guild.id + warnUser.id].warnings);
            message.channel.send(embedWarnsRemoved);

        };


        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

    }
}