const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bodyParser = require('body-parser');

router.use(express.json());

router.post('/', (req, res) => {
    console.log("Received a form submission");
    console.log("Body Contents: ", req.body);
    const title = req.body.title;
    const type = req.body.type;
    const date = req.body.date;
    const description = req.body.description;
    const artFileName = req.body.artFileName;

    console.log(title,"\n",type,"\n",date,"\n",description,"\n",artFileName,"\n");
    db.query(
        "INSERT INTO artworks (title, type, date, description, artFileName) VALUES (?, ?, ?, ?, ?)",
        [title, type, date, description, artFileName],
        (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ error: "Form Submit Failed" });
            }
            return res.json(result);
        }
    )
});

module.exports = router;
