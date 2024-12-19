const Post = require("../models/Post");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Create a post
const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path;

    if (!image) return res.status(400).json({ message: "Image is required" });

    const post = new Post({ title, description, image });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost };
