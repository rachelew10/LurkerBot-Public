const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args, con) => {

  //Dev check
  if (message.author.id === botconfig.dev) {

    //Message check
    if (!args) {
      return message.channel.send(":x: " + "| Please enter a new nick name for the bot");
    }

    message.guild.member(bot.user).setNickname(args.join(" ")).then(user => message.channel.send("My new nickname is " + args.join(" ") + "!")).catch(console.error);

  } else {

    return message.reply("Dont think so..... only the bot developer can use this command.")

  }
}
module.exports.help = {
  name: "rename",
  usage: "``prefix``rename",
  description: "Dev command to rename bot",
}