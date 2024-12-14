
const express = require('express');
const router = express.Router();
const { addPost, getPost} = require('../controllers/clientPost');


router.get('/getPost', getPost);
router.post('/clientPost', addPost);



module.exports = router;
