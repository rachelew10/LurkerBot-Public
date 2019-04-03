
const botconfig = require("../../botconfig.json");
const snekfetch = require("snekfetch")
const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {

  let url = "https://official-joke-api.appspot.com/jokes/random"

  snekfetch.get(url).then(r => {

    let body = r.body

    let embed = new Discord.RichEmbed()
    .setColor("#FFD700")
    .addField(`${body.setup}`, `${body.punchline}`)

    message.channel.send(embed)

  })
}
module.exports.help = {
  name: "joke",
  usage: "``prefix``joke",
  description: "A random joke",
}