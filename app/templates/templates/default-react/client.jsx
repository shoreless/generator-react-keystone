'use strict';

// This is the file that is compiled into the client bundle
// It is self contained as the router links everything else that is needed
// which webpack finds and bundles for us

var React   = require('react');
var Router  = require('react-router');
var routes  = require('./routes');

/* Styles */
// require('styles/_site');

/* Polyfills */
require('whatwg-fetch');
require('es6-promise').polyfill();


var DataActions  = require('./actions/AppDataActionCreators');
// var StateActions = require('./actions/AppStateActionCreators');

document.addEventListener('DOMContentLoaded', function () {
  React.initializeTouchEvents(true)

  console.log('The DOM loaded, running react router to reinitialise');
  // initialReactState is a global variable from the appended script tag
  console.log(window.initialReactState);

  var initialReactState = window.initialReactState;

  // intialise posts from the initial react state from the server
  if (!!initialReactState.posts) {
    DataActions.addPosts(initialReactState.posts);
  }

  // initialise filter from app cookie
  // StateActions.initFiltersFromCookie();


  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    React.render(<Handler />, document.getElementById('app'));
  });
});