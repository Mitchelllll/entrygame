const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
    name: "help",
    category: "Normal",
    aliases: ["?", "commands", "cmds"],
    description: "A list with all my commands, or specific info about a command!",
    usage: "[command]",
    guildOnly: true,
    run: async (message, args, emojis, prefix) => {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => `\n\`${command.name}\` - *${command.description}*`));
            data.push(`\nYou can send \`${prefix}help [command]\` to get info on a specific command!`);

            return message.author.send({
                embed: {
                    title: "HELP command",
                    description: data,
                    color: "BLUE",
                    footer: {
                        text: message.member.displayName
                    }
                }
            })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.channel.send({
                        embed: {
                            title: "HELP command",
                            description: `${emojis.check} I have sent you a DM with all my commands!`,
                            color: "GREEN",
                            footer: {
                                text: message.member.displayName
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.channel.send({
                        embed: {
                            title: 'I can\'t reach your DMs, do you have DMs on?',
                            color: "RED",
                            footer: {
                                text: message.member.displayName
                            }
                        }
                    });
                });
        }
        const name = args.shift().toLowerCase();
        const command = await commands.get(name) || commands.get(command.aliases.get(name));

        if (!command) {
            return message.channel.send({
                embed: {
                    title: "ERROR",
                    description: `\`${name}\` is not an excisting commands.`,
                    color: "RED",
                    footer: {
                        text: message.member.displayName
                    }
                }
            });
        }

        data.push(`**Name:** \`${command.name}\``);

        if (command.aliases) data.push(`**Aliases:** \`${command.aliases.join(', ')}\``);
        if (command.description) data.push(`**Description:** *${command.description}*`);
        if (command.category) data.push(`**Category:** _${command.category}_`);
        if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

        message.author.send({
            embed: {
                title: `HELP command about \`${command.name}\``,
                description: `${data}\n\nWith: <> is required, [] is optional`,
                color: "BLUE",
                footer: {
                    text: message.member.displayName
                }
            }
        }).then(() => {
            message.channel.send({embed: {
                title: `HELP command about \`${command.name}\``,
                description: `I have sent you a DM with all the information about \`${command.name}\``
            }});
        });

    }
}