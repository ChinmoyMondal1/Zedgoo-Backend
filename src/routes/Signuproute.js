const express = require('express');
const router = express.Router();
const SignupControls= require('../controller/SignupControl')

router.post('/signup',SignupControls);

module.exports = router;