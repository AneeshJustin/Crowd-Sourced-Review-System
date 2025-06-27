const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { category, title, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const post = new Post({ category, title, description, imageUrl });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const category = req.query.category;
    let filter = {};
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const { category, title, description } = req.body;
  const imageUrl = req.file ? req.file.path : undefined;

  const updateFields = { category, title, description };
  if (imageUrl) updateFields.imageUrl = imageUrl;

  const post = await Post.findByIdAndUpdate(req.params.id, updateFields, { new: true });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};
