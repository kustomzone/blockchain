const React = require('react');

import '../design/components/counter';

export default class Counter extends React.Component {

    constructor(props) {
      super(props);
      this.state = {currentNumber: 0, target: props.number};
    }

    componentDidMount() {
      this.count(0.01);
    }

    count(multiplactor) {
      if (this.state.currentNumber < this.state.target) {
        this.setState({currentNumber: Math.round(this.state.target*multiplactor)}, function() {
          setTimeout(function() {
            this.count(multiplactor + 0.01);
          }.bind(this), (multiplactor/100) * 2000);
        });
      }
    }

    isDone() {
      return this.state.currentNumber === this.state.target;
    }

    render() {
    	return (
          <div>
            <h2>{this.props.title}</h2>
            <span className={"number" + (this.isDone() ? " done" : "")}>{this.state.currentNumber}</span>
          </div>
    	);
    }
}
