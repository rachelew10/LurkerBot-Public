const Discord = require("discord.js");
const moment = require("moment");
const mysql = require("mysql");

//Check days
function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days");
};

module.exports.run = async (bot, message, args, con) => {

    let member = message.mentions.members.first() || message.member,
        user = member.user;

    let sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    let inserts = ['scores', 'user', member.id, 'guild', message.guild.id];
    let inserts2 = ['alltime', 'user', member.id, 'guild', message.guild.id];
    let pointsquery = mysql.format(sql, inserts);
    let allquery = mysql.format(sql, inserts2);

    //query maps---------------------------
    const query = querytxt => {
        return new Promise((resolve, reject) => {
            con.query(querytxt, (err, results, fields) => {
                if (err) reject(err);
                resolve([results, fields]);
            });
        });
    };
    const [results, fields] = await query(pointsquery);
    const [results2, fields2] = await query(allquery);

    const pointsmap = results.map(results => `**Messages Sent:** ${results.points}` + "\n" + `**Lst Msg: **${results.lstmsg ? `${moment.utc(results.lstmsg).format('DD/MM/YYYY HH:mm:ss')}` : "None"} \n`);
    const allmap = results2.map(results2 => `**Alltime Messages Sent:** ${results2.points}`);
    const bdaymap = results2.map(results2 => `**Birthday:** ${results2.bday ? `${moment.utc(results2.bday).format('DD/MM/YYYY')}` : "None set (Use mybirthday command to set)"} \n`)
    //----------------------------------

    //bot check
    let botUser = user.bot ? "Yes" : "No. Just a regular shmegular human";

    if (user) {
        var time = { year: '2-digit', month: 'numeric', day: 'numeric' };
        var profile = new Discord.RichEmbed()


            .setColor("#FFD700")
            .setThumbnail(`${user.displayAvatarURL}`)
            .addField(`__User profile for ${user.username}#${user.discriminator}__`,
                "**Username: **" + `${user.username}#${user.discriminator}` + "\n" +
                "**ID: **" + `${user.id}` + "\n" +
                "**Created On: **" + user.createdAt.toLocaleString('en-GB', time) + "\n" +
                "**Account Age: **" + `${checkDays(user.createdAt)}` + "\n" +
                "**Server join Date: **" + `${moment.utc(member.joinedAt).format('DD/MM/YY')}` + "\n" +
                "**Status: **" + user.presence.status + "\n" +
                "**Bot: **" + botUser, true)
            .addField('\u200B', '\u200B', true)

            .addField('__User Roles__', ' ' + member.roles.map(r => `${r}`).join(', '), true)
            .addField('\u200B', '\u200B', true)
            .addField('__Lurker Profile__', ' ' + bdaymap + pointsmap + allmap, true)


        message.channel.send(profile);
    }


}
module.exports.help = {
    name: "profile",
    usage: "``prefix``profile **or** ``prefix``profile @member",
    description: "User profile with detailed information",
}