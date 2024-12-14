
const express = require('express');
const router = express.Router();
const { clientSignup, clientLogin } = require('../controllers/clientController');


router.post('/signup', clientSignup);
router.post('/login', clientLogin);

module.exports = router;
