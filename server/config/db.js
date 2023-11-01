const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'l0ebsc9jituxzmts.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: "3306",
    user: 'd8o7xu90iprgureu',
    password: 'q7mqrlzxmi2nblfw',
    database: 'rsb8bnzii7td6x5k'
});

db.connect((err) => {
    if(err) {
        console.log(err.message);
        return
    }
    console.log("Database connected.");
})

module.exports = db;

