const React = require('react');
import 'design/components/user';

import Loading from '../common/loading';
import UserList from './userList';
import UserForm from './userForm';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  setUser(user) {
    this.setState({currentUser:user});
    console.log("Selected user:");
    this.logUser(user);
  }

  componentDidMount() {
    console.log("Fetching users from /users");
    var denne = this;
    fetch('http://localhost:8081/users').then(function(response) {
    	return response.json();
    }).then(function(j) {
      setTimeout(function() {
        for (var i = 0; i < j.length; i++) {
          denne.logUser(j[i]);
        }
        denne.setState({loading: false});
        denne.setState({users: j});
      }, 1000);
    });
  }

  logUser(user) {
    console.log("ID: " + user.id + ", name: " + user.first_name + " " + user.last_name + ", fnr: " + user.fnr);
  }

  render() {
    return(
      <div className="user-data">
        <Loading running={this.state.loading} />
        <UserList users={this.state.users} test={this}/>
        <UserForm user={this.state.currentUser} />
      </div>
    )
  }
}
