var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <h1>A Primer on Bézier Curves</h1>
        <h2>A free, online book for when you really need to know how to do Bézier things.</h2>
      </header>
    );
  }
});

module.exports = Header;
