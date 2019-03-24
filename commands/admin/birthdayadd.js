
const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, con) => {
    
    //Birthday admin check
    if (message.author.id === botconfig.bdadmin); else {
        //Admin Check
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be admin to add birthdays")
      };

    let mention = message.mentions.users.first() || bot.users.get(args[0]);
    if (!mention) return message.reply("You must mention someone or give their ID!");

    con.query(`SELECT bday FROM alltime WHERE user = '${mention.id}' AND guild = '${message.guild.id}'`, function (error, results, fields) {
        if (error) throw error;

        if (!args[1]) return message.reply("You must specify a birthdate to add in the format DD/MM/YYYY");
        if (args[1].length < 10) return message.reply("format must be DD-MM-YYYY");
        if (args[1].length > 10) return message.reply("format must be DD-MM-YYYY");

        var date = moment(`${args[1]}`, "DD-MM-YYYY");
        var bday = (date.format("YYYY-MM-DD"));
        console.log(bday);

        if (args[1].length === 10) {
            con.query(`UPDATE alltime SET bday = '${bday}' WHERE user = '${mention.id}' AND guild = '${message.guild.id}'`);
            console.log(`Birthday set to ${bday} for ${bot.users.get(mention.id).username}`)
            message.delete().catch(O_o =>{});
            message.channel.send(`Birthday set to ${date} for ${bot.users.get(mention.id).username}`).then(msg => msg.delete(5000))
        };

    })
}
module.exports.help = {
    name: "birthdayadd",
    usage: "``prefix``birthdayadd @member DD/MM/YYYY",
    description: "Add a users birthday into the database",
}