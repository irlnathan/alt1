module.exports = function(req, res, next) {

  if (req.session.me && req.session.me.id) {
    var sessionMeIdEqualToId = req.session.me.id == req.param('id');
  }

  if (sessionMeIdEqualToId) {
    return next();
  }

  return res.forbidden('You are not permitted to perform this action.');

};