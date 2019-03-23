const Discord = require("discord.js");
const prefixes = require("./prefix");
let dev = "378976806730203147"
const moment = require("moment");


module.exports.run = async (bot, message, args) => {

    if (args[0] == "help") return message.channel.send("Need help? use ``prefix``help instead.")

    //Sends detailed help info when prefix help noargs is sent
    if (args[0]) {
        let command = args[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
                .setColor("#FFD700")
                .setAuthor(`Help`, message.guild.iconURL)
                .setDescription(`**Command:** ${command.help.name}\n
                                 **Description:** ${command.help.description || "No Description"}\n
                                 **Usage:** ${command.help.usage || "No Usage"}\n`);

            message.channel.send(SHembed);

        }}

        if (!args[0]) {
            message.delete();
            let embed = new Discord.RichEmbed()
            .setAuthor(`Help`, message.guild.iconURL)
            .setColor("#FFD700")
            .setDescription(`${message.author.username} Check DMs`)

            let Sembed = new Discord.RichEmbed()
            .setColor("#FFD700")
            .setAuthor(`${bot.user.username}, Help`)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`Here is a list of available commands for the ${bot.user.username}`)
            .addField('\u200B', '\u200B')
            .addField(`__**Information Commands:**__`, "``help`` | ``botinfo`` | ``serverinfo`` | ``roleinfo``")
            //.addField('\u200B', '\u200B')
            .addField(`__**Utility Commands:**__`, "``stats`` | ``statsall`` | ``top10`` | ``top10all`` | ``inactive`` | ``inactiveall`` | ``mybirthday`` |  ``profile`` | ``report``")
            //.addField('\u200B', '\u200B')
            .addField(`__**Fun Commands:**__`, "``shame``")
            //.addField('\u200B', '\u200B')
            .addField(`__**Admin Commands:**__`, "``prefix`` | ``birthdays`` | ``birthdayadd`` | ``clear``")
            //.addField('\u200B', '\u200B')
            .addField(`__**Developer Commands:**__`, "``refresh``")
            .addField('\u200B', '\u200B')
            .setFooter(`Developed by ${bot.users.get(dev).tag} for the FATAL GOT:C Server`)
            message.channel.send(embed).then(m => m.delete(10000));
            message.author.send(Sembed)

        }
}

module.exports.help = {
    name: "help",
    usage: "``prefix``help",
    description: "Displays a list of commands",
}