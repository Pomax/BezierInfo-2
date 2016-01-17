var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      <footer className="copyright">
        This article is © 2011-2016 to me, Mike "Pomax" Kamermans, but the text, code,
        and images are <a href="https://github.com/Pomax/bezierinfo/blob/gh-pages/LICENSE.md">almost
        no rights reserved</a>. Go do something cool with it!
      </footer>
    );
  }

});

module.exports = Footer;