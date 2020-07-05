const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    category: "Normal",
    aliases: ["sinfo", "si"],
    description: "Get information about this server!",
    timeout: 10000,
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydney: 'Sydney',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const serverEmojis = message.guild.emojis.cache;
        const vanityCode = message.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';

        const embed = new Discord.MessageEmbed()
            .setDescription(`**Server information for __${message.guild.name}__**`)
            .setColor("#00ff00")
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }) ? message.guild.iconURL({
                dynamic: true
            }) : null)
            .addField('General', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ ID:** ${message.guild.id}`,
                `**❯ Owner:** ${message.guild.owner.user} | ${message.guild.ownerID}`,
                `**❯ Region:** ${regions[message.guild.region]}`,
                `**❯ Boost Tier:** ${message.guild.premiemTier ? `Tier ${message.guild.premiemTier}` : 'None'}`,
                `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).format('LTS')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                `**❯ Joined At:** ${moment(message.member.joinedTimestamp).format('LL')} ${moment(message.member.joinedTimestamp).format('LTS')} ${moment(message.member.joinedTimestamp).fromNow()}`,
                '\u200b'
            ])
            .addField('Statistics', [
                `**❯ Role Count:** ${roles.length}`,
                `**❯ Emoji Count:** ${serverEmojis.size}`,
                `**❯ Regular Emoji Count:** ${serverEmojis.filter(emoji => !emoji.animated).size}`,
                `**❯ Animated Emoji Count:** ${serverEmojis.filter(emoji => emoji.animated).size}`,
                `**❯ Member Count:** ${message.guild.memberCount}`,
                `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
                `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
                `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `**❯ Boost Count:** ${message.guild.premiemSubscriptionCount || '0'}`,
                '\u200b'
            ], true)
            .addField('Presence', [
                `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b',
                '**Other Information**',
                `**❯ Fanity Invitelink:** ${vanityInvite}`,
                `**❯ Integrations:** ${message.guild.fetchIntegrations().size ? message.guild.fetchIntegrations().size : 'No integrations'}`,
                `**❯ Webhooks:** ${message.guild.fetchWebhooks().size || '0'}`,
                '\u200b'
            ], true)
            .addField(`Roles [${roles.length}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? `${roles.slice(0, 10).join(', ')}\n+${roles.length-10} roles...` : 'None')
            .setTimestamp();

        message.channel.send(embed);
    }
}