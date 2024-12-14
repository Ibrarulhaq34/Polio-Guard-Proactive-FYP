const Post = require('../Models/Clientpost');

module.exports.getPost = async (req, res) => {
try {
const getPosts = await Post.find();
res.status(200).json(getPosts);
}catch(err){
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
}
};

module.exports.addPost = async (req, res) => {
    const { name , content } = req.body;
   
    try {
     
      const newMap = new Post({ name, content });
      await newMap.save();
      res.status(200).json({ msg: 'Your response added successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };