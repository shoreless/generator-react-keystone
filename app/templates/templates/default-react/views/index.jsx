var React = require('react');

var Index = React.createClass({

  render: function () {
    console.log('[index.jsx]: render');
    return (
      <section className="index-view">
        <h1>Thank you for using the keystone-react generator</h1>
      </section>
    );
  }
});

module.exports = Index;