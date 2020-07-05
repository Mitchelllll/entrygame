const defPrefix = require('../../data/botConfig.json').prefix;
const emojis = require('../../data/emojis.json');
const fs = require("fs");
const ms = require('ms');

const guildModel = require('../../models/Guild');
const Level = require('../../models/Level');
const Timeout = new Set();

module.exports = (client, message) => {
    const db = message.channel.type === "text" ? guildModel.findOne({
        id: message.guild.id
    }) : null;
    const prefix = db && db.prefix ? db.prefix : defPrefix;

    if (message.channel.type === "text" && !message.content.startsWith(prefix) && message.mentions.members.find(user => user.id === client.user.id)) {
        return msg(`My prefix for this server is: \`${prefix}\``);
    };

    async function err(content) {
        await message.channel.send({
            embed: {
                color: 0xff0033,
                description: `**${emojis.cross} ${content}**`
            }
        });
    };
    async function msg(content) {
        await message.channel.send({
            embed: {
                color: 0x00ff66,
                description: `**${emojis.check} ${content}**`
            }
        });
    };

    if (message.author.type === "bot") return;
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let commandFile = client.commands.get(command);
    if (!commandFile) commandFile = client.commands.get(client.aliases.get(command));

    if (commandFile) {
        message.delete();
        if (commandFile.guildOnly && message.channel.type === "dm") {
            return message.channel.send({
                embed: {
                    title: `${emojis.cross} Command not working`,
                    description: "This command can not be used in DMs.",
                    color: "RED",
                    timestamp: new Date()
                }
            }).then(msg => msg.delete({
                timeout: 5000
            }));
        };
        if (commandFile.timeout) {
            if (!Timeout.has(`${message.author.id}${commandFile.name}`)) {
                Timeout.add(`${message.author.id}${commandFile.name}`);
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${commandFile.name}`);
                }, commandFile.timeout);
            } else {
                return err(`You can only use \`${commandFile.name}\` every _${ms(commandFile.timeout)}_`);
            }
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
        try {
            commandFile.run(client, message, args, emojis, prefix, err, msg);
        } catch (err) {
            console.log(err);
        }
    }


    var swearWords = JSON.parse(fs.readFileSync('./data/swearWords.json'));

    var msgs = message.content.toLocaleLowerCase().split(" ");
    for (let i = 0; i < swearWords["swearwords"].length; i++) {
        if (msgs.includes(swearWords["swearwords"][i])) {
            message.delete();
            message.reply(`${emojis.trash} Your message has been deleted because it included one or multiple swearwords.`).then(msg => msg.delete({
                timeout: 5000
            })).catch(err => {
                message.channel.send('\`\`\`🔴 An error has occurred.\`\`\`');
            });
        }
    }

    if (message.author.bot) return;
    let expAdd = Math.floor(Math.random() * 7) + 8;
    Level.findOne({
        userID: message.author.id,
        guildID: message.guild.id
    }, (err, level) => {
        if (err) console.log(err);
        if (!level) {
            const newLevel = new Level({
                userID: message.author.id,
                guildID: message.guild.id,
                exp: expAdd
            });
            newLevel.save().catch(err => console.log(err));
        } else {
            level.exp = level.exp + expAdd;
            level.save().catch(err => console.log(err));
        }
    });
}