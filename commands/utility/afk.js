const Discord = require("discord.js");
const mysql = require("mysql")

module.exports.run = async (bot, message, args, con) => {

    let reason = args.join(' ') ? args.join(' ') : "AFK";
    var formatTime = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
    const currentNickname = message.member.displayName;

    let sql = "UPDATE ??, ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?";
    let inserts = ['alltime', 'scores', 'alltime.afk', true, 'alltime.reason', reason, 'scores.afk', true, 'scores.reason', reason, 'alltime.afktime', formatTime, 'scores.afktime', formatTime, 'alltime.user', message.author.id, 'scores.user', message.author.id];
    let afksql = mysql.format(sql, inserts);

    //AFK mySQL Query
    con.query(afksql), (err, rows) => {
        if (err) throw err;
    };

    //Rename user then reply
    message.member.setNickname(`[AFK] ${message.member.displayName}`).then(message.reply(`${message.member.displayName} I have set your AFK - ${reason}`))
};
module.exports.help = {
    name: "afk",
    usage: "``prefix``afk reason",
    description: "Set AFK",
}