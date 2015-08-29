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
  }
};

