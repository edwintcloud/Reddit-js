const router = require('express').Router();

router.route('/')
  
  .get((req, res, next) => {
    res.redirect('/posts');
  });

// Export our router
module.exports = router;