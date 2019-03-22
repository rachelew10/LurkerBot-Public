const Discord = require("discord.js");
const moment = require("moment");

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

    const pointsmap = results.map(results => ` **Messages Sent:** ${results.points}` + "\n" + `**Last Message: **${results.lstmsg} \n`);
    const allmap = results2.map(results2 => `**Alltime Messages Sent:** ${results2.points}`);
    //----------------------------------

    //bot check
    let botUser = user.bot ? "Yes" : "No. Just a regular shmegular human";

    if (user) {
        var profile = new Discord.RichEmbed()

            .setColor("#FFD700")
            //.setImage(`${user.avatarURL}`)

            .addField(`User profile for ${user.username}#${user.discriminator}`,
                "** Username: **" + `${user.username}#${user.discriminator}` + "\n" +
                " **User ID: **" + `${user.id}` + "\n" +
                " **Account created: **" + user.createdAt.toLocaleString() + "\n" +
                " **Join Date: **" + `${moment.utc(user.joinedAt).format('DD/MM/YYYY, h:mm:ss A')}` + "\n" +
                " **Status: **" + user.presence.status + "\n" +
                " **Bot: **" + botUser)
            .addField('\u200B', '\u200B')
            //.setThumbnail(`${user.displayAvatarURL}`)
            .addField('User Roles:', ' ' + member.roles.map(r => `${r}`).join(', '))
            .addField('\u200B', '\u200B')
            .addField('Lurker Profile:', ' ' + pointsmap + allmap)


        message.channel.send(profile);
    }


}
module.exports.help = {
    name: "profile",
    usage: "``prefix`` profile **or** ``prefix`` profile @member",
    description: "User profile with detailed information",
}