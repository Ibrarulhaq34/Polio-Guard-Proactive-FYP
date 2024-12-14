
const express = require('express');
const router = express.Router();
const { workerSignup, workerLogin } = require('../controllers/workerController');


router.post('/signup', workerSignup);


router.post('/login', workerLogin);

module.exports = router;
