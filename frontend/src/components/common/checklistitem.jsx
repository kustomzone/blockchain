const React = require('react');

export default class ChecklistItem extends React.Component {
  constructor(props) {
    super(props);
  }

  determineClasses() {
    if (this.props.manual) {
      return "checkpoint fa fa-exclamation-triangle fa-fw";
    }
    if (this.props.status === false) {
      return "checkpoint fa fa-times fa-fw";
    } else if (this.props.status === true || this.props.score) {
      return "checkpoint fa fa-check fa-fw";
    } else {
      return "checkpoint fa fa-spinner fa-pulse fa-spin fa-fw";
    }
  }

  render() {
    return (

      <li className="checklist-item">{this.props.text} <span className={this.determineClasses()} /><span className="checkpoint">{this.props.score ? this.props.score : ""}</span></li>
    );
  }
}
