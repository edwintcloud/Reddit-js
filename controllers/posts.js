const router = require('express').Router();
const { post } = require('../models');

router.route('/posts')
  .get((req, res, next) => {

  })
  .post((req, res, next) => {
    post.create(req.body).then(post => {
      res.redirect('/');
    }).catch(error => {
      next(new Error(`Error while trying to create new post!`));
    })
  })
  .put((req, res, next) => {
    
  })
  .delete((req, res, next) => {
    
  });

router.get('/posts/new', (req, res, next) => {
  res.render('posts-new')
});

// Export our router
module.exports = router;