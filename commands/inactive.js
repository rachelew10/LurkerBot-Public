const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {

  const inactivequery = `SELECT user, points, lstmsg FROM scores WHERE guild = '${message.guild.id}' ORDER BY cast(points as SIGNED) ASC LIMIT 15`

  const query = querytxt => {
    return new Promise((resolve, reject) => {
      con.query(querytxt, (err, results, fields) => {
        if (err) reject(err);
        resolve([results, fields]);
      });
    });
  };
  const [results, fields] = await query(inactivequery);

  const map1 = results.map(results => ` ** User:** ${bot.users.get(results.user).username} \n **Messages:** ${results.points} \n **Last message:** ${results.lstmsg} \n`);
  message.channel.send(map1)
  //console.log(map1)
}
module.exports.help = {
  name: "inactive",
  usage: "``prefix`` inactive",
  description: "Inactive users for current weeks",
}