var keystone     = require('keystone');
var objectAssign = require('object-assign');
var _            = require('lodash');

var AppConstants = require('../../app/constants/AppConstants');

function getFn (req, res, next) {
  var props = {};

  var skipCount = _.isEmpty(req.query) ? 0 : req.query.skip;
  var limit = 15;  // AppConstants.Values.POST_LIMIT;

  // var categoryFilterArray = !!req.cookies[AppConstants.Keys.FILTER_COOKIE]
  //   ? JSON.parse(req.cookies[AppConstants.Keys.FILTER_COOKIE])
  //   : [];

  var q = keystone.list('Post').model
    .find()
    .where('state', 'published')
    // .where('category').nin(categoryFilterArray)
    .sort('-publishedDate')
    .populate('author', '-_id -password -isAdmin')
    .skip(skipCount)
    .limit(15);

  q.exec(function(err, results) {
    props.posts = results;
    req.props = objectAssign(props, results);
    next(err);
  });
}


exports = module.exports = {
  get: getFn
};