var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var sections = require("./sections");
var sectionPages = Object.keys(sections);

// LESS is automatically turned into CSS and bundled in:
require("../stylesheets/style.less");

var Navigation = React.createClass({
  generateNavItem: function(name, entry) {
    var Type = sections[name];
    var title = Type.getDefaultProps().title;
    var link = <a href={'#' + name}>{ title }</a>;
    if (this.props.fullNav) { link = <Link to={(name!=="preface") ? name : "/"}>{title}</Link>; }
    return <li key={name} data-number={entry}>{link}</li>;
  },

  generateNav: function() {
    if (this.props.compact) return null;
    return (
      <div ref="navigation">
        <navigation className={ this.props.compact ? "compact" : null }>
          <ul className="navigation">
          { sectionPages.map(this.generateNavItem) }
          </ul>
        </navigation>
      </div>
    );
  },

  render: function() {
    return this.generateNav();
  }
});

module.exports = Navigation;