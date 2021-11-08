const express = require('express');
var macRouter = express.Router();

const macData = require('../models/MacModel');

macRouter.get('/', (req, res) => {
    macData.find({}, (err, foundMacs) => {
        if (!err) {
            res.send(foundMacs);
        } else {
            res.send("The error is: " + err);
        }
    });
});

macRouter.get('/taken', (req, res) => {
    macData.find({isTaken: {$eq: "TRUE"}}, (err, foundMacs) => {
        if (!err) {
            res.send(foundMacs);
        } else {
            res.send("The error is: " + err);
        }
    });
});

macRouter.get('/last_mac', (req, res) => {
    macData.findOne({}, {}, { sort: { '_id' : -1 } }, (err, foundMac) => {
        if (!err) {
            res.send(foundMac);
        } else {
            res.send("The error is: " + err);
        }
    });
});

macRouter.get('/get_new_mac', (req, res) => {
    macData.findOne({'isTaken': {$eq: "FALSE"}}, (err, foundMac) => {
        if (!err) {
            res.send(foundMac);
        } else {
            res.send("The error is: " + err);
        }
    });
});

macRouter.put('/update_mac/:mac', (req, res) => {
    const mac_to_update = req.params.mac;    
    macData.updateOne({'Mac_Address': {$eq: mac_to_update}},
    {$set: {
        SN: req.body.SN,
        Note1: req.body.Note1,
        Name: req.body.Name,
        isTaken: 'TRUE'
    }},
    (err, foundMac) => {
        if (!err) {
            res.send(foundMac);
        } else {
            res.send("The error is: " + err);
        }
    });
});



module.exports = macRouter;