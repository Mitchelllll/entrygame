const Discord = require('discord.js');
const emojis = require('././data/emojis.json');

const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./././data/warnings.json", "utf-8"));
module.exports.run = async (message, args) => {

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

module.exports.help = {
    name: 'warns',
    description: 'See the warns from a user or yourself!',
    usage: '[user]',
    guildOnly: true,
    cooldown: 10
}