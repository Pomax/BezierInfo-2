var React = require("react");

var Ribbon = require("./Ribbon.jsx");
var Header = require("./Header.jsx");
var LocaleSwitcher = require("./localized").LocaleSwitcher;
var Navigation = require("./Navigation.jsx");
var Footer = require("./Footer.jsx");

var Page = React.createClass({
  renderPageContent: function(nav) {
    return (
      <div>
        <LocaleSwitcher/>
        <Navigation/>
        {this.props.children}
      </div>
    );
  },

  render: function() {
    return <div>
      <Ribbon/>
      <Header/>
      { this.renderPageContent() }
      <Footer/>
    </div>;
  }
});

module.exports = Page;
