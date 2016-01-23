var React = require('react');
var sections = require('../../components/sections');
var Page = require('../../components/Page.jsx');

module.exports = function generateSingleSection(name) {
  var Type, entry;

  var buildComponent = function(name, content, compact, entry) {
    return React.createClass({
      render: function() {
        return <Page name={name} compact={compact} prev={entry-1} next={entry+1}>{content}</Page>;
      }
    });
  };

  // The root has no "section content".
  if(name===false) {
    var notice = (
      <p className="single-notice">
        This is the one-page-per-section version of the primer, to view
        the regular version, please click <a href='..'>here</a>.
      </p>
    );
    return buildComponent('/',notice, true, -1);
  }

  Object.keys(sections).map((n,idx) => {
    if (name!==n) return;
    entry = idx;
    Type = sections[name];
  });

  var section = <Type key={name} name={name} number={entry}/>,
      content = section,
      SingleSection = buildComponent(name, content, true, entry);

  return SingleSection;
};
