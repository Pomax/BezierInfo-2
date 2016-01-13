var React = require('react');

var Ribbon = React.createClass({
  getInitialState: function() {
    return {
      href: "http://github.com/pomax/BezierInfo-2"
    };
  },

  render: function() {
    return (<div className="ribbon">
      <img src="images/ribbon.png" alt="This page on GitHub" border={0} useMap={"#githubmap"} width="200px" height="149px"/>
      <map name="githubmap">
        <area shape="poly" coords="30,0, 200,0, 200,114" href={this.state.href} alt="This page on GitHub"/>
      </map>
    </div>);
  }
});

module.exports = Ribbon;