var React = require('react');

var WeightController = React.createClass({
  getInitialState() {
    return {
      owner: false,
      weights: [],
      closed: false
    };
  },
  bindWeights(owner, weights, closed) {
    this.setState({owner, weights, closed});
  },
  render() {
    var type = 'range';
    var min = 0;
    var max = this.state.weights.length;
    var step = 1;

    var overlap = this.state.closed;
    var baselength = this.state.weights.length;
    if (overlap !== false) {
      baselength -= overlap;
    }

    return (
      <section className='knot-controls'><h2>weight values</h2>{
        this.state.weights.map((value,position) => {
          if (overlap && position >= baselength) {
            return null;
          }
          var props = {
            type, min, max, step,
            value,
            onChange: e => {
              var k = this.state.weights;
              k[position] = e.target.value;
              if (overlap && position < overlap) {
                k[position+baselength] = e.target.value;
              }
              this.setState({ weights: k }, () => {
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

module.exports = WeightController;
