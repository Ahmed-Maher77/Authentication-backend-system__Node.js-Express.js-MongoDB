const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    const fileName = path.join(__dirname, "..", "public", "views", "index.html");
    res.sendFile(fileName);
})


module.exports = router;