const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
    //Grab all users from db for current server
    //con.query(`SELECT column-list FROM alltime WHERE guild= "${message.guild.id}" ORDER BY points DESC`);
    //let name = message.guild.members.con(`SELECT * user`)

    let mention = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author

    con.query(`SELECT * FROM scores WHERE user = '${mention.id}' AND guild= '${message.guild.id}'`, (err, rows) => {
        if (err) throw err;

        if (!rows[0]) return message.channel.send("User not found in database");

        let points = rows[0].points;
        let lstmsg = rows[0].lstmsg;
        return message.channel.send("**Messages Sent:** " + points+ " | **Last Message:** " + lstmsg);
    });


}
module.exports.help = {
    name: "stats",
    usage: "``prefix`` stats @member",
    description: "Returns user acitivty & last message date for current weeks",
}