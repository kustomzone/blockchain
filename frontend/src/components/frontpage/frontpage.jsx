const React = require('react');
import 'design/components/hero';

import { Link } from 'react-router'

export default class Frontpage extends React.Component {

  startApplication() {
    console.log("Starting Loan application");
  }

  render() {
    return(
      <div>
        <div className="hero blue">
          <Link to={'user'} onClick={this.startApplication} className="button apply">Apply</Link>
        </div>
        <div className="text">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    )
  }
}
