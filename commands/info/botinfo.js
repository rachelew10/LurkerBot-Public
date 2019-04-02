const Discord = require("discord.js");
let dev = "378976806730203147"
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .setThumbnail(bicon)
        .addField("Name", bot.user.username)
        .addField("Created On", `${moment.utc(bot.user.createdAt).format('DD/MM/YYYY')}`)
        .addField("Developer info", `${bot.users.get(dev).tag} add discord for support`)
        .addField('\u200B', '\u200B', true)
        .setFooter("Help support & grow LurkerBot! BTC: 3CTWwVMTKmGJnLg9uJ1dRpZFt68By11sT3" )

    return message.channel.send(botembed);
}
module.exports.help = {
    name: "botinfo",
    usage: "``prefix``botinfo",
    description: "",
}