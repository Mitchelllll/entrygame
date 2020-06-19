const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { botOwner_ID } = require("../data/botConfig.json");
module.exports.run = async (message, args) => {

    if (!message.author.id === botOwner_ID) return message.channel.send("You are not allowed to reload commands.");
    if (!args.length) return message.channel.send("You must give a command name.");
    let command = args.shift().toLowerCase();
    let commandFile = await client.commands.get(command) || client.commands.find(cmds => cmds.aliases && cmds.aliases.includes(command));

    if (!commandFile) {
        message.channel.send(`There is no command with name or alias \`${command}\`.`);
    }

    delete require.cache[require.resolve(`./${command}.js`)];

    try {
        const newCommand = require(`./${command}.js`);
        message.client.commands.set(newCommand.name, newCommand);
        message.channel.send(`Command \`${command}\` was reloaded!`);
    } catch (error) {
        console.log(error);
        message.channel.send(`There was an error while reloading \`${command}\`:\n\`${error.message}\``);
    }


}

module.exports.help = {
    name: 'reload',
    description: 'Reload a command!',
    args: true,
    usage: '<command>',
    guildOnly: true,
    cooldown: 10,
    aliases: ['rl']
}