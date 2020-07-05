const Discord = require('discord.js');
const guildModel = require('../../models/Guild');
const defPrefix = require('../../data/botConfig.json').prefix;

module.exports = {
    name: "settings",
    category: "Test",
    aliases: ["config", "setup"],
    description: "Change the bot settings for this server!",
    usage: "<key> <toggle/set/view> <value>",
    guildOnly: true,
    run: async (client, message, args, emojis, prefix, err, msg) => {
        let key = args[0];
        let option = args[1];
        let value = args[2];

        if (!key) {
            err(`You must give a key that you want to change or see.\n\nYou can choose from:\n\`prefix\`: Change or see the prefix for this server.`);
        } else if (key.toLowerCase() === 'prefix') {
            if (!option.toLowerCase()) {
                err(`You must give an option to specify what you want to do with \`${key}\`\n\nYou can choose from:\n\`set\`: Set a custom prefix for this server.\n\`view\`: Shows the current prefix for this guild.\n\`reset\`: Reset the custom prefix to th default prefix.`);
            } else if (option.toLowerCase() === 'view' || option.toLowerCase() === 'see' || option.toLowerCase() === 'current') {
                const db = await guildModel.findOne({
                    id: message.guild.id
                });

                if (!db) return err(`There is no custom prefix in this server.\nUse \`${prefix}prefix set <newPrefix>\` to create one.`);

                return msg(`The custom prefix for this server is \`${db.prefix}\`.\nUse \`${prefix}prefix reset\` to reset.`);

            } else if (option.toLowerCase() === "set" || option.toLowerCase() === "change" || option.toLowerCase() === "edit" || option.toLowerCase() === "new") {
                const db = await guildModel.findOne({
                    id: message.guild.id
                });
                if (!db) {
                    const dbNew = new guildModel({
                        id: message.guild.id
                    });
                    await dbNew.save();
                };

                if (args[4]) return;
                if (!value) return err(`Specify the prefix you want to set.\nUse \`${prefix}prefix set <newPrefix>\`.`);
                if (value.includes("\\")) return err(`Can not set prefix including \`\\\` (backslash character).\nUse \`${prefix}prefix set <newPrefix>\`.`)
                if (value === defPrefix) return err(`Can not set custom prefix to default prefix.\nUse \`${prefix}prefix reset\` instead.`);
                if (value.length > 5) return err(`Prefix can not be longer than 5 characters.\nUse \`${prefix}prefix set <newPrefix>\`.`)

                const dbSet = await guildModel.findOneAndUpdate({
                    id: message.guild.id
                }, {
                    $set: {
                        prefix: value.toString()
                    }
                }, {
                    new: true
                });

                return msg(`Succesfully set prefix to \`${dbSet.prefix}\`.`);

            } else if (option.toLowerCase() === "reset" || option.toLowerCase() === "default") {
                const db = await guildModel.findOneAndDelete({
                    id: message.guild.id
                });

                if (value) return;
                if (!db) return err(`There is no custom prefix in this server.\nUse \`${prefix}prefix set <newPrefix>\`.`);

                return msg(`Succesfully reset prefix from \`${db.prefix}\` to default \`${defPrefix}\`.`);
            }
        }/*  else if (key.toLowerCase() === '') {

        } */
    }
}