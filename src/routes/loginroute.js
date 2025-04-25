const express = require('express');
const logincontrol = require('../controller/loginControls.js');
const authenticate = require('../auth_Middleware/jwtverify.js')

const router = express.Router();
router.post('/signin', logincontrol);
router.get('/dashboard', authenticate, (req, res) => {
    res.status(200).json({
        message: `Welcome ${req.user.email}!`,
        user: req.user
    });
});


module.exports= router;