# Lurker bot

A simple ugly bot created for use in the FATAL GOT:C Server to track members activity plus some useful features.

## List of commands & features

Information Commands:
------

```help``` - DMs a list of commands

```botinfo``` - Bot information (Creation date & Developer info)

```serverinfo``` - Server information (Creation date, total members, date you joined)

```roleinfo``` - Lists detailed role information

```ping``` - Bot diagnostic, displays latency info for bot & API

```uptime``` - Displays how long the bot has been up for

Utility Commands:
------

```stats``` - Shows number of messages sent and last message date for current server (resets every 2 weeks)

```statsall``` - Shows number of messages sent and last message date of all time for current server

```top10``` - Top 10 active users on current server (resets every 2 weeks) 

```top10all``` - Top 10 active users of all time on current server

```inactive``` - Bottom 15 inactive users on current server (resets every 2 weeks)

```inactiveall``` - Bottom 15 inactive users of alltime on current server

```mybirthday``` - For non admin users to enter their own birthday into the DB

```profile``` - User profile with birthday & lurker info

```report``` - Report member to "report" channel

```avatar``` - Returns mentioned users avatar or message author if no mentioned user

```timer``` - Set a timer for seconds, minutes, hours or days

```number``` - Get a number between min & max

```afk``` - Set AFK (for inactive user tracking)

Fun commands:
------

```shame``` - Whip the shame bell out if someone said something stupid

```genius``` - Mark Genius gif

```gif``` - A random gif

```urban``` - Search UrbanDictionary for a definition

```coinflip``` - Flip a coin

``sosig`` - Show off Ramsay's big sausage

``s8`` - A countdown till Game of Thrones S8EP1

Admin Commands:
------

```prefix``` - Changes prefix for the bot. Default is ```;``` **Admin Only**

```birthdays``` - A list of birthdays for the current month **Admin Only**

```birthdayadd``` - Adds birthdate to user (for tracking birthday announcements) **Admin Only**

```clear``` - Bulk clear messages **Admin only**

Developer Commands:
------

```refresh``` - Refresh points in scores table (bi-weekly activity refresh) **Developer Only**

```setactivity``` - Set bot activity **Developer Only**

```rename``` - Set a new nickname for the bot **Developer Only**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

NodeJS & NPM
```https://nodejs.org/en/```

Discord.Js
```$ npm install discord.js```

Node-gyp
```$ npm install node-gyp```

mySQL
````$ npm install mysql````

Moment
```$ npm install moment```

Git (If you want to update)
```$ npm install git```


### Setting up locally

1. Install all Prerequisites

2. Edit botconfig.json file with relevant info:
    a.```"prefix": "default prefix here",```
    b. ```"giphyAPI": "Generate a Giphy API from https://developers.giphy.com/",```
    c. ```"token": "bot token here",```
    d. ```"host": "mysql db hostname",```
    e. ```"db": "mysql db name",```
    f. ```"user": "mysql db username",```
    g.```"pw": "mysql db password",```
    h.```"dev": "developer ID for dev commands",```
    i.```"bdadmin": "birthday admin ID for admin commands (if bday admin doesnt have administrator role)"```
   
3. Create a MySQL DB and set up 2 tables. SQL Files in "SQL Structure" file.
```alltime, scores```

   
4. run bot
```node index.js```

## Authors

* **Rachele Williams** Aka QueenInTheNorth - *Initial work* - [Lurker Bot](https://github.com/rachelew10/LurkerBot-Public)

See also the list of [contributors](https://github.com/rachelew10/LurkerBot-Public/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
