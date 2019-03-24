const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, con) => {

  message.channel.send("Pinging......").then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp
    let choices = ["Is this really my ping?", "IS this okay? I can't look", "I hope it isn't bad!"]
    let responce = choices[Math.floor(Math.random() * choices.length)]

    m.edit(`${responce}: Bot Latency: ${ping}, API Latency: ${Math.round(bot.ping)}`)
  })
}
module.exports.help = {
  name: "ping",
  usage: "``prefix``ping",
  description: "PONG! Displays api and bot latency",
}