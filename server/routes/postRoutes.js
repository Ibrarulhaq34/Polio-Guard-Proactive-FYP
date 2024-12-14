const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../middlewares/upload');


router.post('/posts', upload.single('image'), postController.createPost);

router.get('/posts', postController.getPosts);


router.get('/posts/:id', postController.getPostById);


router.put('/posts/:id', upload.single('image'), postController.updatePost);


router.delete('/posts/:id', postController.deletePost);

module.exports = router;
