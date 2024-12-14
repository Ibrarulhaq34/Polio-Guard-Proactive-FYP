
const express = require('express');
const router = express.Router();
const { teamLeadSignup, teamLeadLogin } = require('../controllers/teamLeadController');


router.post('/signup', teamLeadSignup);


router.post('/login', teamLeadLogin);

module.exports = router;
