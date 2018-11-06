const router = require('express').Router()

router.route('/')
  
  .get((req, res, next) => {
    res.render('index')
  })

// Export our router
module.exports = router