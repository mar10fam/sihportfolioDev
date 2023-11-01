const express = require('express');
const router = express.Router();
const db = require('../config/db');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve('../public/images');
        return cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

router.post('/', upload.single('art'), (req, res) => {
    console.log("Received a form submission");

    const title = req.body.title;
    const type = req.body.type;
    const date = req.body.date;
    const description = req.body.description;
    const art = req.file.filename;

    db.query(
        "INSERT INTO artworks (title, type, date, description, art) VALUES (?, ?, ?, ?, ?)",
        [title, type, date, description, art],
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
