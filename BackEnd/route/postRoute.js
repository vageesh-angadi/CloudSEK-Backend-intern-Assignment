const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('comments');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comments');
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:postId/comments', async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({ text });
    await comment.save();

    const post = await Post.findById(req.params.postId);
    post.comments.push(comment);
    await post.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
