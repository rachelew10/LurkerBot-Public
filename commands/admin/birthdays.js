const Discord = require("discord.js");
const moment = require("moment");
const botconfig = require("../../botconfig.json");
const mysql = require("mysql")

module.exports.run = async (bot, message, args, con) => {

  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]


  //Birthday admin check
  if (message.author.id === botconfig.bdadmin || botconfig.dev); else {
    //Admin Check
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be admin to view this months birthdays")
  };

  let sql = "SELECT ??, ?? FROM ?? WHERE ?? = ? AND MONTH(??) = MONTH(CURRENT_DATE()) ORDER BY DAYOFMONTH(??)";
  let sql2 = "SELECT ??, ?? FROM ?? WHERE ?? = ? AND MONTH(??) = ? ORDER BY DAYOFMONTH(??)"
  let inserts = ["user", "bday", "alltime", "guild", message.guild.id, "bday", "bday"];
  let inserts2 = ["user", "bday", "alltime", "guild", message.guild.id,"bday", args[0], "bday"];
  let birthdayquery = mysql.format(sql, inserts);
  let monthquery = mysql.format(sql2, inserts2)

  //const top10query = `SELECT user, bday FROM alltime WHERE guild='${message.guild.id}' AND MONTH(bday) = MONTH(CURRENT_DATE()) ORDER BY DAYOFMONTH(bday)`

  const query = querytxt => {
    return new Promise((resolve, reject) => {
      con.query(querytxt, (err, results, fields) => {
        if (err) reject(err);
        resolve([results, fields]);
      });
    });
  };

  const [results, fields] = await query(birthdayquery);
  

  if (!args[0]) {

    //If no birthdays for the current month, send message
    if (results.length < 1) {
      return message.channel.send("There are no birthdays this month 🎊")
    }

    const map1 = results.map(results => `**User:** ${bot.users.get(results.user).username} \n**Birthday:** ${moment(results.bday).format('DD/MM/YYYY')}\n`);

    message.channel.send(map1)
  };

  if (args[0]) {

    //Validity check
    if (!months.includes(args[0])) { return message.channel.send(`Please specify month as a numeric value. (1 = January, 12 = December)`) }

    
    const [results, fields] = await query(monthquery)

    if (results.length < 1) {

      return message.channel.send(`There are no birthdays in that month.`)

    }

    const map2 = results.map(results => `**User:** ${bot.users.get(results.user).username} \n**Birthday:** ${moment(results.bday).format('DD/MM/YYYY')}\n`);

    message.channel.send(map2)

  }
}
module.exports.help = {
  name: "birthdays",
  usage: "``prefix``bithdays",
  description: "A list of birthdays this month",
}