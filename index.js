const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://MrBradley__:MrEntrygame__@cluster0-hus4a.azure.mongodb.net/Data?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.token);