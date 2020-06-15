const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return

}

module.exports.help = {
    name: "embed"
}