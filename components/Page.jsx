var React = require("react");

var Ribbon = require("./Ribbon.jsx");
var Header = require("./Header.jsx");
var Relatives = require("./Relatives.jsx");
var LocaleSwitcher = require("./localized").LocaleSwitcher;
var Navigation = require("./Navigation.jsx");
var Footer = require("./Footer.jsx");

var Page = React.createClass({
  renderCompactContent: function(nav) {
    return (
      <div>
        <Relatives prev={this.props.prev} next={this.props.next} position="before" />
        {this.props.children}
        <Relatives prev={this.props.prev} next={this.props.next} position="after" />
      </div>
    );
  },

  renderCompactRoot: function(nav) {
    return (
      <div>
        {this.props.children}
        {nav}
      </div>
    );
  },

  renderPageContent: function(nav) {
    return (
      <div>
        <LocaleSwitcher/>
        {nav}
        {this.props.children}
      </div>
    );
  },

  render: function() {
    var content;
    var compact = this.props.compact;
    var isRoot = this.props.name === '/';
    var nav = <Navigation compact={compact && !isRoot}/>;

    if (compact) {
      if (isRoot) {
        content = this.renderCompactRoot(nav);
      } else {
        content = this.renderCompactContent(nav);
      }
    } else {
      content = this.renderPageContent(nav);
    }

    return <div><Ribbon/><Header/>{ content }<Footer/></div>;
  }
});

module.exports = Page;
