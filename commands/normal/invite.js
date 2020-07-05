const Discord = require('discord.js');

module.exports = {
    name: "invite",
    category: "Normal",
    aliases: ["inv", "invme"],
    description: "Get my invite link!",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, err, msg) => {
        let inviteLink = 'https://discordapp.com/oauth2/authorize?client_id=718773073427431444&scope=bot&permissions=2146958847';
        message.channel.send({
            embed: {
                title: `My invite link`,
                fields: [{
                    name: '** **',
                    value: `[Click here](${inviteLink}) to invite me.`
                }],
                thumbnail: {
                    url: client.user.avatarURL({
                        dynamic: true
                    }) ? client.user.avatarURL({
                        dynamic: true
                    }) : null
                },
                color: 0x00ff66,
                timestamp: new Date(),
                footer: {
                    text: message.member.displayName
                }
            }
        });
    }
}