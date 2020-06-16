const Discord = require('discord.js');
module.exports.run = async (client, message, args, prefix) => {

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
        const command = commandsList[i];

        if (command["category"] == "Normal commands") {
            normal += `\n**${prefix}${command["name"]}** - ${prefix}${command["aliases"]} - ${command["description"]}\n__${prefix}${command["usage"]}__\n\n`;
        } else if (command["category"] == "Admin commands") {
            admin += `\n**${prefix}${command["name"]}** - ${prefix}${command["aliases"]} - ${command["description"]}\n__${prefix}${command["usage"]}__\n\n`;
        } else if (command["category"] == "Fun commands") {
            admin += `\n**${prefix}${command["name"]}** - ${prefix}${command["aliases"]} - ${command["description"]}\n__${prefix}${command["usage"]}__\n\n`;
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