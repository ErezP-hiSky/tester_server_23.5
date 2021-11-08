const express = require('express');
var router = express.Router();

const testerNameData = require('../models/TesterNameModel');

router.get('/', (req, res) => {
    testerNameData.find({}, (err, foundTesterNames) => {
        if (!err) {
            res.send(foundTesterNames);
        } else {
            res.send("The error is: " + err);
        }
    });
})

module.exports = router;