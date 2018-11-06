module.exports = function(req, res, next) {
  if(req.session.user) return next();
  res.status(401);
  next(new Error(`Not Authorized - ${req.method} ${req.originalUrl}`));
};