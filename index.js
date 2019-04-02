//Definitions-------------------------------
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const moment = require("moment")
const path = require("path");
const mysql = require("mysql");
const fs = require("fs");
var Promise = require('promise');
//const token = process.env.token;
const token = botconfig.token;
const bot = new Discord.Client({ disableEveryone: true });
var host = botconfig.host;
var db = botconfig.db;
var user = botconfig.user
var pw = botconfig.pw

//------------------------------------------

//MySQL Connection----------------
var con = mysql.createPool({
    host: host,
    user: user,
    password: pw,
    database: db,
});
//--------------------------------

//Bot login-------------
bot.login(token);
//----------------------

//Command Handler----------------
bot.commands = new Discord.Collection();
function walk(dir, callback) {
    fs.readdir(dir, function (err, files) {
        if (err) throw err;
        files.forEach(function (file) {
            var filepath = path.join(dir, file);
            fs.stat(filepath, function (err, stats) {
                if (stats.isDirectory()) {
                    walk(filepath, callback);
                } else if (stats.isFile() && file.endsWith('.js')) {
                    let props = require(`./${filepath}`);
                    console.log(`Loading Command: ${props.help.name} ✔`);
                    bot.commands.set(props.help.name, props);
                }
            });
        });
    });
}
walk(`./commands/`)
//-------------------------------


//Get mysql connection-----------
con.getConnection(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database....");
});
//-------------------------------

//Bot status---------------------
bot.on("ready", () => {
    console.log(`${bot.user.username} is online....`);
    console.log(`Bot online in: ${bot.guilds.size} servers`);
    bot.user.setStatus('Online');
    bot.user.setActivity(';help for commands', { type: "PLAYING" });

    //Delete points table data after 2 weeks (only if bot is constantly online, will not work with Heroku free)
    setInterval(function () {
        var timestamp = new Date();
        con.query("DELETE FROM scores");
        console.log(`bi-weekly scores deleted on ${timestamp} `);

    }, 1209600000);
    //--------------------------------------------------------------------------------------------------------
});
//-------------------------------

//Listener event, user joining guild
bot.on('guildMemberAdd', member => {

    //if user join is bot, ignore
    if (member.user.bot) return;

    //Add user into scores table
    let selectsql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    let inserts = ['scores', 'user', member.user.id, 'guild', member.guild.id];
    let inserts2 = ['alltime', 'user', member.user.id, 'guild', member.guild.id];
    let selectquery = mysql.format(selectsql, inserts);
    let selectquery2 = mysql.format(selectsql, inserts2)

    con.query(selectquery, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {

            let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, '0')";
            let inserts = ['scores', 'user', 'guild', 'points', member.user.id, member.guild.id];
            let insertquery = mysql.format(sql, inserts);

            query = insertquery, (err) => {
                if (err) throw err;
            };

        } else {
            return;
        };

        con.query(query);

    });
    //--------------------------

    //Add user into alltime table
    con.query(selectquery2, (err, rows) => {
        if (err) throw err;

        let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, '0')";
        let inserts = ['alltime', 'user', 'guild', 'points', member.user.id, member.guild.id];
        let insertquery = mysql.format(sql, inserts);

        if (rows.length < 1) {

            query = insertquery, (err, rows) => {
                if (err) throw err;
            };

        } else {
            return;
        };

        con.query(query);


    });
    //---------------------------

});
//-------------------------------------

//Listener event, user leaving guild
bot.on('guildMemberRemove', member => {

    //Remove user from tables

    let removesql = "DELETE ??, ?? FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?";
    let inserts = ['alltime', 'scores', 'alltime', 'scores', 'alltime.user', 'scores.user', 'alltime.user', member.user.id, 'alltime.guild', member.guild.id, 'scores.user', member.user.id, 'scores.guild', member.guild.id];
    let removequery = mysql.format(removesql, inserts);

    con.query(removequery, (err, rows) => {
        if (err) throw err;
    });
    //------------------------
});
//----------------------------------

//Message listener-------------------
bot.on("message", message => {
    //data checks
    if (message.author.bot) return; // ignore bot messages
    if (message.channel.type == "dm") return; //ignore DMs


    //AFK listener----------------
    user = message.mentions.users.first() || message.author

    let selectsql = "SELECT * FROM ?? WHERE ?? = ?";
    let selectsql2 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    let inserts = ['alltime', 'user', user.id];
    let inserts2 = ['scores', 'user', message.author.id, 'guild', message.guild.id]
    let selectquery = mysql.format(selectsql, inserts);
    let selectquery2 = mysql.format(selectsql2, inserts2);

    //Select alltime table
    con.query(selectquery, function (err, result, fields) {
        if (err) throw err;

        Object.keys(result).forEach(function (key) {
            var results = result[key];

            //If message has @user mention and afk is true, send reply
            if (message.isMentioned(message.mentions.users.first())) {

                //console.log("has mention")

                let user = message.mentions.users.first()
                //console.log(user)

                if (results.afk === 1) {

                    message.channel.send(`**${user.username}** is currently AFK - ${results.reason} (${moment(results.afktime).fromNow()})`)
                };

            };

            //If there is no @user mention & if user is AFK, remove AFK
            if (!message.isMentioned(message.mentions.users.first())) {
                if (message.content.includes("afk")) return;

                let user = message.author
                const currentNickname = message.member.displayName;
                const newNickname = currentNickname.replace('[AFK]', '');

                let removeafksql = "UPDATE ??, ?? SET ?? = ?, ?? = ?, ?? = NULL, ?? = NULL, ?? = NULL,  ?? = NULL WHERE ?? = ? AND ?? = ?";
                let inserts = ['alltime', 'scores', 'alltime.afk', false, 'scores.afk', false, 'alltime.reason', 'scores.reason', 'alltime.afktime', 'scores.afktime', 'alltime.user', user.id, 'scores.user', user.id];
                let removeafkquery = mysql.format(removeafksql, inserts);

                if (results.afk === 1) {

                    con.query(removeafkquery), (err) => {
                        if (err) throw err;
                    }

                    message.member.setNickname(newNickname).then(message.reply(`Welcome back. I have removed your AFK.`).then(msg => msg.delete(5000)))
                };
            }
        });
    })//--------------------------


    //Custom prefixes-------------
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    };

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (prefix == cmd.slice(0, 1)) {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args, con);
    };
    //----------------------------


    //If message is sent add points to scores table
    con.query(selectquery2, (err, rows) => {
        if (err) throw err;

        let insertsql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
        let updatesql = "UPDATE ?? SET ?? = ?? +? WHERE ?? = ? AND ?? = ?"
        let inserts = ['scores', 'user', 'guild', 'points', message.author.id, message.guild.id, 1];
        let inserts2 = ['scores', 'points', 'points', '1', 'user', message.author.id, 'guild', message.guild.id];
        let insertquery = mysql.format(insertsql, inserts);
        let updatequery = mysql.format(updatesql, inserts2);


        let sql;
        if (rows.length < 1) {
            sql = insertquery, (err) => {
                if (err) throw err;
            };

        } else {
            sql = updatequery, (err) => {
                if (err) throw err;
            };
        
        };

        con.query(sql);

    });
    //--------------------------------------------

    //If message is sent add points to alltime table
    con.query(selectquery, (err, rows) => {
        if (err) throw err;

        let insertsql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
        let updatesql = "UPDATE ?? SET ?? = ?? +? WHERE ?? = ? AND ?? = ?"
        let inserts = ['alltime', 'user', 'guild', 'points', message.author.id, message.guild.id, 1];
        let inserts2 = ['alltime', 'points', 'points', '1', 'user', message.author.id, 'guild', message.guild.id];
        let insertquery2 = mysql.format(insertsql, inserts);
        let updatequery2 = mysql.format(updatesql, inserts2);


        let sql;
        if (rows.length < 1) {
            sql = insertquery2, (err) => {
                if (err) throw err;
            };

        } else {
            sql = updatequery2, (err) => {
                if (err) throw err;
            };
        }

        con.query(sql);
    });
    //--------------------------------------------

    //send eye emoji when message is eye emoji
    // if (message.content.startsWith("👀")) {
    //     message.channel.send("👀");
    // };
})
//-----------------------------------