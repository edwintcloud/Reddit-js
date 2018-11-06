const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const port = process.env.PORT || 5000
const controllers = require('./controllers');
const { notFoundHandler, errorHandler } = require('./middlewares')

// Configure nunjucks templating engine
const nEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// Congigure express
app.set('view engine', 'html')
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

// Import our controllers
for (var i in controllers) {
  if (Object.getPrototypeOf(controllers[i]) == express.Router) {
    app.use(controllers[i]);
  }
}

// If no routes found then send to notFoundHandler
app.use(notFoundHandler);

// All errors will be sent here and displayed to the user in json format
app.use(errorHandler);

// Start our app and listen for requests
app.listen(port, () => {
  console.log(`App started on port ${port}`)
})

// Export our app to be used for tests
module.exports = app