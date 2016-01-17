var React = require('react');
var sections = require('../components/sections');
var Page = require('../components/Page.jsx');

module.exports = function generateSingleSection(name) {
  var Type, entry;

  Object.keys(sections).map((n,idx) => {
    if (name!==n) return;
    entry = idx;
    Type = sections[name];
  });

  var section = <Type key={name} name={name} number={entry}/>,
      content = [section],
      SingleSection = React.createClass({
        render: function() {
          return <Page content={content} compact={true} prev={entry-1} next={entry+1}/>;
        }
      });

  return SingleSection;
};
