const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.put('/', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const date = req.body.date;
    const description = req.body.description;

    db.query(
        "UPDATE artworks SET title = ?, date = ?, description = ? WHERE id = ?",
        [title, date, description, id],
        (err, result) => {
            if(err) {
                console.error(err);
            } else {
                res.send(result);
            }
        }
    )
})

router.get('/viewArt/:id', (req, res) => {
    const id = req.params.id;

    db.query(
        "SELECT * FROM artworks WHERE id = ?",
        id,
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

module.exports = router;