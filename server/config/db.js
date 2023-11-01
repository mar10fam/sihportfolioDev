const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    port: "3306",
    user: 'root',
    password: 'password',
    database: 'sih_portfolio_db'
});

db.connect((err) => {
    if(err) {
        console.log(err.message);
        return
    }
    console.log("Database connected.");
})

module.exports = db;

