const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, con) => {

  const inactivequery = `SELECT user, points, lstmsg, afk, reason, afktime FROM scores WHERE guild = '${message.guild.id}' ORDER BY cast(points as SIGNED) ASC LIMIT 15`

  const query = querytxt => {
    return new Promise((resolve, reject) => {
      con.query(querytxt, (err, results, fields) => {
        if (err) reject(err);
        resolve([results, fields]);
      });
    });
  };
  const [results, fields] = await query(inactivequery);

  const map1 = results.map(results => ` ** User:** ${bot.users.get(results.user).username} \n **Messages:** ${results.points} \n **Last message:** ${results.lstmsg ? `${moment.utc(results.lstmsg).format('DD/MM/YYYY HH:mm:ss')}`: "None"} \n **AFK:** ${results.afk ? "Yes": "No AFK set"} ${results.reason ? '- '+results.reason : " "} ${results.afktime ? '('+moment(results.afktime).fromNow()+')' : " "} \n`);

  message.channel.send(map1)
}
module.exports.help = {
  name: "inactive",
  usage: "``prefix``inactive",
  description: "Inactive users for current weeks",
}