const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants  = require('../constants/AppConstants');

/* Action constants */
const ActionTypes = AppConstants.ActionTypes;

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