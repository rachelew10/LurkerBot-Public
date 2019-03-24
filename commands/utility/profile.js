const Discord = require("discord.js");
const moment = require("moment");

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

    //query maps---------------------------
    const pointsquery = `SELECT * FROM scores WHERE user = '${user.id}' AND guild= '${message.guild.id}'`
    const allquery = `SELECT * FROM alltime WHERE user = '${user.id}' AND guild= '${message.guild.id}'`
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

    const pointsmap = results.map(results => ` **Messages Sent:** ${results.points}` + "\n" + `**Lst Msg: **${moment.utc(results.lstmsg).format('DD/MM/YYYY HH:mm:ss')} \n`);
    const allmap = results2.map(results2 => `**Alltime Messages Sent:** ${results2.points}`);
    const bdaymap = results2.map(results2 => `**Birthday:** ${moment.utc(results2.bday).format('DD/MM/YYYY')}`)
    //----------------------------------

    //bot check
    let botUser = user.bot ? "Yes" : "No. Just a regular shmegular human";

    if (user) {
        var time = { year: '2-digit', month: 'numeric', day: 'numeric' };
        var profile = new Discord.RichEmbed()
        

            .setColor("#FFD700")
            //.setImage(`${user.avatarURL}`)
            .setThumbnail(`${user.displayAvatarURL}`)
            //toLocaleString('en-GB', time)

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