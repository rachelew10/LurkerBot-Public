const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args, con) => {
  
  //Dev check
  if(message.author.id !== botconfig.dev) return message.reply ("Dont think so..... only the bot developer can use this command.");

  con.query(`UPDATE scores SET points = 0, lstmsg = NULL`);

  return message.channel.send("Scores data refreshed")
  
}
module.exports.help = {
  name: "refresh",
  usage: "``prefix``refresh",
  description: "Dev command to refresh scores data",
}