const botconfig = require("../../botconfig.json");
const snekfetch = require("snekfetch")

module.exports.run = async (bot, message, args) => {
  
  let mention = message.mentions.users.first() || message.author;
  let pp = mention.avatarURL;
  let url = `https://arcadia-api.xyz/api/v1/triggered?url=${pp}`

  snekfetch.get(url,{
    headers: {
      "Authorization": botconfig.arcadiaAPI
    }
  }).then(async res => {
    await message.channel.send({
      files:[{
        attachment: res.body,
        name: `${mention.tag}-triggered.gif`
      }]
    })
  })

}
module.exports.help = {
    name: "triggered",
    usage: "``prefix``triggered",
    description: "TRIGGERED",
}