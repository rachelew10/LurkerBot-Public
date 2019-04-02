const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {

    let reason = args.join(' ') ? args.join(' ') : "AFK";
    var formatTime = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
    const currentNickname = message.member.displayName;
    const newNickname = currentNickname.replace('[AFK]', '');

    //AFK mySQL Query
    con.query(`UPDATE alltime, scores SET alltime.afk = true, scores.afk = true, alltime.reason = '${reason}', scores.reason = '${reason}', alltime.afktime = '${formatTime}',  scores.afktime = '${formatTime}' WHERE alltime.user = '${message.author.id}' AND scores.user = '${message.author.id}'`), (err, rows) => {
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