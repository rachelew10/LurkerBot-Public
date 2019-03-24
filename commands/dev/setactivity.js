
const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");


module.exports.run = async (bot, message, args, con) => {

  // //status array
  // const status = ["playing", "watching", "listening"];

  // //Dev check
  // if (message.author.id !== botconfig.dev) return message.reply("Dont think so..... only the bot developer can use this command.");
  // //Message checks
  // if (!args[0]) return message.reply("What type should I set it to?");
  // if (!args[1]) return message.reply("You didn't specify what I should set my activity to. R u stupid");
  // if (!status.includes(args[0])) return message.reply("Wrong answer. Has to be playing, watching or listening");
  

  // //Change Activity
  // bot.user.setActivity(`${args[1]}`, {
  //   type: `${args[0]}`
  // });
  // message.channel.send(`Bot activity type changed to: ${args[0]}`)

}
module.exports.help = {
  name: "setactivity",
  usage: "``prefix``setactivity type phrase",
  description: "Sets bot activity",
}