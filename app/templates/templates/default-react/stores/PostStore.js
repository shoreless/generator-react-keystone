var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var _            = require('lodash');
var assign       = require('object-assign');
var Immutable    = require('immutable');
var EventEmitter = require('events').EventEmitter;

var ActionTypes  = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _postMap = Immutable.Map();


var PostStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function (id) {
    // TODO: This should not call toJS before returning the post
    return _postMap.toJS()[id];
  },

  getPosts: function () {
    return _postMap;
  }

});


PostStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    /* Add array of posts */
    case ActionTypes.ADD_POSTS:
      
      var newMap = _postMap.withMutations(function (mutableMap) {
        _.forEach(action.posts, function (post) {
          if (!mutableMap.has(post._id)) {
            post.publishedDate = Date.parse(post.publishedDate);
            mutableMap.set(post._id, post);
          }
        });
        return mutableMap;
      });

      // TODO: This assumes that withMutations returns the same object if nothing has changed, is that true?
      if (newMap !== _postMap) {
        _postMap = newMap;
        PostStore.emitChange();
      }

      break;

    /* Clear posts */
    case ActionTypes.CLEAR_POSTS:
      _postMap = _postMap.clear();
      PostStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = PostStore;