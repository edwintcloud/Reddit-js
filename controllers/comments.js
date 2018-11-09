const router = require("express").Router();
const { post, comment } = require("../models");
const { checkAuth } = require("../middlewares");

// CREATE COMMENT ROUTE
router.post("/posts/:postId/comments", checkAuth, (req, res, next) => {
  comment.create(req.body).then(newComment => {
    post.findById(req.params.postId).then(post => {
      post.comments.unshift(newComment._id);
      post.save();
      res.redirect(`/posts/${post._id}`);
    }).catch(error => {
      Promise.reject(new Error(error));
    });
  }).catch(error => {
    next(new Error(`Unable to create new comment! - ${error.message}`));
  });
});

// REPLY TO COMMENT FORM ROUTE
router.get("/posts/:postId/comments/:commentId/replies/new", checkAuth, (req, res, next) => {
  res.render('replies-new', {
    post_id: req.params.postId,
    comment_id: req.params.commentId
  });
});

// CREATE REPLY ROUTE
router.post('/posts/:postId/comments/:commentId/replies', checkAuth, (req, res, next) => {
  comment.create(req.body).then(newComment => {
    comment.findById(req.params.commentId).then(parentComment => {
      parentComment.replies.push(newComment._id);
      parentComment.save();
      res.redirect(`/posts/${req.params.postId}`);
    }).catch(error => {
      Promise.reject(new Error(error));
    });
  }).catch(error => {
    next(new Error(`Unable to create new reply! - ${error.message}`));
  })
});

// Export our router
module.exports = router;
