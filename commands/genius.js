const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    message.channel.send("What a genius", {
        file: "./images/genius.gif" 
    });


}
module.exports.help = {
    name: "genius",
    usage: "``prefix``genius",
    description: "Wow you can hold a seat",
}