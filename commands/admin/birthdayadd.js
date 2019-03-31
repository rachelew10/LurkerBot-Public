
const Discord = require("discord.js");
const moment = require("moment");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args, con) => {

    //Birthday admin check
    if (message.author.id === botconfig.bdadmin); else {
        //Admin Check
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be admin to add birthdays")
    };
    //--------------------

    let mention = message.mentions.users.first() || bot.users.get(args[0]);

    //Message Checks
    if (!mention) return message.reply("You must mention someone or give their ID!");
    if (!args[1]) return message.reply("You must specify a birthdate to add in the format DD/MM/YYYY");
    if (args[1].length < 10) return message.reply("format must be DD-MM-YYYY");
    if (args[1].length > 10) return message.reply("format must be DD-MM-YYYY");

    var date = moment(`${args[1]}`, "DD-MM-YYYY");
    var bday = (date.format("YYYY-MM-DD"));
    var format = (date.format("DD-MM-YYYY"));

    if (args[1].length === 10) {
        con.query(`UPDATE alltime SET bday = '${bday}' WHERE user = '${mention.id}' AND guild = '${message.guild.id}'`);
        message.delete().catch(O_o => { });
        message.channel.send(`Birthday set to ${format} for ${bot.users.get(mention.id).username}`).then(msg => msg.delete(5000))
    };
}

module.exports.help = {
    name: "birthdayadd",
    usage: "``prefix``birthdayadd @member DD/MM/YYYY",
    description: "Add a users birthday into the database",
}