# Lurker bot

A simple ugly bot created for use in the FATAL GOT:C Server to track members activity plus some useful features.

## List of commands & features
```botinfo``` - Bot information (Creation date & Developer info) 

```serverinfo``` - Server information (Creation date, total members, date you joined)

```prefix``` - Changes prefix for the bot. Default is ```;```

```help``` - DMs a list of commands and their uses

```top10``` - Top 10 active users on current server (resets every 2 weeks) 

```top10all``` - Top 10 active users of all time on current server

```inactive``` - Bottom 15 inactive users on current server (resets every 2 weeks)

```inactiveall``` - Bottom 15 inactive users of alltime on current server

```stats``` - Shows number of messages sent and last message date for current server (resets every 2 weeks)

```statsall``` - Shows number of messages sent and last message date of all time for current server

```clear``` - Bulk clear messages **Admin only**

```report``` - Report member to "report" channel

```shame``` - Whip the shame bell out if someone said something stupid

```birthdayadd``` - Adds birthdate to user (for tracking birthday announcements) **Admin Only**

```birthdays``` - A list of birthdays for the current month **Admin Only**



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

2. Create a MySQL DB and set up 2 tables
```alltime, scores```

   2(a). Add fields into alltime table: 
   ```id (int, key, auto increment), user (varchar), guild (varchar), points (varchar), lstmsg (timestamp, On Update Current_Timestamp),    bday (date)```

   2(b). Add fields into scores table: 
   ```id (int, key, auto increment), user (varchar), guild (varchar), points (varchar), lstmsg (timestamp, On Update, Current_Timestamp)```
   
3. Add token & mySQL connection details into index.js. Lines 2, 9, 10, 11 & 12
```const token = 'bot token here';
var host = "mysql hostname here";
var db = "mysql database name here";
var user = "mysql username here"
var pw = "mysql password here"
```
   
4. run bot
```node index.js```

## Authors

* **Rachele Williams** Aka QueenInTheNorth - *Initial work* - [Lurker Bot](https://github.com/rachelew10/LurkerBot-Public)

See also the list of [contributors](https://github.com/rachelew10/LurkerBot-Public/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## To-do
- [X] Delete all mysql db data for user on user leave
- [X] Add mysql db data for user on user join
- [X] Add birthday dates to users ID in mysql db using command
- [X] Create command to list birthdays for current month
- [ ] Display only DD/MM of user when using ;birthdays 
- [ ] Grab list of users in server and put into mysql db on bot join

- [ ] Make bot messages look pretty
- [ ] Clean up code
- [ ] Fix mysql injection vulnerabilities
