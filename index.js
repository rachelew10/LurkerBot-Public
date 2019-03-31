//Definitions-------------------------------
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const moment = require("moment")
const path = require("path");
//const token = process.env.token;
const token = botconfig.token;
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const mysql = require("mysql");
var host = botconfig.host;
var db = botconfig.db;
var user = botconfig.user
var pw = botconfig.pw
var Promise = require('promise');
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

//Command Array---------
bot.commands = new Discord.Collection();
//----------------------

//Command Handler----------------
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
    con.query(`SELECT * FROM scores WHERE user="${member.user.id}" AND guild= "${member.guild.id}"`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO scores (user, guild, points) VALUES ('${member.user.id}', '${member.guild.id}', '0')`, (err, rows) => {
                if (err) throw err;
            };

        } else {
            return;
        };

        con.query(sql);


    });
    //--------------------------

    //Add user into alltime table
    con.query(`SELECT * FROM alltime WHERE user="${member.user.id}" AND guild= "${member.guild.id}"`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO alltime (user, guild, points) VALUES ('${member.user.id}', '${member.guild.id}', '0')`, (err, rows) => {
                if (err) throw err;
            };
        } else {
            return;
        };

        con.query(sql);


    });
    //---------------------------

});
//-------------------------------------

//Listener event, user leaving guild
bot.on('guildMemberRemove', member => {

    //Remove user from tables
    con.query(`DELETE alltime, scores FROM alltime INNER JOIN scores ON alltime.user = scores.user WHERE alltime.user='${member.user.id}' AND alltime.guild=${member.guild.id} AND scores.user='${member.user.id}' AND scores.guild=${member.guild.id} `, (err, rows) => {
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

    //Select alltime table
    con.query(`SELECT * FROM alltime WHERE user = '${user.id}'`, function (err, result, fields) {
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

                if (results.afk === 1) {

                    con.query(`UPDATE alltime, scores SET alltime.afk = false, scores.afk = false, alltime.reason = NULL, scores.reason = NULL, alltime.afktime = NULL,  scores.afktime = NULL WHERE alltime.user = '${user.id}' AND scores.user = '${user.id}'`), (err, rows) => {
                        if (err) throw err;
                    }

                    //message.member.setNickname(`[AFK] ${message.author.username}`).then(message.reply(`Welcome back! I've removed your AFK`))
                    message.reply(`Welcome back. I have removed your AFK.`)
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
    con.query(`SELECT * FROM scores WHERE user="${message.author.id}" AND guild= "${message.guild.id}"`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO scores (user, guild, points) VALUES ('${message.author.id}', '${message.guild.id}', '1')`, (err, rows) => {
                if (err) throw err;
            };

        } else {
            sql = `UPDATE scores SET points = points +1 WHERE user="${message.author.id}" AND guild= "${message.guild.id}"`;
        };

        con.query(sql);

    });
    //--------------------------------------------

    //If message is sent add points to alltime table
    con.query(`SELECT * FROM alltime WHERE user="${message.author.id}" AND guild= "${message.guild.id}"`, (err, rows) => {
        if (err) throw err;


        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO alltime (user, guild, points) VALUES ('${message.author.id}', '${message.guild.id}', '1')`, (err, rows) => {
                if (err) throw err;
            };
            //connection.release();
        } else {
            let score = rows[0].alltime;
            sql = `UPDATE alltime SET points = points +1 WHERE user="${message.author.id}" AND guild= "${message.guild.id}"`, (err, rows) => {
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