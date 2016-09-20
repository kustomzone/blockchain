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
    var user = this.props.user;
    var userData = {
      firstname: user.first_name,
      lastname: user.last_name,
      ssn: user.id
    };
    console.log("Submitting user-data");
    fetch("http://40.68.251.181:1338", {
        	method: 'POST',
        	mode: 'no-cors',
        	redirect: 'follow',
        	headers: new Headers({
        		'Content-Type': 'application/json'
        	}),
          body: JSON.stringify(userData)
    });
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
        <input type="text" value={this.createSSN("" + user.id)} readOnly/>
        <div className="next-button">
          <Link to={'loan'} onClick={this.submitPerson.bind(this)} className="button next">Next</Link>
        </div>
      </div>
    ) : null;
  }
}
