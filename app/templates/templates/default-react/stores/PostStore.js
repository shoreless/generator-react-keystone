const _            = require('lodash');
const Immutable    = require('immutable');
const EventEmitter = require('events').EventEmitter;
const assign       = require('object-assign');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants  = require('../constants/AppConstants');

/* Constants for events */
const ActionTypes  = AppConstants.ActionTypes;
const CHANGE_EVENT = 'change';


/* The immutable postMap object */
let _postMap = Immutable.Map();


const PostStore = assign({}, EventEmitter.prototype, {
  emitChange () { this.emit(CHANGE_EVENT); },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get (id) {
    // TODO: I don't want this to call toJS before returning the post
    return _postMap.toJS()[id];
  },

  getPosts () { return _postMap; }

});


PostStore.dispatchToken = AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.type) {

    /* Add array of posts */
    case ActionTypes.ADD_POSTS:
      
      let newMap = _postMap.withMutations(function (mutableMap) {
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