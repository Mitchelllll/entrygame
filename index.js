const Discord = require('discord.js');
const { prefix } = require('./data/botConfig.json');
const client = new Discord.Client();
const emojis = require('./data/emojis.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const timeout = new Discord.Collection();

const fs = require("fs");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
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
                url: member.user.avatarURL() ? member.user.avatarURL() : null
            }
        }
    });

    const role = member.guild.roles.cache.find(rl => rl.name == "-+= MEMBER =+-");
    if (!role) return message.channel.send(`${emojis.cross} The role with the name ${role} does not excist.`);

    member.roles.add(role);

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
                url: member.user.avatarURL() ? member.user.avatarURL() : null
            }
        }
    });
});

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

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let commandFile = await client.commands.get(command);
    if (!commandFile) commandFile = client.commands.get(client.aliases.get(command));

    if (commandFile) {
        if (message.author.type === "bot") return;

        if (commandFile.guildOnly && message.channel.type === "dm") {
            return message.channel.send({
                embed: {
                    title: `${emojis.cross} Command not working`,
                    description: "This command can not be used in DMs.",
                    color: "RED",
                    timestamp: new Date()
                }
            }).then(msg => msg.delete({ timeout: 5000 }));
        }

        try {
            if (!timeout.has(commandFile.name)) {
                timeout.set(commandFile.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = timeout.get(commandFile.name);
            const timeoutAmount = (commandFile.timeout || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + timeoutAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    message.channel.send({
                        embed: {
                            title: `Cooldown on ${commandFile.name}`,
                            description: `I'm sorry, you can use this command again in ${timeLeft.toFixed(1)} seconds.`,
                            color: "GREEN",
                            timestamp: new Date()
                        }
                    });
                }
            } else {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), timeoutAmount);
            }
            
            if (commandFile.args && !args.length) {
                let reply = `${emojis.cross} You didn't provide any arguments, ${message.author}!`;

                if (commandFile.usage) {
                    reply += `\n${emojis.check} The proper usage would be: \`${prefix}${commandFile.name} ${commandFile.usage}\``;
                }
                return message.channel.send({
                    embed: {
                        title: "Proper usage",
                        description: reply,
                        color: "RED",
                        timestamp: new Date()
                    }
                });
            }
            commandFile.run(message, args, emojis, prefix);
        } catch (err) {
            console.log(err);
        }
    }

    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var msg = message.content.toLocaleLowerCase().split(" ");
    for (let i = 0; i < swearWords["swearwords"].length; i++) {
        if (msg.includes(swearWords["swearwords"][i])) {
            message.delete();
            message.reply(`${emojis.trash} Your message has been deleted because it included one or multiple swearwords.`).then(msg => msg.delete({ timeout: 5000 })).catch(err => {
                message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
            });
        }
    }

    // if (message.content.includes(client.user)) {
    //     console.log("HI.")
    //     // message.channel.send(`You woke me up! Do you need me?`);
    // }
});

client.login(process.env.token);
