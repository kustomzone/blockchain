const React = require('react');

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  setUser(user) {
    this.props.test.setUser(user);
  }

  render() {
    if (this.props.users) {
      var denne = this;
      var userList = this.props.users.map(function(user, idx) {
          return (
            <li key={user.id} onClick={denne.setUser.bind(denne, user)}>{user.first_name + " " + user.last_name}</li>
          );
      });
    }
    return this.props.users ? (
      <ul className="userlist">
        {userList}
      </ul>
    ) : null;
  }
}
