const React = require('react');
import 'design/components/header';

export default class Header extends React.Component {

  render() {
    return(
      <header>
        <div>
          <div className="topbar">
            <span>Mr. John Terry</span>
          </div>
          <h1>Capbank</h1>
          <ul className="menu">
            <li><a href="">Borrow</a></li>
            <li><a href="">Bank</a></li>
            <li><a href="">Save and Invest</a></li>
            <li><a href="">Mortgage</a></li>
          </ul>
        </div>
      </header>
    )
  }
}
