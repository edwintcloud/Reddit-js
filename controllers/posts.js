const router = require('express').Router()

router.route('/posts')
  .get((req, res, next) => {

  })
  .post((req, res, next) => {
    
  })
  .put((req, res, next) => {
    
  })
  .delete((req, res, next) => {
    
  })

router.get('/posts/new', (req, res, next) => {
  res.render('posts-new')
})

// Export our router
module.exports = router