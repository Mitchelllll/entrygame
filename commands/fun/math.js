const Discord = require('discord.js');
const math = require('mathjs');

module.exports = {
    name: "math",
    category: "Fun",
    aliases: ["calculate"],
    description: "Let me do your math homework!",
    usage: "<num1> <type> <num2>",
    run: async (client, message, args, emojis, prefix, err, msg) => {

        if (!args[0]) {
            err(`You must give a math question`);
            err(`Usage: \`${prefix}math <math question>\`\nExamples:\n\`\`\`css\n${prefix}math 10 + 5\n${prefix}math pi\n${prefix}math simplify('3x + 6x - x + 9 -10 + 4 - 5')\n${prefix}math 5 inch to cm\n${prefix}math cos(45 deg)\`\`\``);
            return;
        }

        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        } catch (e) {
            return err(`You must give a valid sum\n\`\`\`css\nYour entry:\n${args.join(' ')}\`\`\`\nUsage: \`\`\`css\n${prefix}math <math question>\`\`\`\nExamples:\n\`\`\`css\n${prefix}math 10 + 5\n${prefix}math pi\n${prefix}math simplify('3x + 6x - x + 9 -10 + 4 - 5')\n${prefix}math 5 inch to cm\n${prefix}math cos(45 deg)\`\`\``);
        }

        message.channel.send({
            embed: {
                title: `Calculator`,
                color: '#00ff00',
                fields: [
                    { name: 'Math Question', value: `\`\`\`css\n${args.join(' ')}\`\`\`` },
                    { name: 'Answer', value: `\`\`\`css\n${resp}\`\`\`` }
                ]
            }
        });
    }
}