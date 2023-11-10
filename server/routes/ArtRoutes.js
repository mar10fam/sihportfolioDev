const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { ref, uploadBytes, deleteObject } = require('firebase/storage');
const { v4 } = require('uuid');
const storage = require('../config/firebase');
const multer = require('multer');

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

router.post('/addArt', upload.single('art'), async (req, res) => {
    const file = req.file;
    const fileName = `${file.originalname + v4()}`;
    const imageRef = ref(storage, fileName);
    const metatype = { contentType: file.mimetype, name: fileName };
    await uploadBytes(imageRef, file.buffer, metatype)
        .then(() => {
            res.send({ artFileName: fileName});
        }).catch((err) => {
            console.error(err);
        });
});

router.delete('/delete/:artFileName', async (req, res) => {
    const deleteRef = ref(storage, req.params.artFileName)
    await deleteObject(deleteRef)
        .then(() => {
            res.send("Art Deleted!")
        }).catch((err) => {
            console.error(err);
        })
})

module.exports = router;