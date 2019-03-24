const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first() || message.member,
        user = member.user;

    let botembed = new Discord.RichEmbed()

        .setColor("#FFD700")
        .setImage(`${user.avatarURL}`)

    return message.channel.send(botembed);
}
module.exports.help = {
    name: "avatar",
    usage: "``prefix``avatar **or** ``prefix``avatar @user",
    description: "enlarge avatar",
}