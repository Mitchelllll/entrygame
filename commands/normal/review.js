const Discord = require('discord.js');

module.exports = {
    name: "review",
    category: "Normal",
    description: "Send a review!",
    run: async (client, message, args, emojis, prefix, err, msg) => {

        var channel = message.member.guild.channels.cache.find(ch => ch.name === 'reviews');
        if (!channel) return err(`No channel with the name ${channel.name} found.`)

        const amountStars = args[0];
        if (!amountStars) return err('You must give a number of stars.');
        if (isNaN(amountStars)) return err('You did not give a number, but something else. Give a number next time.')
        if (amountStars < 0 || amountStars > 5) return err('You can only give 0 to 5 stars.')

        var stars = "";
        for (let i = 0; i < amountStars; i++) {
            stars += ":star: ";
        }

        var text = args.splice(1, args.length).join(" ") || 'No text given';

        channel.send({
            embed: {
                title: `${message.member.displayName} has written a review`,
                color: "#00ff00",
                timestamp: new Date(),
                fields: [{
                        name: "Review:",
                        value: `*${text}*`
                    },
                    {
                        name: "Stars:",
                        value: stars
                    }
                ]
            }
        }).then(() => {
            if(message.channel.name === channel.name) return;
            message.channel.send({
                embed: {
                    title: `${emojis.check} You have successfully send a review in ${channel.name}`,
                    color: "00ff00",
                    timestamp: new Date(),
                    footer: {
                        text: message.member.displayName
                    }
                }
            });
        });
    }
}