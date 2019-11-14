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

    //Find user by ID in message
    let userid = message.guild.members.get(args[0]);

    if (!userid) return message.channel.send("Couldn't find user in guild. Use a correct user ID.");
    if (userid) {

        user = userid.user
        lastMessage = user.lastMessage;

        //if (!lastMessage) return console.log("No user last message")

    let sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    let inserts = ['scores', 'user', user.id, 'guild', message.guild.id];
    let inserts2 = ['alltime', 'user', user.id, 'guild', message.guild.id];
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

    const pointsmap = results.map(results => `**Messages Sent:** ${results.points}` + "\n" + `**Lst Msg: **${results.lstmsg ? `${moment.utc(results.lstmsg).format('DD/MM/YYYY HH:mm:ss')}` : "None"} \n**AFK:** ${results.afk ? "Yes" : "No AFK set"} ${results.reason ? '- ' + results.reason : " "} ${results.afktime ? '(' + moment(results.afktime).fromNow() + ')' : " "}\n`);
    const allmap = results2.map(results2 => `**Alltime Messages Sent:** ${results2.points}`);
    //----------------------------------

            var time = { year: '2-digit', month: 'numeric', day: 'numeric' };
            
            var profile = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setThumbnail(`${user.displayAvatarURL}`)
                .addField(`\u200B`,
                    "**Username: **" + `${user.username}#${user.discriminator}` + "\n" +
                    "**Created On: **" + user.createdAt.toLocaleString('en-GB', time) + "\n" +
                    "**Account Age: **" + `${checkDays(user.createdAt)}` + "\n" +
                    "**Server join Date: **" + `${moment.utc(userid.joinedAt).format('DD/MM/YY')}` + "\n" +
                    "**Status: **" + user.presence.status)
                     //+ "\n" + 
                    //"**Last Message: ** " + `"`+ lastMessage.content + `" `+ "\n" +
                    //"*at " + lastMessage.createdAt.toLocaleString('en-GB', time) + " in #" + lastMessage.channel.name + "*")
                .addField('\u200B', '\u200B', true)
                .addField('__User Roles__', ' ' + userid.roles.map(r => `${r}`).join(', '), true)
                .addField('\u200B', '\u200B', true)
                .addField('__Lurker Profile__', ' ' + pointsmap + allmap, true)

            message.channel.send(profile);

    }
}
module.exports.help = {
    name: "userinfo",
    usage: "``prefix``userinfo userid",
    description: "User profile with detailed information - discreet",
}