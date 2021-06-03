var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
    '/', 
    [
        check('name', 'Please add name').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            // if user doesn't exist yet
            user = new User({
                name,
                email,
                password
            });

            // hash the password 10 rounds (the default)
            const salt = await bcrypt.genSalt(10);
            // before saving to DB, encrypting the password:
            user.password = await bcrypt.hash(password, salt);

            // send to the DB
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            // return a token if registration succeed
            jwt.sign(payload, config.get('jwtSecret'),
            {
                expiresIn: 36000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
});

// @route       GET api/users/email
// @desc        Find an authorized user by email
// @access      Public

router.get("/email/:email", function(req, res) {
    User.find({email: {$in: [req.params.email]}}, 
        function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

module.exports = router;
