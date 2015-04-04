// app.jsx is the html rendered in the body, so the server
// will wrap this in doctype, html and all that stuff

var React        = require('react');
var Router       = require('react-router');

/* React components */
var RouteHandler = Router.RouteHandler;


var App = React.createClass({

  render: function() {
    console.log('[app.jsx]: render');
    return (
      <div>
        <header></header>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;