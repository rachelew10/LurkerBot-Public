
const botconfig = require("../../botconfig.json");
const snekfetch = require("snekfetch")
const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {

  let url = "https://got-quotes.herokuapp.com/quotes"
  let join = args.join(" ")
  let charfilter = `https://got-quotes.herokuapp.com/quotes?char=${join}`
  

  if (!join){

  snekfetch.get(url).then(r => {

    let body = r.body

    let embed = new Discord.RichEmbed()
    .setColor("#FFD700")
    .setTitle(`**${body.character}** - ${body.quote}`)

    message.channel.send(embed)

  })
};

if (join){

  snekfetch.get(charfilter).then(r => {

    let body = r.body

    let embed = new Discord.RichEmbed()
    .setColor("#FFD700")
    .setTitle(`**${body.character}** - ${body.quote}`)

    message.channel.send(embed)
  })
  
}

}
module.exports.help = {
  name: "gotq",
  usage: "``prefix``gotq or ``prefix`` gotq charactername",
  description: "A random GOT Quote",
}