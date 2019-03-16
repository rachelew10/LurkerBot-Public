const Discord = require("discord.js");
const prefixes = require("./prefix");

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be admin to bulk clear messages");
if(!args[0]) return message.channel.send(`Need help? try adding a number after clear`);
if (args[0] == "help") return message.channel.send("Usage: ")
message.channel.bulkDelete(args[0]).then(() =>{
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(100));
});
}

module.exports.help = {
    name: "clear",
    usage: "``prefix``clear numberofmsg",
    description: "Clears specified number of messages from current channel",
}