// This is the file that is compiled into the client bundle
// It is self contained as the router links everything else that is needed
// which webpack finds and bundles for us

require('./styles/site.scss');

/* Polyfills */
require('whatwg-fetch');

const React       = require('react');
const Router      = require('react-router');
const routes      = require('./routes');
const DataActions = require('./actions/AppDataActionCreators');


document.addEventListener('DOMContentLoaded', function () {
  console.log('The DOM loaded, running react router to reinitialise');

  React.initializeTouchEvents(true);

  // initialReactState is a global variable from the appended script tag
  const initialReactState = window.initialReactState;
  console.log(initialReactState);

  // intialise posts from the initial react state from the server
  if (!!initialReactState.posts) {
    DataActions.addPosts(initialReactState.posts);
  }

  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    React.render(<Handler />, document.getElementById('app'));
  });
});