const React  = require('react');
const Router = require('react-router');


/* Router components */
const Route         = Router.Route;
const DefaultRoute  = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;


/* View handlers */
const App       = require('./app');
const IndexView = require('./views/index');



<% if (includeBlog) { %>
  // blog view included
<% } %>
<% if (includeGallery) { %>
  // gallery view included
<% } %>
<% if (includeEnquiries) { %>
  // contact view included
<% } %>

const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute       handler={IndexView} />
  </Route>
);

module.exports = routes;