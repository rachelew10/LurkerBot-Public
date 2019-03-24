const Discord = require("discord.js");
const ladybug = require("ladybug-fetch");
const botconfig = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {

    await message.channel.send("Searching...");
    /* eslint-disable camelcase */
    const api_key = botconfig.giphyAPI;
    const req = ladybug("https://api.giphy.com/v1/gifs/random")
      .query({ api_key });
    if(args) req.query({ args });
    const res = await req;
    return message.channel.send(res.body.data.embed_url);
    /* eslint-enable camelcase */
}
module.exports.help = {
    name: "gif",
    usage: "``prefix``gif",
    description: "A random gif",
}