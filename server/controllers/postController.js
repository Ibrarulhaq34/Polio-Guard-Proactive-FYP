const Post = require('../Models/Post');


exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; 

       
        const newPost = new Post({
            title,
            content,
            imageUrl, 
        });

        await newPost.save();

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};


exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
};


exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch post', error });
    }
};


exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = req.body.imageUrl;

        
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const post = await Post.findByIdAndUpdate(req.params.id, {
            title,
            content,
            imageUrl
        }, { new: true });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post', error });
    }
};


exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error });
    }
};
