const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},{ strictPopulate: false });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
