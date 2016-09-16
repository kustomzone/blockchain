const React = require('react');
import 'design/components/checklist';

import ChecklistItem from './checklistitem';

export default class Checklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditScore: undefined,
      creditScoreValidation: undefined,
    };
  }

  componentDidMount() {
    console.log("Getting credit score");
    setTimeout(function() {
      console.log("Got credit score " + 0.7)
      console.log("Submitting credit score");
      this.setState({creditScore: true});
    }.bind(this), 1000);
    setTimeout(function() {
      var valuation = Math.random();
      if (valuation < 0.5) {
        console.log("Valuation at " + valuation + ", not approved");
      }
      else if (valuation < 0.7) {
        console.log("Valuation at " + valuation + ", approved with warning");
      } else {
        console.log("Valuation at " + valuation + ", approved");
      }
      this.setState({creditScoreValidation: !(valuation < 0.5)});
    }.bind(this), 2000);
  }

  render() {
    return (
      <ul className="checklist">
        <ChecklistItem text="Get credit score" status={this.state.creditScore} />
        <ChecklistItem text="Credit score validation" status={this.state.creditScoreValidation} />
      </ul>
    );
  }
}
