const Discord = require('discord.js');

const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./././data/warnings.json", "utf-8"));
module.exports = {
    name: "warns",
    category: "Normal",
    description: "See the warns from a member or yourself!",
    args: true,
    usage: ["user"],
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        var warnListUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        var warnListUserMe = message.member;

        if (!warnListUser && !args[0]) {

            if (!warns[message.guild.id + warnListUserMe.id]) warns[message.guild.id + warnListUserMe.id] = {
                warnings: 0
            };

            var embedWarnsMe = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setFooter(warnListUserMe.displayName)
                .setTimestamp()
                .setDescription(`**Member name:** ${warnListUserMe} (${warnListUserMe.id})
        **Amount of warns:** ${warns[message.guild.id + warnListUserMe.id].warnings}`)
            message.channel.send(embedWarnsMe);

        } else {

            if (!warns[message.guild.id + warnListUser.id]) warns[message.guild.id + warnListUser.id] = {
                warnings: 0
            };

            var embedWarns = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setFooter(warnListUser.displayName)
                .setTimestamp()
                .setDescription(`**Member name:** ${warnListUser} (${warnListUser.id})
        **Amount of warns:** ${warns[message.guild.id + warnListUser.id].warnings}`)
            message.channel.send(embedWarns);

        }
    }
}