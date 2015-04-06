// app.jsx is the html rendered in the body, so the server
// will wrap this in doctype, html and all that stuff

const React        = require('react');
const Router       = require('react-router');
const RouteHandler = Router.RouteHandler;


const App = React.createClass({

  render () {
    // console.log('[app.jsx]: render');
    return (
      <div>
        <header></header>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = App;