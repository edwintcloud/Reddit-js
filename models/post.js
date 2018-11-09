const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  subreddit: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: 
    {
      up: {
        type: Number,
        default: 0
      },
      down: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      }
    }

}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
