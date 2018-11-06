const router = require('express').Router();
const { comment, post } = require('../models');

// CREATE COMMENT ROUTE
router.post('/posts/:postId/comments', (req, res, next) => {
  comment.create(req.body).then(comment => {
    post.updateOne({ _id: req.params.postId }, {
      $push: { comments: comment._id }
    }).then(post => {
      res.redirect(`/posts/${req.params.postId}`);
    });
  }).catch(error => {
    next(new Error(`Error while trying to create new comment! - ${error.message}`));
  });
});

// Export our router
module.exports = router;