
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {

  var deadline = 'April 14 2019 21:00:00 EDT';

  //Countdown function
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  let embed = new Discord.RichEmbed()
    .setColor("#FFD700")
    .addField("Game of Thrones: Season 8 Episode 1", `**${getTimeRemaining(deadline).days} Days ${getTimeRemaining(deadline).hours} Hours ${getTimeRemaining(deadline).minutes} Mins ${getTimeRemaining(deadline).seconds} Secs**`)

  return message.channel.send(embed);
  
};
module.exports.help = {
  name: "s8",
  usage: "``prefix``s8",
  description: "A countdown until S8ep1 of Game Of Thrones",
}