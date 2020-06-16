const Discord = require('discord.js');
const botConfig = require('./botConfig.json');

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

    channel.send({
        embed: {
            title: `${member.user.tag} joined`,
            thumbnail: {
                url: member.user.displayAvatarURL
            },
            description: `Welcome ${member.user.username}\n\nHave fun!\n\n\nMembercount: **${guild.memberCount} members.**`,
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
            thumbnail: {
                url: member.user.displayAvatarURL
            },
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

    var messageArray = message.content.split(" ");
    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    var args = messageArray.slice(1);
    var commands = client.commands.get(command.slice(prefix.length));
    if (commands) {
        message.delete();
        commands.run(client, message, args, prefix);
    }
});

client.login(process.env.token);
