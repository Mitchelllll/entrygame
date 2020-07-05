const Discord = require('discord.js');

module.exports = {
    name: "giveaway",
    category: "Admin",
    description: "Create a giveaway!",
    usage: "<amount winners> <time (s/m/h/d)> <item>",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {

        // if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPermsEmbed);

        // var item = "";
        // var time;
        // var winnerCount;

        // winnerCount = args[0];
        // time = args[1];
        // item = args.splice(2, args.lenght).join(" ");

        // if (!time || !item) {
        //     let reply = `${emojis.cross} You didn't provide any arguments, ${message.author}!`;

        //     let commandFile = module.exports;

        //     if (commandFile.usage) {
        //         reply += `\n${emojis.check} The proper usage would be: \`${prefix}${commandFile.name} ${commandFile.usage}\``;
        //     }
        //     return message.channel.send({
        //         embed: {
        //             title: "Proper usage",
        //             description: reply,
        //             color: "RED",
        //             timestamp: new Date()
        //         }
        //     });
        // }

        // var date = new Date().getTime;
        // var dateEnd = new Date(date + (time * 1000));

        // var embed = new Discord.MessageEmbed()
        //     .setTitle(`🎉**GIVEAWAY STARTED**🎉`)
        //     .setDescription(item)
        //     .setFooter(`End on ${dateEnd}`)
        //     .setColor("#00ff00");
        // var embedSend = await message.channel.send(embed);
        // embedSend.react("🎉");

        // setTimeout(function () {

        //     var random = 0;
        //     var winners = [];
        //     var inList = false;
        //     var peopleReacted = embedSend.reactions.cache.get('🎉').users.cache.array();

        //     for (let i = 0; i < peopleReacted.length; i++) {
        //         if (peopleReacted[i].id == client.user.id) {
        //             peopleReacted.splice(i, 1);
        //             continue;
        //         }
        //     }

        //     if (peopleReacted.lenght == 0) {
        //         message.channel.send({
        //             embed: {
        //                 title: `${emojis.cross} There were no participators`,
        //                 color: "RED"
        //             }
        //         });
        //     }

        //     for (let y = 0; y < winnerCount; y++) {

        //         inList = false;
        //         random = Math.floor(Math.random() * peopleReacted.lenght);

        //         for (let o = 0; o < winners.length; o++) {

        //             if (winners[0] = peopleReacted[random]) {
        //                 inList = true;
        //                 y--;
        //                 break;
        //             }

        //         }

        //         if (!inList) {
        //             winners.push(peopleReacted[random]);
        //         }

        //     }

        //     for (let x = 0; x < winners.length; x++) {

        //         winUsers = winners[x].username;

        //     }

        //     message.channel.send({
        //         embed: {
        //             title: winUsers.join(" + "),
        //             description: `You won ${item}!`,
        //             color: "#00ff00",
        //             timestamp: new Date(),
        //             footer: {
        //                 text: "WINNERS"
        //             }
        //         }
        //     });

        //     embedSend.edit({
        //         embed: {
        //             title: `🎉**GIVEAWAY ENDED**🎉`,
        //             description: `${winUsers.join(" + ")} won ${item}`,
        //             footer: {
        //                 text: `Ended on ${dateEnd}`
        //             },
        //             color: "#00ff00"
        //         }
        //     });

        // }, time * 1000);
        
    }
}