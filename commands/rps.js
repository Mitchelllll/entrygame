const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    if (!args[0]) return message.channel.send({
        embed: {
            title: "Rock Paper Scissor",
            description: `You need to enter one of these after the command:\n\n- Stone\n- Paper\n- Scissor\n\n${prefix}rps <rock/paper/scissor>`,
            timestamp: new Date(),
            footer: {
                text: message.author.username
            },
            color: "RED"
        }
    });
    var options = ["rock", "paper", "scissor"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == "ROCK") {
        if (result == "paper") {
            message.channel.send(`I choose ${result} :notepad_spiral:, so I won.`);
        } else if (result == "scissor") {
            message.channel.send(`I choose ${result} :scissors:, so you won.`);
        } else if (result == "rock") {
            message.channel.send(`I choose ${result} :moyai:, nobody won.`);
        }
    } else if (args[0].toUpperCase() == "PAPER") {
        if (result == "paper") {
            message.channel.send(`I choose ${result} :notepad_spiral:, nobody won.`);
        } else if (result == "scissor") {
            message.channel.send(`I choose ${result} :scissors:, so I won.`);
        } else if (result == "rock") {
            message.channel.send(`I choose ${result} :moyai:, so you won.`);
        }
    } else if (args[0].toUpperCase() == "SCISSOR") {
        if (result == "paper") {
            message.channel.send(`I choose ${result} :notepad_spiral:, so you won.`);
        } else if (result == "scissor") {
            message.channel.send(`I choose ${result} :scissors:, nobody won.`);
        } else if (result == "rock") {
            message.channel.send(`I choose ${result} :moyai:, so I won.`);
        }
    }

}

module.exports.help = {
    name: "rps",
    description: "Play rock paper scissor with me!",
    category: "Fun commands",
    usage: `rps <rock/paper/scissor>`
}