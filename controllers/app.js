const router = require('express').Router();
const { checkAdmin } = require('../middlewares');

router.route('/')
  .get((req, res, next) => {
    res.redirect('/posts');
  });

router.get('/admin', checkAdmin, (req, res, next) => {
  res.render('error', {
    message: `Hello admin 👋`
  });
});

// Export our router
module.exports = router;