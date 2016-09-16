const React = require('react');

import { Link } from 'react-router';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  createSSN(ssn) {
    return ssn.substring(0,6) + " " + ssn.substring(6);
  }

  submitPerson() {
    console.log("Submitting user-data");
  }

  render() {
    var user = this.props.user;
    return user ? (
      <div className="userform">
        <label>First name</label>
        <input type="text" value={user.first_name} readOnly/>
        <label>Last name</label>
        <input type="text" value={user.last_name} readOnly/>
        <label>SSN</label>
        <input type="text" value={this.createSSN(user.fnr)} readOnly/>
        <div className="next-button">
          <Link to={'score'} onClick={this.submitPerson} className="button next">Next</Link>
        </div>
      </div>
    ) : null;
  }
}
