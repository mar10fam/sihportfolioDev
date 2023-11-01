const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error("Error destroying session: ", err);
        } else {
            res.clearCookie("userId");
            res.json({ message: "Logout Successful"})
        }
    })
})

module.exports = router;