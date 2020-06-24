const { MessageEmbed, version: djsversion, Client } = require('discord.js');
const client = new Client();
const { version } = require('../../../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
    name: "botinfo",
    category: "Normal",
    aliases: ["binfo", "bi"],
    description: "Get information about me!",
    guildOnly: true,
    run: async (message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {

        const core = os.cpus()[0];
        const embed = new MessageEmbed()
            .setTitle("Botinfo")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setColor(message.guild.me.displayHexColor || "BLUE")
            .addField('General', [
                `**❯ Client:** ${client.user.tag} | ${client.user.id}`,
                `**❯ Commands:** ${client.commands.size}`,
                `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()}`,
                `**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
                `**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**❯ Node.js:** ${process.version}`,
                `**❯ Version:** v${version}`,
                `**❯ Discord.js:** v${djsversion}`,
                '\u200b'
            ])
            .addField('System', [
                `**❯ Platform:** ${process.platform}`,
                `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                `**❯ CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${core.model}`,
                `\u3000 Speed: ${core.speed}MHz`
                // `**❯ CPU:**`,
                // `\u3000 Total: ${core.speed}MHz`,
                // `\u3000 Used: ${core.speed}MHz`,
            ])
            .setTimstamp()

        message.channel.send(embed);

    }
}