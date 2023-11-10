const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.delete('/deleteArt/:id', (req, res) => {
    console.log("Received deleteArt request:")
    console.log(req);
    const id = req.params.id;

    db.query(
        "DELETE FROM artworks WHERE id = ?",
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

router.post('/', (req, res) => {
    const statement = req.body.select;

    db.query(
        statement,
        (err, result) => {
            if(err) {
                console.log(err);
                return res.json("Category Change Failed")
            }
            return res.json(result);
        }
    )
})

module.exports = router;
