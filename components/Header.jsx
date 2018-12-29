var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <h1>A Primer on Bézier Curves</h1>
        <h2>A free, online book for when you really need to know how to do Bézier things.</h2>
        <h4 className="support">(want to help support the book? Head on over to the <a className="support-link" href="https://patreon.com/bezierinfo">Patreon page</a>!)</h4>
      </header>
    );
  }
});

module.exports = Header;
