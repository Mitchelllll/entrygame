const Discord = require('discord.js');
module.exports.run = async (message, args) => {

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
    }

}

module.exports.help = {
    name: 'rps',
    description: 'Play rock paper scissor with me!',
    args: true,
    usage: '<rock/paper/scissor>',
    cooldown: 3,
    aliases: ['sps']
}