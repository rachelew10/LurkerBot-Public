const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, con) => {

  //Birthday admin check
  if (message.author.id === '373262919359660032'); else {
    //Admin Check
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be admin to view this months birthdays")
  }


  const top10query = `SELECT user, bday FROM alltime WHERE guild='${message.guild.id}' AND MONTH(bday) = MONTH(CURRENT_DATE())`

  const query = querytxt => {
    return new Promise((resolve, reject) => {
      con.query(querytxt, (err, results, fields) => {
        if (err) reject(err);
        resolve([results, fields]);
      });
    });
  };
  const [results, fields] = await query(top10query);

  const map1 = results.map(results => ` **User:** ${bot.users.get(results.user).username} \n **Birthday:** ${moment.utc(results.lstmsg).format('DD/MM/YYYY')}\n`);

  message.channel.send(map1)
}
module.exports.help = {
  name: "birthdays",
  usage: "``prefix``bithdays",
  description: "A list of birthdays this month",
}