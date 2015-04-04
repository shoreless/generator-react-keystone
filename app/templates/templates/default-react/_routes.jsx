var React         = require('react');
var Router        = require('react-router');

/* Router components */
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* React Components */
var App       = require('./app');
var IndexView = require('./views/index');

<% if (includeBlog) { %>
  // blog view included
<% } %>
<% if (includeGallery) { %>
  // gallery view included
<% } %>
<% if (includeEnquiries) { %>
  // contact view included
<% } %>

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute       handler={IndexView} />
  </Route>
);

module.exports = routes;