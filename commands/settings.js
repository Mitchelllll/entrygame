const Discord = require('discord.js');
const fs = require("fs");
module.exports.run = async (client, message, args, prefix) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("\`\`\`🔴 You do not have permission to change the bot settings for this server.\`\`\`");

    var key = args[0];
    var value = args[1];

    if (!key) return message.channel.send({
        embed: {
            title: "Bot Settings",
            description: "You must give a key.\n\nYou can choose between:\n- prefixes",
            color: "RED"
        }
    });
    if (!value) return message.channel.send({
        embed: {
            title: "Bot Settings",
            description: `You must give the new value for ${key}`,
            color: "ORANGE"
        }
    });

    if (key == "prefix") {
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

    }
}

module.exports.help = {
    name: "settings",
    description: "Change the bot settings for this server!",
    category: "Admin commands",
    usage: `settings <key> <value>`
}