var React = require("react");

var Ribbon = require("./Ribbon.jsx");
var Header = require("./Header.jsx");
var Relatives = require("./Relatives.jsx");
var Navigation = require("./Navigation.jsx");
var Footer = require("./Footer.jsx");

var Page = React.createClass({
  render: function() {
    var nav = <Navigation compact={this.props.compact}/>;
    var orderedContent = [nav].concat();
    if (this.props.compact) {
      orderedContent.splice(0,1);
      orderedContent.push(nav);
    }
    return (
      <div>
        <Ribbon/>
        <Header/>
        {nav}
        <Relatives prev={this.props.prev} next={this.props.next} position="before" />
        {this.props.content}
        <Relatives prev={this.props.prev} next={this.props.next} position="after" />
        <Footer/>
      </div>
    );
  }
});

module.exports = Page;
