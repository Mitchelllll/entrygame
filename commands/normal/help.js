const Discord = require("discord.js");
const client = new Discord.Client();
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h", "?", "commands"],
    category: "Normal",
    description: "Returns all commands, or one specific command info",
    usage: "[command]",
    guildOnly: true,
    run: async (message, args, emojis, prefix) => {
        if (args[0]) {
            return getCMD(message, args[0], emojis, prefix);
        } else {
            return getAll(message, emojis, prefix);
        }
    }
}

async function getAll(message, emojis, prefix) {
    const embed = new Discord.MessageEmbed()
        .setColor("BLUE")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

async function getCMD(message, input, emojis, prefix) {
    const embed = new Discord.MessageEmbed()

    // const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    // let info = `No information found for command **${input.toLowerCase()}**`;

    // if (!cmd) {
    //     return message.channel.send(embed.setColor("RED").setDescription(info));
    // }

    // if (cmd.name) info = `**Command name**: ${cmd.name}`;
    // if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    // if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    // if (cmd.usage) {
    //     info += `\n**Usage**: ${cmd.usage}`;
    //     embed.setFooter(`Syntax: <> = required, [] = optional`);
    // }

    // return message.channel.send(embed.setColor("GREEN").setDescription(info));

    const name = args.shift().toLowerCase();
    const command = await commands.get(name) || commands.get(command.aliases.get(name));

    if (!command) {
        return message.channel.send({
            embed: {
                color: "RED",
                description: `No information found for command **${input.toLowerCase()}**`,
                timestamp: new Date()
            }
        });
    }
    const helpcmd = new Discord.MessageEmbed()

    info = `**Name:** ${command.name}`;

    if (command.aliases) info += `\n**Aliases:** ${command.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (command.description) info += `\n**Description:** ${command.description}`;
    if (command.category) info += `\n**Category:** ${command.category}`;
    if (command.usage) info += `\n**Usage:** ${prefix}${command.name} ${command.usage}`;
    helpcmd.setFooter('<> = required, [] = optional');

    message.author.send(helpcmd.setColor("GREEN").setDescription(info)).then(() => {
        message.channel.send(`I have sent you a DM with all the information about ${command.name}`);
    });


}






// const Discord = require('discord.js');
// const fs = require("fs");

// module.exports = {
//     name: "help",
//     category: "Normal",
//     aliases: ["?", "commands", "cmds"],
//     description: "A list with all my commands, or specific info about a command!",
//     usage: "[command]",
//     guildOnly: true,
//     run: async (message, args, emojis, prefix) => {
//         const data = [];
//         const { commands } = message.client;
//         // var prefixes = JSON.parse(fs.readFileSync("./././data/botSettings.json"));
//         // var prefix = prefixes[message.guild.id].prefixes;

//         if (!args.length) {
//             data.push('Here\'s a list of all my commands:');
//             data.push(commands.map(command => command.name).join('\n'));
//             data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

//             return message.author.send(data, { split: true })
//                 .then(() => {
//                     if (message.channel.type === 'dm') return;
//                     message.channel.send('I have sent you a DM with all my commands!');
//                 })
//                 .catch(error => {
//                     console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
//                     message.channel.send('I can\'t reach your DMs, do you have DMs on?');
//                 });
//         }
        // const name = args.shift().toLowerCase();
        // const command = await commands.get(name) || commands.get(command.aliases.get(name));

        // if (!command) {
        //     return message.channel.send(`${name} is not an excisting commands.`);
        // }

        // data.push(`**Name:** ${command.name}`);

        // if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        // if (command.description) data.push(`**Description:** ${command.description}`);
        // if (command.category) data.push(`**Category:** ${command.category}`);
        // if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        // message.author.send(data, { split: true }).then(() => {
        //     message.channel.send(`I have sent you a DM with all the information about ${command.name}`);
        // });

//     }
// }