const React  = require('react');
const Router = require('react-router');


/* Router components */
const Route         = Router.Route;
const DefaultRoute  = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;


/* View handlers */
const App       = require('./app');
const IndexView = require('./views/index');

const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute       handler={IndexView} />
  </Route>
);

module.exports = routes;