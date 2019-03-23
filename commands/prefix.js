const Discord = require("discord.js");
const fs = require("fs");
const prefixes = require("./prefix");
const moment = require("moment");

module.exports.run = async (bot, message, args, prefix) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Admin can only set prefix");
    if (!args[0] || args[0 == "help"]) return message.reply(`Usage: !prefix <new prefix>`);

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .setTitle("Prefix has been set")
        .setDescription(`Set to ${args[0]}`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "prefix",
    usage: "``prefix``prefix newprefix",
    description: "Change the current bot prefix",
}