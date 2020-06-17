const Discord = require('discord.js');
const fs = require("fs");
const { prefix } = require("././data/botConfig.json");
module.exports = {
    name: 'settings',
    description: 'Change the bot settings for this server!',
    usage: '<key> <value>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['config', 'setup'],
    execute(message, args) {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("\`\`\`🔴 You do not have permission to change the bot settings for this server.\`\`\`");

        var key = args[0];
        var value = args[1];

        if (!key) return message.channel.send({
            embed: {
                title: "Bot Settings",
                description: "You must give a key.\n\nYou can choose from:\n- prefix",
                color: "RED"
            }
        });

        if (key == "prefix") {

            if (!value) return message.channel.send({
                embed: {
                    title: "Bot Settings",
                    description: `In case you wonder what the prefix is, it is ${prefix}\n\nIf you want to change this, you must give the new value for ${key}.\n${prefix}settings <key> <value>`,
                    color: "ORANGE"
                }
            });

            var prefixes = JSON.parse(fs.readFileSync("././data/botSettings.json"));
            prefixes[message.guild.id] = {
                prefixes: value
            };

            fs.writeFileSync("././data/botSettings.json", JSON.stringify(prefixes), (err) => {
                if (err) message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
            });

            message.channel.send({
                embed: {
                    title: `${key} changed`,
                    description: `The ${key} has been changed to ${value}`,
                    color: "GREEN"
                }
            });

        } else {
            message.channel.send({
                embed: {
                    title: "Bot Settings",
                    description: "You must give a valid key.\n\nYou can choose between:\n- prefix",
                    color: "RED"
                }
            });
        }
    },
};