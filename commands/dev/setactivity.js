const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");


module.exports.run = async (bot, message, args, con) => {

  //Dev check
  if (message.author.id !== botconfig.dev) return message.reply("Dont think so..... only the bot developer can use this command.");
  //Message checks
  if (!args[1]) return message.reply("Specify a status phrase to set");

  //status array
  let status = ["playing", "watching", "listening"];

  //if args[0] doesnt insclude status - stop
  if (!status.includes(args[0])) return message.reply("No such message type");

  //Change Activity
  bot.user.setActivity(`${args[1]}` + ` ${args[2]}` + ` ${args[3]}` + ` ${args[4]}`, { type: `${args[0]}` });
  message.channel.send(`Bot activity changed to:- \n\n**Type:** ${args[0]} \n**Status:** ${args[1]}` + ` ${args[2]}` + ` ${args[3]}` + ` ${args[4]}`)

}
module.exports.help = {
  name: "setactivity",
  usage: "``prefix``setactivity",
  description: "Sets bot activity",
}