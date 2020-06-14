const Discord = require('discord.js');
const { prefix } = require('./botconfig.json');

const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("No files found");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} is ready!`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(ch => ch.name === '👋welcome');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);

    // const role = member.guild.roles.channel.cache.find(rl => rl.name === "member");
    // if (!role) return;
    // member.roles.add(role.name);
    
});

// client.on('guildMemberAdd', member => {

//     var role = member.guild.roles.cache.get('718584861518200866');
//     if (!role) return;
//     member.roles.add('role');

//     var channel = member.guild.channels.cache.get('718757526224502824');
//     if (!channel) return;
//     channel.send(`Welcome ${member}! \n Before you start make sure to read the rules. \n\n You are our **${message.guild.memberCount}** member!`);

// })

client.on("ready", () => {
    console.log(`${client.user.tag} is online!`)
    client.user.setPresence({
        game: {
            name: 'me being developed',
            type: 'WATCHING'
        },
        status: 'online'
    })
})

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // if (message.content.startsWith(`<@${client.id}>`)) {
    //     console.log("HI.")
    //     // message.channel.send(`You woke me up! Do you need me?`);
    // }

    var messageArray = message.content.split(" ");
    var command = messageArray[0];

    var args = messageArray.slice(1);
    var commands = client.commands.get(command.slice(prefix.length));
    if (commands) {
        message.delete();
        commands.run(client, message, args);
    }
});

client.login(process.env.token);