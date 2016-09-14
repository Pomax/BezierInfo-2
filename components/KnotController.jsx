var React = require('react');

var KnotController = React.createClass({
  getInitialState() {
    return {
      owner: false,
      knots: []
    };
  },
  bindKnots(owner, knots) {
    this.setState({owner, knots});
  },
  render() {
    var type = 'range';
    var min = 0;
    var max = this.state.knots.length;
    var step = 1;
    return (
      <section className='knot-controls'><h2>knot values</h2>{
        this.state.knots.map((value,position) => {
          var props = {
            type, min, max, step,
            value,
            onChange: e => {
              var k = this.state.knots;
              k[position] = e.target.value;
              this.setState({ knots: k }, () => {
                this.state.owner.redraw();
              });
            }
          };
          return <div key={'knot'+position}>{min}<input {...props}/>{max} (= {value})</div>;
        })
      }</section>
    );
  }
});

module.exports = KnotController;
