const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema); //  check if the model is already defined

module.exports =  Comment;
