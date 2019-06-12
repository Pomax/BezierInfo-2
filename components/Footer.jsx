var React = require('react');

var Footer = React.createClass({

  render: function() {
    var copyright = "© 2011-2018";
    return (
      <div>
        <footer className="copyright">
          This article is {copyright} to me, Mike "Pomax" Kamermans, but the text, code,
          and images are <a href="https://github.com/Pomax/bezierinfo/tree/master/LICENSE.md">almost
          no rights reserved</a>. Go do something cool with it!
        </footer>

        <footer className="print copyright">
          Content printed from https://pomax.github.io/bezierinfo, {copyright} Mike "Pomax" Kamermans.
        </footer>
      </div>
    );
  }

});

module.exports = Footer;