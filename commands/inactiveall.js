const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, con) => {

  const inactivequery = `SELECT user, points, lstmsg FROM alltime WHERE guild = '${message.guild.id}' ORDER BY cast(points as SIGNED) ASC LIMIT 20`

  const query = querytxt => {
    return new Promise((resolve, reject) => {
      con.query(querytxt, (err, results, fields) => {
        if (err) reject(err);
        resolve([results, fields]);
      });
    });
  };
  const [results, fields] = await query(inactivequery);

  const map1 = results.map(results => ` ** User:** ${bot.users.get(results.user).username} \n **Messages:** ${results.points} \n **Last message:** ${moment.utc(results.lstmsg).format('DD/MM/YYYY HH:mm:ss')} \n`);
  message.channel.send(map1)
}
module.exports.help = {
  name: "inactiveall",
  usage: "``prefix``inactiveall",
  description: "Inactive users of all time",
}