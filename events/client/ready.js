const defPrefix = require('../../data/botConfig.json').prefix;

module.exports =
    async (client, message, args, emojis, prefix, err, msg) => {
        let activities = [`${client.guilds.cache.size} servers!`, `${client.channels.cache.size} channels!`, `${client.users.cache.size} users!`],
            i = 0;
        setInterval(() => {
            client.user.setPresence({
                activity: {
                    name: `${defPrefix}help | ${activities[i++ % activities.length]}`,
                    type: "LISTENING"
                }
            })
        }, 7500);
        console.log(`${client.user.tag} is online!`);
        console.log(prefix);
    }
