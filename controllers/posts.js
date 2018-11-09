const router = require('express').Router();
const { post, user } = require('../models');
const { checkAuth } = require('../middlewares');

// BASE POSTS ROUTES
router.route('/posts')
  .get((req, res, next) => {
    post.find().populate('author').lean().then(posts => {
      res.render('posts-index', { posts });
    }).catch(error => {
      next(new Error(`Error while trying to find all posts! - ${error.message}`));
    });
  })
  .post(checkAuth, (req, res, next) => {
    post.create(req.body).then(post => {
      return user.updateOne({ _id: req.session.user._id }, {
        $push : {
          posts: {
            $each: [post._id],
            $position: 0
          }
        }
      }).lean();
    }).then(post => {
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
  post.find({ _id: req.params.id }).populate({ path: 'comments', populate: { path: 'replies' }}).populate('author').lean().then(post => {
    res.render('posts-show', { post: post[0] });
  }).catch(error => {
    next(new Error(`Error while trying to find post by id! - ${error.message}`));
  });
});

// SHOW SUBREDDIT ROUTE
router.get('/n/:subreddit', (req, res, next) => {
  post.find({ subreddit: req.params.subreddit }).populate('author').lean().then(posts => {
    res.render('posts-index', { posts });
  }).catch(error => {
    next(new Error(`Error while trying to find posts by subreddit! - ${error.message}`));
  });
});

// UpVote Route
router.put('/posts/:id/upvote', (req, res, next) => {
  post.findById(req.params.id).then(post => {
    post.votes['up'] += 1;
    post.votes['total'] += 1;
    post.save();
    res.send();
  }).catch(error => {
    next(new Error(`Unable to upvote - ${error.message}`))
  });
});

// DownVote Route
router.put('/posts/:id/downvote', (req, res, next) => {
  post.findById(req.params.id).then(post => {
    post.votes['down'] += 1;
    post.votes['total'] -= 1;
    post.save();
    res.send();
  }).catch(error => {
    next(new Error(`Unable to downvote - ${error.message}`))
  });
});

// Export our router
module.exports = router;