import 'design/style';
import 'index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import Counter from './components/Counter';
import Header from './components/header/header';
import Frontpage from './components/frontpage/frontpage';
import User from './components/user/user';
import Score from './components/score/score';
import Footer from './components/footer/footer';

var socket = require('socket.io-client')('http://40.68.251.181:1338');

socket.on('event', function (data) {
  if(data.event) {
      console.log(data.event + ": " + data.message);
  } else {
      console.log("There is a problem:", data);
  }
});

class App extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    )
  }
}


ReactDOM.render((
  <Router history={hashHistory}>
		<Route path="/" component={App}>
      <IndexRoute component={Frontpage} />
      <Route path="user" component={User} />
      <Route path="score" component={Score} />
    </Route>
  </Router>
), document.getElementById('container'));
