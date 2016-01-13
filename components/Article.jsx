var React = require("react");
var ReactDOM = require("react-dom");
var Ribbon = require("./Ribbon.jsx");

var Article = React.createClass({

  getInitialState: function() {
    return {
      sections: require("./sections")
    };
  },

  setSectionId: function(name, entry) {
    ReactDOM.findDOMNode(this.refs[name]).setAttribute("id", name);
  },

  componentDidMount: function() {
    // Not sure why this doesn't just work by passing a props.id
    this.sectionMap(this.setSectionId);
  },

  sectionMap: function(mapping) {
    return this.getSectionNames().map(mapping);
  },

  getSectionNames: function() {
    return Object.keys(this.state.sections);
  },

  generateSection: function(name, entry) {
    var Type = this.state.sections[name];
    return <Type key={name} ref={name} name={name} number={entry}/>;
  },

  generateNavItem: function(section, entry) {
    var name = section.props.name;
    var title = section.props.title;
    return <li key={name} data-number={entry}><a href={'#' + name}>{ title }</a></li>;
  },

  render: function() {
    var sections = this.sectionMap(this.generateSection);
    return (<div>
      <Ribbon />
      <div ref="navigation">
        <navigation>
          <ul className="navigation">
          { sections.map(this.generateNavItem) }
          </ul>
        </navigation>
      </div>
      <div ref="sections">{ sections }</div>
    </div>);
  }
});

module.exports = Article;
