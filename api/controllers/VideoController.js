/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {

    Video.find().exec(function (err, foundVideos){
      if (err) res.negotiate(err);

      if (!foundVideos) res.notFound();

      res.json(foundVideos);
    });
  },

  addVideo: function(req, res) {

    if (!req.session.me) return res.forbidden();

    if (!req.session.me.id) return res.forbidden();

    if (_.isUndefined(req.param('title'))) return res.badRequest();
    if (_.isUndefined(req.param('src'))) return res.badRequest();

    Video.create({
      title: req.param('title'),
      src: req.param('src')
    }).exec(function(err, createdVideo){
      if (err) res.negotiate(err);

      return res.json(createdVideo);
    });
  }
};

