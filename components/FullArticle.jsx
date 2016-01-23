var React = require("react");
var Page = require("./Page.jsx");

var sectionList = require("./sections"),
    sectionMap = function(mapping) {
      return Object.keys(sectionList).map(mapping);
    },
    allSections = sectionMap(function(name, entry) {
      var Type = sectionList[name];
      return <Type key={name} name={name} number={entry} />;
    });

var FullArticle = React.createClass({
  render: function() {
    return <Page>{ allSections }</Page>;
  }
});

module.exports = FullArticle;
