import 'design/style';
import 'index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import Counter from './components/Counter';
import Header from './components/header/header';
import Frontpage from './components/frontpage/frontpage';
import Borrow from './components/borrow/borrow';
import Footer from './components/footer/footer';

class App extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}


ReactDOM.render((
  <Router history={hashHistory}>
		<Route path="/" component={App}>
      <IndexRoute component={Frontpage} />
      <Route path="borrow" component={Borrow} />
    </Route>
  </Router>
), document.getElementById('container'));
