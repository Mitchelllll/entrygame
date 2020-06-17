const Discord = require('discord.js');
const botConfig = require('./botConfig.json');

const fs = require("fs").promises;
const path = require("path");

const client = new Discord.Client();
client.commands = new Map();

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) {
            registerCommands(path.join(dir, file));
        } else {
            if (file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);

            }
        }
    }
})()

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(ch => ch.name === '👋welcome');
    if (!channel) return;

    channel.send({
        embed: {
            title: `${member.user.tag} joined`,
            description: `Welcome ${member.user.username}\n\nHave fun!\n\n\nMembercount: **${member.guild.memberCount} members.**`,
            color: "GREEN",
            footer: {
                text: "Member Joined"
            },
            timestamp: new Date()
        }
    });

    const role = member.guild.roles.cache.find(rl => rl.name == "member");
    if (!role) return message.channel.send(`The role with the name ${role} does not excist.`);

    member.roles.add(role);

    // const role = member.guild.roles.channel.cache.find(rl => rl.name === "member");
    // if (!role) return;
    // member.roles.add(role.name);

});

client.on('guildMemberRemove', member => {

    const channel = member.guild.channels.cache.find(ch => ch.name === '👋welcome');
    if (!channel) return;

    channel.send({
        embed: {
            title: `${member.user.tag} leaved`,
            description: `Goodbye ${member.user.username}\n\nWe will miss you!`,
            color: "RED",
            footer: {
                text: "Member Leaved"
            },
            timestamp: new Date()
        }
    });
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
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var msg = message.content.toLocaleLowerCase().split(" ");
    for (let i = 0; i < swearWords["swearwords"].length; i++) {
        if (msg.includes(swearWords["swearwords"][i])) {
            message.delete();
            message.reply("Your message has been deleted because it included one or multiple swearwords.").then(msg => msg.delete({ timeout: 3000 })).catch(err => {
                message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
            });
        }

    }

    // if (message.content.includes(client.user)) {
    //     console.log("HI.")
    //     // message.channel.send(`You woke me up! Do you need me?`);
    // }

    var prefixes = JSON.parse(fs.readFileSync("./data/botSettings.json"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;

    // var messageArray = message.content.split(" ");
    // var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    var cmdArgs = message.content.substring(message.content.indexOf(prefix) + 1).split(new RegExp(/\s+/));
    var cmdName = cmdArgs.shift();
    if (client.commands.get(cmdName)) {
        message.delete();
        client.commands.get(cmdName).run(client, message, cmdArgs, prefix);
    } else {

    }
});

client.login(process.env.token);
