const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
    name: "help",
    category: "Normal",
    aliases: ["?", "commands", "cmds"],
    description: "A list with all my commands, or specific info about a command!",
    args: true,
    usage: "[command]",
    guildOnly: true,
    run: async (message, args, emojis) => {
        const data = [];
        const { commands } = message.client;
        var prefixes = JSON.parse(fs.readFileSync("./././data/botSettings.json"));
        var prefix = prefixes[message.guild.id].prefixes;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        const name = args.shift().toLowerCase();
        const command = await client.commands.get(name);
        if (!command) commandFile = client.commands.get(client.aliases.get(name));

        if (!command) {
            return message.channel.send(`${name} is not an excisting commands.`);
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.category) data.push(`**Category:** ${command.category}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });

    }
}