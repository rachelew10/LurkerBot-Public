const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //guild role info embed
    let roleembed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .addField("Roles", message.guild.roles.size)
        .addField(`List of roles in ${message.guild.name}`, message.guild.roles.map(role => role.name).join("\n"))

    //Message checks
    if (!args[0]) return message.channel.send(roleembed) + message.channel.send("Want more info? try using prefix roleinfo rolename");

    //Grab args and specify as rolename
    let roleName = `${args.join(" ")}`

    //@rolename
    let roleMention = message.guild.roles.find(roles => roles.name.toLowerCase() === roleName.toLowerCase())

    let rolefind = message.guild.roles.find(roles => roles.name.toLowerCase() === roleName.toLowerCase())
    if (!rolefind) return message.channel.send(`Can't find role ${args.join(" ")}`);

    //Filter members for role
    let membersWithRole = message.guild.members.filter(member => {
        return member.roles.find(roles => roles.name.toLowerCase() === roleName.toLowerCase());
    }).map(member => {
        return member.user.username;
    })

    let serverembed = new Discord.RichEmbed()
        .setColor("#FFD700")
        .addField("Role name", roleMention)
        .addField("Number of users with the role", rolefind.members.size)
        .addField("Users with the role", membersWithRole.join("\n"))


    message.channel.send(serverembed);

}

module.exports.help = {
    name: "roleinfo",
    usage: "``prefix`` roleinfo or ``prefix`` roleinfo rolename",
    description: "Displays detailed role information",
}