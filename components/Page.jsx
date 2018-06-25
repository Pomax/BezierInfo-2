var React = require("react");

var Ribbon = require("./Ribbon.jsx");
var Header = require("./Header.jsx");
var Changelog = require("./Changelog.jsx");
var LocaleSwitcher = require("./localized").LocaleSwitcher;
var Navigation = require("./Navigation.jsx");
var Footer = require("./Footer.jsx");

var Page = React.createClass({
  render: function() {
    return <div>
      <Ribbon/>
      <Header/>
      { this.renderPageContent() }
      <Footer/>
    </div>;
  },

  renderPageContent: function(nav) {
    return (
      <div>
        <LocaleSwitcher/>
        <Navigation/>
        <Changelog/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Page;
