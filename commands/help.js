const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

    // try {

    //     var text = `**${client.user.username} Commands** \n\n **__Commands__** \n `
    //     message.author.send(text);
    //     message.channel.send(`\`\`\`An help list has been send to your mailbox (${message.author.username})📬\`\`\``);

    // } catch (error) {
    //     message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
    // }

    var commandsList = [];
    client.commands.forEach(command => {
        var constructor = {
            name: command.help.name,
            aliases: command.help.aliases,
            description: command.help.description,
            category: command.help.category,
            usage: command.help.usage
        }

        commandsList.push(constructor)

    });

    var response = `${client.user.username} Commands\n\n`
    var normal = "**Normal commands**";
    var admin = "**Admin commands**";

    for (let i = 0; i < commandsList.length; i++) {
        const element = commandsList[i];

        if (command["category"] == "Normal commands") {
            normal += `${prefix}${command["name"]} - ${prefix}${$command["aliases"]} - ${command["description"]}\n${prefix}${command["usage"]}\n\n`;
        } else if (command["category"] == "Admin commands") {
            admin += `${prefix}${command["name"]} - ${prefix}${$command["aliases"]} - ${command["description"]}\n${prefix}${command["usage"]}\n\n`;
        }
    }

    response += normal;
    response += admin;
    message.author.send(response).then(() => {
        message.channel.send("A help message has been send to your private messages 📬");
    }).catch(() => {
        message.channel.send("I could not drop the message in your private messages, so I send it here.").then(msg => msg.delete({ timeout: 5000 }));
        message.channel.send(response);
    });
}

module.exports.help = {
    name: "help",
    aliases: [],
    description: "Get a list with all the commands!",
    category: "normal commands",
    usage: "help"
}