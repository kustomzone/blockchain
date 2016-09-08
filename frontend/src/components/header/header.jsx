const React = require('react');
import {Link} from 'react-router';
import 'design/components/header';

export default class Header extends React.Component {

  render() {
    return(
      <header>
        <div>
          <div className="topbar">
            <span>Mr. John Terry</span>
          </div>
          <h1><Link to={''}>Capbank</Link></h1>
          <ul className="menu">
            <li><Link to={'borrow'}>Borrow</Link></li>
            <li><Link to={'bank'}>Bank</Link></li>
            <li><Link to={'save'}>Save and Invest</Link></li>
            <li><Link to={'mortgage'}>Mortgage</Link></li>
          </ul>
        </div>
      </header>
    )
  }
}
