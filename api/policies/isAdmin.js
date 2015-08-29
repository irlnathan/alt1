module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.me && req.session.me.id) {
    User.findOne(req.session.me.id).exec(function(err, foundUser){
   
      if (!foundUser) {
        return res.forbidden('You are not permitted to perform this action.');
      }

      if (foundUser.admin) {
          return next();
      } else {
        return res.forbidden('You are not permitted to perform this action.');
      }
    });
  }
};