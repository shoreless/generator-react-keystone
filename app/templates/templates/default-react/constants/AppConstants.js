const keyMirror = require('keymirror');

const constants = {
  ActionTypes: keyMirror({
    ADD_POSTS: null,
    CLEAR_POSTS: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),
}; 

module.exports = constants;