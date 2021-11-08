var express = require('express');
var router = express.Router();

const AuthUser = require('../models/AuthUser');

// "/api/auth_users"

// @route       GET api/auth_users/email/:email
// @desc        Find an authorized user by email
// @access      Public

router.get("/email/:email", function(req, res) {
    AuthUser.find({email: {$in: [req.params.email]}}, 
        function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

// @route       GET api/auth_users/name/:name
// @desc        Find an authorized user by name
// @access      Public

router.get("/name/:name", function(req, res) {
    AuthUser.find({name: {$in: [req.params.name]}}, 
        function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

module.exports = router;