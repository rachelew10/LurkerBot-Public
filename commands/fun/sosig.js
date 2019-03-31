const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    message.channel.send("Sosig", {
        file: "./resources/sosig.gif" 
    });


}
module.exports.help = {
    name: "sosig",
    usage: "``prefix``sosig",
    description: "Show off Ramsay's big sosig",
}