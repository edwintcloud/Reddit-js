const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = process.env.PORT || 5000;
const controllers = require('./controllers');
const { notFoundHandler, errorHandler } = require('./middlewares');
const { db } = require('./utils');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

// Connect to MongoDB
const dbConnection = db.connect();

// Setup express to use our session - make sure to set your secure secret!
app.use(session({
  secret: '1Gc7a4"5/62k*x;>WpT[QVfJ!`0Wi#2o!e5f:XUooox[C[g$qx&F&^jSZ.UF)zj',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1800000  // 30 minutes (in ms) and our session will expire
  },
  store: new MongoStore({
      mongooseConnection: dbConnection
  })
}));

// Configure nunjucks templating engine
const nEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Congigure express
app.set('view engine', 'html');
app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded({
  extended: false
}));

// Set a local variable to hold session before routes for template usage
app.use((req, res, next) => {
  if(req.session) {
    res.locals.session = req.session.user;
  } else {
    res.locals.session = undefined;
  }
  next();
});

// Import our controllers
for (var i in controllers) {
  if (Object.getPrototypeOf(controllers[i]) == express.Router) {
    app.use(controllers[i]);
  }
}

// If no routes found then send to notFoundHandler
app.use(notFoundHandler);

// All errors will be sent here and displayed to the user
app.use(errorHandler);

// Start our app and listen for requests
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

// Export our app to be used for tests
module.exports = app;