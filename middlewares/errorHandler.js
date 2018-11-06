module.exports = function(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.render('error', {
    message: error.message
  });
};