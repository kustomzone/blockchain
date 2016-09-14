const React = require('react');
import {Link} from 'react-router';
import 'design/components/header';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  setUser(name) {
    this.setState({user: name});
  }

  render() {
    return(
      <header>
        <div>
          <div className="topbar">
            <span>{this.state.user ? this.state.user : ""}</span>
          </div>
          <h1><Link to={''}>Capbank</Link></h1>
          <ul className="menu">
            <li><Link to={'bank'}>Bank</Link></li>
            <li><Link to={'save'}>Save and Invest</Link></li>
            <li><Link to={'mortgage'}>Mortgage</Link></li>
          </ul>
        </div>
      </header>
    )
  }
}
