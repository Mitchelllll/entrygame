const Discord = require('discord.js');

const fs = require("fs");
module.exports = {
    name: "settings",
    category: "Admin",
    aliases: ["config", "setup"],
    description: "Change the bot settings for this server!",
    args: true,
    usage: "<key> <value>",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        // if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(noPermsEmbed);

        // var key = args[0];
        // var value = args[1];

        // if (!key) return message.channel.send({
        //     embed: {
        //         title: "Bot Settings",
        //         description: "You must give a key.\n\nYou can choose from:\n- prefix",
        //         color: "RED"
        //     }
        // });

        // if (key == "prefix") {

        //     var prefixes = JSON.parse(fs.readFileSync("./././data/botSettings.json"));
        //     var prefix = prefixes[message.guild.id].prefixes;

        //     if (!value) return message.channel.send({
        //         embed: {
        //             title: "Bot Settings",
        //             description: `In case you wonder what the prefix is, it is ${prefix}\n\nIf you want to change this, you must give the new value for ${key}.\n${prefix}settings <key> <value>`,
        //             color: "ORANGE"
        //         }
        //     });

        //     var prefixes = JSON.parse(fs.readFileSync("././data/botSettings.json"));
        //     prefixes[message.guild.id] = {
        //         prefixes: value
        //     };
        //     var prefix = prefixes[message.guild.id].prefixes;

        //     fs.writeFileSync("././data/botSettings.json", JSON.stringify(prefixes), (err) => {
        //         if (err) message.channel.send(errorEmbed);
        //     });

        //     message.channel.send({
        //         embed: {
        //             title: `Prefix changed`,
        //             description: `The prefix has been changed to ${prefix}`,
        //             color: "GREEN"
        //         }
        //     });

        // } else {
        //     message.channel.send({
        //         embed: {
        //             title: "Bot Settings",
        //             description: "You must give a valid key.\n\nYou can choose between:\n- prefix",
        //             color: "RED"
        //         }
        //     });
        // }
    }
}