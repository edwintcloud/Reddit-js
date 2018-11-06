const router = require('express').Router();
const { post } = require('../models');

// BASE POSTS ROUTES
router.route('/posts')
  .get((req, res, next) => {
    post.find().lean().then(posts => {
      res.render('posts-index', { posts });
    }).catch(error => {
      next(new Error(`Error while trying to find all posts! - ${error.message}`));
    });
  })
  .post((req, res, next) => {
    post.create(req.body).then(post => {
      res.redirect('/');
    }).catch(error => {
      next(new Error(`Error while trying to create new post! - ${error.message}`));
    });
  })
  .put((req, res, next) => {
    next(new Error(`Not implemented!`));
  })
  .delete((req, res, next) => {
    next(new Error(`Not implemented!`));
  });

// NEW POST FORM ROUTE
router.get('/posts/new', (req, res, next) => {
  res.render('posts-new');
});

// SHOW ONE POST BY ID ROUTE
router.get('/posts/:id', (req, res, next) => {
  post.find({ _id: req.params.id }).populate('comments').lean().then(post => {
    res.render('posts-show', { post: post[0] });
  }).catch(error => {
    next(new Error(`Error while trying to find post by id! - ${error.message}`));
  });
});

// SHOW SUBREDDIT ROUTE
router.get('/n/:subreddit', (req, res, next) => {
  post.find({ subreddit: req.params.subreddit }).lean().then(posts => {
    res.render('posts-index', { posts });
  }).catch(error => {
    next(new Error(`Error while trying to find posts by subreddit! - ${error.message}`));
  });
});

// Export our router
module.exports = router;