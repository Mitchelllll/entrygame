module.exports =
async (client, message, args, emojis, prefix, err, msg) => {
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
                url: member.user.avatarURL({
                    dynamic: true
                }) ? member.user.avatarURL({
                    dynamic: true
                }) : null
            }
        }
    });
}