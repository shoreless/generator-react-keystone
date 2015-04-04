var keyMirror = require('keymirror');


module.exports = {
  ActionTypes: keyMirror({
    ADD_POSTS: null,
    CLEAR_POSTS: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),
};