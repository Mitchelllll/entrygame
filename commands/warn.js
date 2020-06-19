const Discord = require('discord.js');
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./././data/warnings.json", "utf-8"));
module.exports.run = async (message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("you do not have permission to warn members.");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I do not have permission to warn members. Fix this problem before you try again.");

    var warnUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    var reason = args.slice(1).join(" ") || "No reason given.";
    if (!warnUser && args[0]) {
        message.channel.send("\`\`\`🔴 I couldn't find this member.\`\`\`");
        return;
    } else if (warnUser) {
        if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("\`\`\`🟥 You can not warn a staff member.\`\`\`");


        if (!warns[message.guild.id + warnUser.id]) warns[message.guild.id + warnUser.id] = {
            warnings: 0
        };

        warns[message.guild.id + warnUser.id].warnings++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        var embedWarned = new Discord.MessageEmbed()
            .setColor("RED")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Warned:** ${warnUser} (${warnUser.id})
        **Warned by:** ${message.author}
        **Reason:** ${reason}`)
            .addField("Amount of warns:", warns[message.guild.id + warnUser.id].warnings);
        message.channel.send(embedWarned)

        if (warns[message.guild.id + warnUser.id].warnings == 3) {

            var embedLastWarn = new Discord.MessageEmbed()
                .setColor("RED")
                .setFooter(warnUser.displayName)
                .setTimestamp()
                .setTitle("LAST WARNING ")
                .setDescription(`**If you get another warning, you will automatically get banned**`)
                .addField("Amount of warns", warns[message.guild.id + warnUser.id].warnings);
            message.channel.send(`${warnUser},`)
            message.channel.send(embedLastWarn);

        } else if (warns[message.guild.id + warnUser.id].warnings == 4) {

            message.guild.member(warnUser).ban(reason);
            warns[message.guild.id + warnUser.id] = {
                warnings: 0
            };
            var embedBanned = new Discord.MessageEmbed()
                .setColor("RED")
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Banned:** ${warnUser} (${warnUser.id})
            **Banned by:** ${message.author}
            **Reason:** ${reason}`);
            message.channel.send(embedBanned);

        }

    }
}

module.exports.help = {
    name: 'warn',
    description: 'Warn a member!',
    args: true,
    usage: '<user>',
    guildOnly: true,
    cooldown: 0
}