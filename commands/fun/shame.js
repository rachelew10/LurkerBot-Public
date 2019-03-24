const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    message.channel.send("🔔 Shame!", {
        file: "./images/shame.gif" 
    });


}
module.exports.help = {
    name: "shame",
    usage: "``prefix``shame",
    description: "Shame a person for doing something stupid",
}