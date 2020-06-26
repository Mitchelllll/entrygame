const Discord = require('discord.js');

module.exports = {
    name: "rps",
    category: "Fun",
    aliases: ["sps"],
    description: "Play rock paper scissor against me!",
    args: true,
    usage: "<rock/paper/scissor>",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        var options = ["rock", "paper", "scissor"];
        var result = options[Math.floor(Math.random() * options.length)];
        if (!args[0]) return;

        if (args[0].toUpperCase() == "ROCK") {
            if (result == "paper") {
                message.channel.send(`You choose rock :moyai:, I choose ${result} :notepad_spiral:, so I won.`);
            } else if (result == "scissor") {
                message.channel.send(`You choose rock :moyai:, I choose ${result} :scissors:, so you won.`);
            } else if (result == "rock") {
                message.channel.send(`You choose rock :moyai:, I choose ${result} :moyai:, nobody won.`);
            }
        } else if (args[0].toUpperCase() == "PAPER") {
            if (result == "paper") {
                message.channel.send(`You choose paper :notepad_spiral:, I choose ${result} :notepad_spiral:, nobody won.`);
            } else if (result == "scissor") {
                message.channel.send(`You choose paper :notepad_spiral:, I choose ${result} :scissors:, so I won.`);
            } else if (result == "rock") {
                message.channel.send(`You choose paper :notepad_spiral:, I choose ${result} :moyai:, so you won.`);
            }
        } else if (args[0].toUpperCase() == "SCISSOR") {
            if (result == "paper") {
                message.channel.send(`You choose scissor :scissors:, I choose ${result} :notepad_spiral:, so you won.`);
            } else if (result == "scissor") {
                message.channel.send(`You choose scissor :scissors:, I choose ${result} :scissors:, nobody won.`);
            } else if (result == "rock") {
                message.channel.send(`You choose scissor :scissors:, I choose ${result} :moyai:, so I won.`);
            }
        } else {
            message.channel.send({
                embed: {
                    title: `Rock paper scissor`,
                    description: `You can't choose \`${args.slice(0).join(" ")}\`.\nObviously you can only choose from:\n- Rock\n- Paper\n- Scissor`,
                    color: "RED",
                    timestamp: new Date()
                }
            });
        }

    }
}