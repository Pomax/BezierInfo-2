var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var sections = require("./sections");
var pageIDs = Object.keys(sections);

var Relatives = React.createClass({
  getInitialState() {
    console.log(this.props);

    var prev = this.props.prev;
    if (prev > -1) {
      prev = {
        to: pageIDs[prev],
        title: sections[pageIDs[prev]].getDefaultProps().title
      };
    } else { prev = false; }

    var next = this.props.next;
    if (next < pageIDs.length) {
      next = {
        to: pageIDs[next],
        title: sections[pageIDs[next]].getDefaultProps().title
      };
    } else { next = false; }

    return {
      prev:  prev,
      next: next
    };
  },

  render: function() {
    if (!this.props.prev && !this.props.next) return null;
    return (
      <div className={"relatives " + this.props.position}>
        { !this.state.next ? null : <Link className="next" to={this.state.next.to}>{this.props.next + ". " + this.state.next.title}</Link> }
        { this.state.prev ? <Link to="/">Index</Link> : null }
        { !this.state.prev ? null : <Link className="prev" to={this.state.prev.to}>{this.props.prev + ". " + this.state.prev.title}</Link> }
      </div>
    );
  }
});

module.exports = Relatives;
