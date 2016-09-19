const React = require('react');
import 'design/components/score';

import Loading from '../common/loading';
import Checklist from '../common/checklist';
import { Link } from 'react-router';

var socket = require('socket.io-client')('http://40.68.251.181:1338');


export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
    socket.on('event', function (data) {
      if(data.event == "GetCreditScore") {
          console.log("[Event: "+data.event+", Message: "+data.message+"]");
          this.setState({gotScore: true});
      } else if (data.event == "ScoreFinished") {
        console.log("[Event: "+data.event+", Message: "+data.message+"]");
        this.setState({score: data.score, manual: data.manual});
      } else {
          console.log("There is a problem:", data);
      }
    }.bind(this));
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({loading: false});
    }.bind(this), 2000);
  }

  checklist() {
    return this.state.loading ? null : (
      <Checklist gotScore={this.state.gotScore} score={this.state.score} manual={this.state.manual} />
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
