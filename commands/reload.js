// const Discord = require('discord.js');
// const { botOwner_ID, prefix } = require("../data/botConfig.json");
// module.exports = {
//     name: 'reload',
//     description: 'Reload a command!',
//     args: true,
//     usage: '<command>',
//     guildOnly: true,
//     cooldown: 10,
//     aliases: ['rl'],
//     execute(message, args) {

//         if (!message.author.id === botOwner_ID) return message.channel.send("You are not allowed to reload commands.");
//         if (!args.length) return message.channel.send("You must give a command name.");
//         const commandName = args[0].toLowerCase();
//         const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

//         if (!command) {
//             message.channel.send(`There is no command with name or alias \`${commandName}\`.`);
//         }

//         delete require.cache[require.resolve(`./${command.name}.js`)];
        
//         try {
//             const newCommand = require(`./${command.name}.js`);
//             message.client.commands.set(newCommand.name, newCommand);
//             message.channel.send(`Command \`${command.name}\` was reloaded!`);
//         } catch (error) {
//             console.log(error);
//             message.channel.send(`There was an error while reloading \`${command.name}\`:\n\`${error.message}\``);
//         }
//     },
// };


module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};