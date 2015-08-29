/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

 showSignupPage: function (req, res) {
    if (req.session.me) {
      return res.redirect('/');
    }

    return res.view('signup', {
      me: null
    });
  },

  showRestorePage: function (req, res) {

    if (req.session.me) {
      return res.redirect('/');
    }

    return res.view('restore', {
      me: null
    });
  },

  showEditProfilePage: function (req, res) {

    if (!req.session.me) {    //#A
      return res.redirect('/');
    }

    User.findOne(req.session.me, function (err, user){
      if (err) {
        console.log('error: ', error);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('edit-profile', {
        me: {
          id: user.id,
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showProfilePage: function (req, res) {

    if (!req.session.me) {    //#A
      return res.redirect('/');
    }

    User.findOne(req.session.me, function (err, user){
      if (err) {
        console.log('error: ', error);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('profile', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showAdminPage: function(req, res) {
    if (!req.session.me) {
      return res.redirect('/');
    }

    User.findOne(req.session.me, function(err, user) {

      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      if (user.admin) {
        return res.view('adminUsers', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      } else {
        return res.view('homepage', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      }
    });
  },

  showHomePage: function(req, res) {

    if (!req.session.me) {
      return res.view('homepage', {
        me: null
      });
    }

    User.findOne(req.session.me.id, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('homepage', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showVideosPage: function(req, res) {

    if (!req.session.me) {
      return res.view('videos', {
        me: null
      });
    }

    User.findOne(req.session.me.id, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('videos', {
          me: null
        });
      }

      return res.view('videos', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  }
};