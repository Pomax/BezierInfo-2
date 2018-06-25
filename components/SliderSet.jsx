var React = require("react");

class SliderSet extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.options || [];
  }

  render(props) {
    props = props || {};
    var min = props.min || 0;
    var max = props.max || 1;
    var step = props.step || (max-min) / 100;
    var rows = this.options;
    var sliders = rows.map( (v,i) => {
      return (
        <div>
          <label>t<sub>{ i }</sub></label>
          <input
            type="range"
            key={`row${i}`}
            min={min}
            max={max}
            defaultValue={v}
            step={step}
            onChange={e => {
              this.options[i] = e.target.value;
              props.onChange(i, this.options);
            }} />
            <span>{ parseFloat(v).toFixed(2) }</span>
        </div>
      );
    });
    return <div>{ sliders }</div>;
  }

  setOptions(options, labels) {
    this.options = options;
    this.forceUpdate();
  }
}

module.exports = SliderSet;
