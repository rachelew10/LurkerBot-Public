
const Discord = require("discord.js");
const moment = require("moment");
const mysql = require("mysql")

module.exports.run = async (bot, message, args, con) => {


    let user = message.author.id

    if (!args[0]) return message.reply("You must specify a birthdate to add in the format DD-MM-YYYY");
    if (args[0].length < 10) return message.reply("format must be DD-MM-YYYY");
    if (args[0].length > 10) return message.reply("format must be DD-MM-YYYY");

    var date = moment(`${args[0]}`, "DD-MM-YYYY");
    var bday = (date.format("YYYY-MM-DD"));
    var format = (date.format("DD-MM-YYYY"));
    let sql = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
    let inserts = ['alltime', 'bday', bday, 'user', user, 'guild', message.guild.id];
    let bdaysql = mysql.format(sql, inserts);

    if (args[0].length === 10) {
        con.query(bdaysql);
        message.delete().catch(O_o => { });
        message.channel.send(`I have set your birthday to ${format}`).then(msg => msg.delete(5000));
    };

}
module.exports.help = {
    name: "mybirthday",
    usage: "``prefix``mybirthday DD/MM/YYYY",
    description: "Add your own birthday into the database if you aren't admin",
}