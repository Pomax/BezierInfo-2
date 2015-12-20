var React = require("react");
var ReactDOM = require("react-dom");

var Article = React.createClass({

  getInitialState: function() {
    return {
      sections: require("./sections")
    };
  },

  render: function() {
    var sections = Object.keys(this.state.sections).map((name, entry) => {
      var Type = this.state.sections[name];
      return <Type key={name} number={1+entry} />;
    });
    return <div>{ sections }</div>;
  }
});

module.exports = Article;
