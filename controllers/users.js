const router = require('express').Router();
const { user } = require('../models');

// REGISTER FORM ROUTE
router.get('/users/register', (req, res, next) => {
  res.render('users-register');
});

// LOGIN FORM ROUTE
router.get('/users/login', (req, res, next) => {
  res.render('users-login');
});

// CREATE USER ROUTE
router.post('/users', (req, res, next) => {
  // make sure passwords match before creating user
  if(req.body.password != req.body.confirmPassword) {
    next(new Error(`Passwords must match!`));
  }
  // create the user
  user.create(req.body).then(user => {
    user.password = undefined;
    req.session.user = user;
    res.redirect('/');
  }).catch(error => {
    if(error.code == 11000) {
      next(new Error(`User already registered with specified username!`));
    }
    next(new Error(`Unable to create new user! - ${error.message}`));
  });
});

// LOGOUT USER ROUTE
router.get('/users/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

// LOG IN USER ROUTE
router.post('/users/login', (req, res, next) => {
  user.authenticate(req.body.username, req.body.password).then(user => {
    user.password = undefined;
    req.session.user = user;
    res.redirect('/');
  }).catch(error => {
    next(new Error(`Unable to login user! - ${error.message}`));
  });
});

// Export our router
module.exports = router;