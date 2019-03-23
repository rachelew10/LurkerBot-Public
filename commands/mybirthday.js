
const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, con) => {
    

    let user = message.author.id


    con.query(`SELECT bday FROM alltime WHERE user = '${user.id}' AND guild = '${message.guild.id}'`, function (error, results, fields) {
        if (error) throw error;

        if (!args[0]) return message.reply("You must specify a birthdate to add in the format DD-MM-YYYY");
        if (args[0].length < 10) return message.reply("format must be DD-MM-YYYY");
        if (args[0].length > 10) return message.reply("format must be DD-MM-YYYY");

        var date = moment(`${args[0]}`, "DD-MM-YYYY");
        var bday = (date.format("YYYY-MM-DD"));

        if (args[0].length === 10) {
            con.query(`UPDATE alltime SET bday = '${bday}' WHERE user = '${user.id}' AND guild = '${message.guild.id}'`);
            console.log(`Birthday set to ${bday} for ${bot.users.get(user).username}`)
            message.delete().catch(O_o =>{});
            message.channel.send(`Birthday set to ${date} for ${bot.users.get(user).username}`).then(msg => msg.delete(5000));
        };

    })
}
module.exports.help = {
    name: "mybirthday",
    usage: "``prefix``mybirthday DD/MM/YYYY",
    description: "Add your own birthday into the database if you aren't admin",
}