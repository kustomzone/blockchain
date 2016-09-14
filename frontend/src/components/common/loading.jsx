const React = require('react');
import 'design/components/loading';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.running ? (
      <div className="loading">
        <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
      </div>
    ) : null;
  }
}
