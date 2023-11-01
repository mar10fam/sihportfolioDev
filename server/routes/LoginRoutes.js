const express = require('express');
const router = express.Router();
const db = require('../config/db');

const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    console.log("Received a login request");
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if(err) {
                console.log(err);
                return res.json("Login Failed: ", err);
            } 
            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send("We could not find an admin with that username and password")
                    }
                });
            } else {
                return res.json("User does not exist");
            }
        }
    );
});

router.get('/getLogin', (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false });
    }
});

router.post('/newadmin', (req, res) => {
    const username = req.body.registerUser;
    const password = req.body.registerPw;

    bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
            console.error(err);
            res.send("There was an error attempting to register the admin");
        } else {
            db.query(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, hash],
                (err, result) => {
                    if(err) {
                        console.error(err);
                        res.send("There was an error attempting to register the admin into the database")
                    } else {
                        res.send("Added new admin successfully");
                    }
                }
            )
        }
    }) 
})

module.exports = router;