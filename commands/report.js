const Discord = require("discord.js");
const prefixes = require("./prefix");

module.exports.run = async (bot, message, args) => {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Reports")
            .setColor("#FFD700")
            .addField("Reported User:", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", reason);

        //Post to reports channel
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if (!reportschannel) return message.channel.send("Couldn't find reports channel"); //If report channel not found, return message

        //Delete message & send to report channel
        message.delete().catch(O_o =>{});
              reportschannel.send(reportEmbed);
};

module.exports.help = {
    name: "report",
    usage: "``prefix``report @user reason",
    description: "Report a user to server administrators",
}