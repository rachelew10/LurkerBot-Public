const Discord = require("discord.js");
const prefixes = require("./prefix");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.displayAvatarURL
    let serverembed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined on", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo",
    usage: "``prefix`` serverinfo",
    description: "Displays detailed server information",
}