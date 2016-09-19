import 'design/style';
import 'index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Header from './components/header/header';
import Frontpage from './components/frontpage/frontpage';
import User from './components/user/user';
import Score from './components/score/score';
import Loan from './components/loan/loan';
import Footer from './components/footer/footer';

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
      <Route path="loan" component={Loan} />
      <Route path="score" component={Score} />
    </Route>
  </Router>
), document.getElementById('container'));
