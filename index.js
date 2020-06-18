const Discord = require('discord.js');
const botConfig = require('./data/botConfig.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const fs = require("fs");

fs.readdir("./commands/", (error, files) => {
    if (error) return console.log(error);
    let fileCut = files.filter(file => file.split(".").pop() === "js");
    if (fileCut.length <= 0) return console.log("No files to show");
    fileCut.forEach((file) => {
        let cmd = require(`./commands/${file}`);
        let cmdName = file.split(".")[0];
        console.log(`Loaded command: "${cmdName}".`);
        client.commands.set(cmd.help.name, cmd);
    });
    console.log(" ");
});

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
            timestamp: new Date(),
            thumbnail: {
                url: member.avatarURL()
            }
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
            timestamp: new Date(),
            thumbnail: {
                url: member.avatarURL()
            }
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

    var prefixes = JSON.parse(fs.readFileSync("./data/botSettings.json"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let commandFile = await client.commands.get(command);


    if (commandFile) {
        try {
            if (message.channel.type === "dm") {
                message.channel.send({
                    embed: {
                        title: `${findEmoji("Cross")} An error has occured.\nI'm not allowed to execute commands in DM channels yet.`,
                        color: 0xff0000
                    }
                }).then(msg => msg.delete({ timeout: 5000 }));
            }

            commandFile.run(message, args);
        } catch (err) {
            console.log(err)
        };
    };





    // if (!message.content.startsWith(prefix) || message.author.bot) return;

    // const args = message.content.slice(prefix.length).split(/ +/);
    // const commandName = args.shift().toLowerCase();

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

    // // if (message.content.includes(client.user)) {
    // //     console.log("HI.")
    // //     // message.channel.send(`You woke me up! Do you need me?`);
    // // }

    // // const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    // // if (!command) return;

    // // if (command.guildOnly && message.channel.type !== 'text') {
    // //     return message.channel.send({
    // //         embed: {
    // //             title: "Command not working",
    // //             description: "This command can not be used in DMs.",
    // //             color: "RED",
    // //             timestamp: new Date()
    // //         }
    // //     });
    // // }

    // // if (command.args && !args.length) {
    // //     let reply = `You didn't provide any arguments, ${message.author}!`;

    // //     if (command.usage) {
    // //         reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    // //     }

    // //     return message.channel.send({
    // //         embed: {
    // //             title: "Proper usage",
    // //             description: reply,
    // //             color: "RED",
    // //             timestamp: new Date()
    // //         }
    // //     });
    // // }

    // // if (!cooldowns.has(command.name)) {
    // //     cooldowns.set(command.name, new Discord.Collection());
    // // }

    // // const now = Date.now();
    // // const timestamps = cooldowns.get(command.name);
    // // const cooldownAmount = (command.cooldown || 3) * 1000;

    // // if (timestamps.has(message.author.id)) {
    // //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    // //     if (now < expirationTime) {
    // //         const timeLeft = (expirationTime - now) / 1000;
    // //         message.channel.send({
    // //             embed: {
    // //                 title: `Cooldown on ${command.name}`,
    // //                 description: `I'm sorry, you can use this command again in ${timeLeft.toFixed(1)} seconds.`,
    // //                 color: "GREEN",
    // //                 timestamp: new Date()
    // //             }
    // //         });
    // //     }
    // // };

    // // timestamps.set(message.author.id, now);
    // // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // // try {
    // //     command.execute(message, args);
    // // } catch (error) {
    // //     console.error(error);
    // //     message.channel.send({
    // //         embed: {
    // //             title: "Error",
    // //             description: 'There was an error trying to execute that command!',
    // //             color: "RED",
    // //             timestamp: new Date()
    // //         }
    // //     });
    // // }
});

client.login(process.env.token);
