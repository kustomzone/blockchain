const React = require('react');

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var user = this.props.user;
    return user ? (
      <form className="userform">
        <label>First name</label>
        <input type="text" value={user.first_name} readOnly/>
        <label>Last name</label>
        <input type="text" value={user.last_name} readOnly/>
        <label>SSN</label>
        <input type="text" value={user.fnr} readOnly/>
        <div className="next-button">
          <input className="button next" type="submit" value="Next"></input>
        </div>
      </form>
    ) : null;
  }
}
