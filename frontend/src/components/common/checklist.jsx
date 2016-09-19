const React = require('react');
import 'design/components/checklist';

import ChecklistItem from './checklistitem';

export default class Checklist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Waiting for credit score");
  }

  render() {
    return (
      <ul className="checklist">
        <ChecklistItem text="Get credit score" status={this.props.gotScore ? true : undefined} />
        <ChecklistItem text="Credit score validation" score={this.props.score} manual={this.props.manual} />
      </ul>
    );
  }
}
