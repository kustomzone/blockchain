const React = require('react');
import 'design/components/score';

import Loading from '../common/loading';
import Checklist from '../common/checklist';
import { Link } from 'react-router';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({loading: false});
    }.bind(this), 2000);
  }

  checklist() {
    return this.state.loading ? null : (
      <Checklist />
    );
  }

  render() {
    return(
      <div className="score">
        <Loading running={this.state.loading} />
        {this.checklist()}
      </div>
    )
  }
}
