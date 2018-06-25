var React = require("react");
var changelog = require("../changelog");

var Changelog = React.createClass({
  getInitialState: function() {
    return { showContent: false };
  },

  getContent: function() {
    var headers = Object.keys(changelog);
    return headers.map(header => {
      return (
        <div className="period">
          <h3>{header}</h3>
          <ul className="changes">
            {  changelog[header].map(line => <li>{line}</li>)}
          </ul>
        </div>
      );
    });
  },

  toggle: function() {
    console.log("setting state");
    this.setState({
      showContent: !this.state.showContent
    });
  },

  render: function() {
    var content = '';

    if (this.state.showContent) {
      content = this.getContent();
    }

    return (
      <section className="whats-new">
        <h2>What's new?</h2>
        <p>
          This primer is a living document, and so depending on when you last
          look at it, there may be new content. Click the following link to
          expand this section to have a look at what got added, when.
        </p>
        <p className={'click-me'} onClick={this.toggle}>Click here to {this.state.showContent? 'hide' : 'view'} the change log.</p>
        <div>{ content }</div>
      </section>
    );
  }
});

module.exports = Changelog;
