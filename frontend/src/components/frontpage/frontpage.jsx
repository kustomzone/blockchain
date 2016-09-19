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
        </div>
      </div>
    )
  }
}
