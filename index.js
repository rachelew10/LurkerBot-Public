//Definitions
//const token = process.env.token;
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const mysql = require("mysql");
var host = "us-cdbr-iron-east-03.cleardb.net";
var db = "heroku_86f8cade96e433e";

//MySQL Connection
var con = mysql.createPool({
    host: host,
    user: 'b2b26b73d8f7a1',
    password: '60b93cfd',
    database: db,
});

//Bot login
bot.login(botconfig.token);
//Command Array
bot.commands = new Discord.Collection();

//Command Handler
fs.readdir('./commands/', (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)];
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

con.getConnection(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database....");
});

//Bot status
bot.on("ready", () => {
    console.log(`${bot.user.username} is online....`);
    console.log(`Bot online in: ${bot.guilds.size} servers`);
    bot.user.setStatus('Online');
    bot.user.setActivity(';help for commands', { type: "WATCHING" });

    //Delete points table data after 2 weeks
    setInterval(function () {
        var timestamp = new Date();
        con.query("DELETE FROM scores");
        // con.query("SELECT * FROM lastdelete WHERE id='1'");
        // con.query("UPDATE lastdelete SET num = '1' WHERE id= '1'");
        console.log(`bi-weekly scores deleted on ${timestamp} `);

    }, 1209600000);


});

//Listener event, user joining guild 
bot.on('guildMemberAdd', member => {
    //if user join is bot, ignore
    if (member.user.bot) return;

    //Add user into scores table
    console.log('User ' + member.user.username +  ' has joined ' + member.guild.name);
    con.query(`SELECT * FROM scores WHERE user="${member.user.id}" AND guild= "${member.guild.id}"`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO scores (user, guild, points) VALUES ('${member.user.id}', '${member.guild.id}', '0')`, (err, rows) => {
                if (err) throw err;
            };
            console.log(member.user.username + " Added to scores table")

        } else {
            return;
        };

        con.query(sql);


    });
    //Add user into alltime table
    con.query(`SELECT * FROM alltime WHERE user="${member.user.id}" AND guild= "${member.guild.id}"`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO alltime (user, guild, points) VALUES ('${member.user.id}', '${member.guild.id}', '0')`, (err, rows) => {
                if (err) throw err;
            };
            console.log(member.user.username + " Added to alltime table")

        } else {
            return;
        };

        con.query(sql);


    });



});

//Listener event, user leaving guild
bot.on('guildMemberRemove', member => {
    //Add user into alltime table
    console.log('User ' + member.user.username + ' has left ' + member.guild.name);
    con.query(`DELETE FROM alltime WHERE user='${member.user.id}' AND guild=${member.guild.id}`, (err, rows) => {
        if (err) throw err;
    });
    con.query(`DELETE FROM scores WHERE user='${member.user.id}' AND guild=${member.guild.id}`, (err, rows) => {
        if (err) throw err;
    });
    console.log(member.user.username + " Removed from scores & alltime table")

});


//Message listener
bot.on("message", message => {
    //data checks
    if (message.author.bot) return; // ignore bot messages
    if (message.channel.type == "dm") return; //ignore DMs

    //Custom prefixes
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (prefix == cmd.slice(0, 1)) {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args, con);
    }

    //If message is sent add points to scores table

    con.query(`SELECT * FROM scores WHERE user="${message.author.id}" AND guild= "${message.guild.id}"`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO scores (user, guild, points) VALUES ('${message.author.id}', '${message.guild.id}', '1')`, (err, rows) => {
                if (err) throw err;
            };

        } else {
            let score = rows[0].scores;
            sql = `UPDATE scores SET points = points +1 WHERE user="${message.author.id}" AND guild= "${message.guild.id}"`;
        };

        con.query(sql);

    });

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

    //send eye emoji when message is eye emoji
    // if (message.content.startsWith("👀")) {
    //     message.channel.send("👀");
    // };
})