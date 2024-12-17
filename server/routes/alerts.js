
const express = require('express');
const router = express.Router();
const { addPost, getPost} = require('../controllers/alerts');


router.get('/getPost', getPost);
router.post('/addPost', addPost);



module.exports = router;
