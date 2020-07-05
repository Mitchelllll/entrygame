const Discord = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
    name: "level",
    category: "Test",
    aliases: ["xp", "exp", "rank"],
    description: "See ypur exp!",
    // usage: "<key> <toggle/set/view> <value>",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, err, msg) => {
        Level.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, (err, level) => {
            if (err) console.log(err);
            if (!level) {
                let expAdd = Math.floor(Math.random() * 1) + 4;
                const newLevel = new Level({
                    userID: message.author.id,
                    guildID: message.guild.id,
                    exp: expAdd
                });
                newLevel.save().catch(err => console.log(err));
                message.channel.send({
                    embed: {
                        title: `Your level`,
                        description: `**Level**: \`0\`\n**Experience**: \`${newLevel.exp}\``,
                        color: "#00ff00",
                        timestamp: new Date(),
                        footer: {
                            text: message.member.displayName
                        }
                    }
                });
            } else {
                let levelUser = 0;
                let exp = level.exp;
                if (exp > 173) levelUser = 1;
                if (exp > 351) levelUser = 2;
                if (exp > 594) levelUser = 3;
                if (exp > 963) levelUser = 4;
                if (exp > 1434) levelUser = 5;
                if (exp > 1962) levelUser = 6;
                if (exp > 2593) levelUser = 7;
                if (exp > 3345) levelUser = 8;
                if (exp > 4235) levelUser = 9;
                if (exp > 5216) levelUser = 10;
                if (exp > 6275) levelUser = 11;
                if (exp > 7436) levelUser = 12;
                if (exp > 8773) levelUser = 13;
                if (exp > 10274) levelUser = 14;
                if (exp > 11932) levelUser = 15;
                if (exp > 13687) levelUser = 16;
                if (exp > 15647) levelUser = 17;
                if (exp > 17623) levelUser = 18;
                if (exp > 19933) levelUser = 19;
                if (exp > 22345) levelUser = 20;

                message.channel.send({
                    embed: {
                        title: `Your level`,
                        description: `**Level**: \`${levelUser}\`\n**Experience**: \`${level.exp}\``,
                        color: "#00ff00",
                        timestamp: new Date(),
                        footer: {
                            text: message.member.displayName
                        }
                    }
                });
            }
        });
    }
}