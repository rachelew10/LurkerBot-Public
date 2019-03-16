const Discord = require("discord.js");
let dev = "378976806730203147"

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .setThumbnail(bicon)
        .addField("Name", bot.user.username)
        .addField("Created On", bot.user.createdAt)
        .addField("Developer info", `${bot.users.get(dev).tag} add discord for support`)

    return message.channel.send(botembed);
}
module.exports.help = {
    name: "botinfo",
    usage: "``prefix`` botinfo",
    description: "",
}