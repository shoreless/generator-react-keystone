require('babel/register');  // super important to require .jsx modules

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone

var keystone = require('keystone')

<% if (includeGuideComments) { %>
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
<% } %>
keystone.init({

	'name': '<%= projectName %>',
	'brand': '<%= projectName %>',
	'static': 'assets',
	'favicon': 'assets/favicon.ico',
	// 'mongo': process.env.MONGOLAB_URI || "mongodb://localhost/<%= projectName %>",
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': '<%= userModel %>',
	'cookie secret': '<%= cookieSecret %>'

});
<% if (includeGuideComments) { %>
// Load your project's Models
<% } %>
keystone.import('models');

<% if (includeGuideComments) { %>
// Load your project's Routes
<% } %>
keystone.set('routes', require('./routes/index.js'));


<% } %><% if (includeGuideComments) { %>
// Configure the navigation bar in Keystone's Admin UI
<% } %>
// TODO: Does this do anything?
// keystone.set('nav', {
// 	<% if (includeBlog) { %>'posts': ['posts', 'post-categories'],
// 	<% } %>'<%= userModelPath %>': '<%= userModelPath %>'
// });


<% if (includeGuideComments) { %>
// Start Keystone to connect to your database and initialise the web server
<% } %>
keystone.start();
