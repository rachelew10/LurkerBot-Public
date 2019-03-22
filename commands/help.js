const Discord = require("discord.js");
const prefixes = require("./prefix");


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
            .setDescription(`These are the list of available commands for the ${bot.user.username}`)
            .addField(`Commands:`, "`` botinfo``\n``serverinfo``\n``prefix``\n``stats``\n``statsall``\n``top10``\n``top10all``\n``inactive``\n``inactiveall``\n``shame``\n``clear``\n``roleinfo``\n``profile``")
            message.channel.send(embed).then(m => m.delete(10000));
            message.author.send(Sembed)

        }
}

module.exports.help = {
    name: "help",
    usage: "``prefix`` help",
    description: "Displays a list of commands",
}