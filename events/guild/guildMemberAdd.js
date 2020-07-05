const Canvas = require('canvas');

module.exports =
    async (client, message, args, emojis, prefix, err, msg) => {
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
            let fontSize = 70;

            do {
                ctx.font = `${fontSize -= 10}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 300);

            return ctx.font;
        };

        const role = member.guild.roles.cache.find(rl => rl.name == "-+= MEMBER =+-");
        if (!role) return message.channel.send(`${emojis.cross} The role with the name ${role} does not excist.`);

        member.roles.add(role);
        const channel = member.guild.channels.cache.find(ch => ch.name === '👋welcome');
        if (!channel) return;

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./welcome.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#0000ff';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px sans-serif';
        ctx.fillStyle = '#0000dd';
        ctx.fillText('Welcome to the server', canvas.width / 2.2, canvas.height / 3.1);

        ctx.font = applyText(canvas, `${member.displayName}!`);
        ctx.fillStyle = '#006699';
        ctx.fillText(`${member.displayName}!`, canvas.width / 2.3, canvas.height / 1.6);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
            dynamic: true,
            format: 'jpg'
        }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        channel.send(`Welcome to **${member.guild.name}**, **${member}**!`, attachment);
    }