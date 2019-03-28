const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.channel.send("🔔 Shame!", {
        file: "./resources/shame.gif"
    }); 

    var VC = message.member.voiceChannel;

    if (!VC) return 
    VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('resources/shamebell.mp3');
            dispatcher.on("end", end => { VC.leave() });
        })
        .catch(console.error);

}
module.exports.help = {
    name: "shame",
    usage: "``prefix``shame",
    description: "Shame a person for doing something stupid",
}