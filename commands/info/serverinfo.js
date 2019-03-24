const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //Check days
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let serverembed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField("Server Name", message.guild.name)
        .addField("Server Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
        .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Channels", message.guild.channels.size)
        .addField("Roles", message.guild.roles.size)
        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL);
   
        message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo",
    usage: "``prefix``serverinfo",
    description: "Displays detailed server information",
}