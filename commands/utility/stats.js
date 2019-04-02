const Discord = require("discord.js");
const moment = require("moment");
const mysql = require("mysql")

module.exports.run = async (bot, message, args, con) => {
    //Grab all users from db for current server
    //con.query(`SELECT column-list FROM alltime WHERE guild= "${message.guild.id}" ORDER BY points DESC`);
    //let name = message.guild.members.con(`SELECT * user`)

    let mention = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author

    let sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    let inserts = ['scores', 'user', mention.id, 'guild', message.guild.id];
    let statssql = mysql.format(sql, inserts);

    con.query(statssql, (err, rows) => {
        if (err) throw err;

        if (!rows[0]) return message.channel.send("User not found in database");

        let points = rows[0].points;
        let lstmsg = rows[0].lstmsg;
        return message.channel.send("**Messages Sent:** " + points + " \n**Last Message:** " + `${moment.utc(lstmsg).format('DD/MM/YYYY HH:mm:ss')}`);
    });


}
module.exports.help = {
    name: "stats",
    usage: "``prefix``stats @member",
    description: "Returns user acitivty & last message date for current weeks",
}