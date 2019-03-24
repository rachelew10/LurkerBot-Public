const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var hd = [
        "Heads",
        "Tails"
    ];

    message.channel.send(message.author.toString() + " Flipped a coin..... it landed on " + (hd[Math.floor(Math.random() * hd.length)]));

}
module.exports.help = {
    name: "coinflip",
    usage: "``prefix``coinflip",
    description: "Flip a coin",
}