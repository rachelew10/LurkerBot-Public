const Discord = require("discord.js");
const Urban = require("relevant-urban")

module.exports.run = async (bot, message, args) => {

  //Message check
  if (!args[0]) return message.channel.send("What am I searching the urban dictionary for?");

  let res = await Urban(args.join(' ')).catch(e => {
    return message.channel.send(`No definition in the urban dictionary for ${args.join(' ')}`);
  })

  const embed = new Discord.RichEmbed()
  .setColor("#FFD700")
  .setTitle(res.word)
  .setURL(res.UrbanURL)
  .addField("Definition", `${res.definition}`)
  .addField("Example", `${res.example}`)

  if (res.tags.length > 0 && res.tags.join(' ').length < 1024){
    embed.addField("tags", regs.tags.join(', '), true)
  }

  message.channel.send(embed)

}
module.exports.help = {
  name: "urban",
  usage: "``prefix``urban searchterm",
  description: "Find an urban dictionary defintion",
}