var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  addPosts: function (posts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes['ADD_POSTS'],
      posts: posts
    });
  },

  clear: function () {
    AppDispatcher.handleServerAction({
      type: ActionTypes['CLEAR_POSTS']
    });
  }

};