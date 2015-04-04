<% if (includeGuideComments) { %>/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

<% } %>
var keystone     = require('keystone');
// var middleware   = require('./middleware');
var Router       = require('react-router');
var objectAssign = require('object-assign');

var renderingEngine = require('../ReactRouterComponentRenderingEngine.js').createEngine();

var routes         = require('../app/routes.jsx');
var AppDataActions = require('../app/actions/AppDataActionCreators');
var htmlWrap       = require('../app/html');



var api = {
	index: require('./api/index')
};

/* Function that redirects the routing to react-router */
function reactRouter (req, res, next) {
	console.log('[router/index]: ReactRouter');
	Router.run(routes, req.url, function (Handler, state) {

		/* Initialise state for rendering */
		state.settings = objectAssign({}, keystone.app.locals.settings);   // TODO: necessary?
		state.props    = req.props;
		state.htmlWrap = htmlWrap;

		renderingEngine(Handler, state, function (err, html) {
			if (err) {
				console.error(err);
				return res.status(500).send('Ops, something went wrong.. :S');
			}
      AppDataActions.clear();    // TODO: it would be better to find a way to not have to clear this every time
			res.send(html);
		});

	});
}


/* Function that adds props to the flux data stores */
function addPostsToStore (req, res, next) {
	console.log('[router/index]: addPostsToStore');
	var props = req.props;

	/* Populate the stores with the data */
	if (!!props && !!props.posts) AppDataActions.addPosts(props.posts);
	next();
}




// Setup Route Bindings
exports = module.exports = function (app) {
	
	// log request
	app.all('/', function (req, res, next) {
		console.log('[router/index]: Request for .... ' + req.path);
		next();
	});

	// ------------------------
	// 						API
	// ------------------------
	
	/* API endpoints for fetching data from database */
	app.get('/api/', api.index.get);

	/* For each api route above, send the data retrieved from the database as JSON */
	app.get([
		'/api/'
	], function sendJSON (req, res, next) {
		if (!req.props) {
			console.error('[routes/index]: Missing req.props object');
		}
		res.sendJSON(req.props);
	});


	// ------------------------
	// 					Views
	// ------------------------

	/* Route view requests through api to fetch data */
	app.get('/',          api.index.get);
	// app.get('/post/:_id', api.post.get);

	/* For all the routes above, add the data to the stores and route using react-router */
	app.get([
		'/',
		// '/post/:_id'
	], addPostsToStore, reactRouter);




	// Views
	// app.get('/', routes.views.index);

	<% if (includeBlog) { %>
		// app.get('/blog/:category?', routes.views.blog);
		// app.get('/blog/post/:post', routes.views.post);
	<% } %>

	<% if (includeGallery) { %>
		// app.get('/gallery', routes.views.gallery);
	<% } %>

	<% if (includeEnquiries) { %>
		// app.all('/contact', routes.views.contact);
	<% } %>

	<% if (includeGuideComments) { %>
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	<% } %>
};
