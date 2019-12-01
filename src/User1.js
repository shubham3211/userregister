import React from 'react';
import axios from 'axios';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
    this.baseUrl = 'http://localhost:5000'
  }

  componentDidMount() {
    axios.get(this.baseUrl + '/user')
      .then((response) => {
        this.setState({
          users: response.data.result
        })
      })
  }

  componentWillUpdate(nextProps){
    console.log('in componentWillUpdate', this.props.user, nextProps.user);
    if(this.props.user.userName != nextProps.user.userName){
      this.setState({
        users: [ ...this.state.users, nextProps.user ]
      }, () => {
        console.log(this.state);
      })
    }
  }

  renderUserList = () => this.state.users.map((user, index) => <tr key={index}>
                                                          <td>{user.userName}</td>
                                                          <td>{user.mobileNo}</td>
                                                        </tr> )

  render() {
    return(
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Mobile no</th>
          </tr>
        </thead>
        <tbody>
          {this.renderUserList()}
        </tbody>
      </table>
    )
  }
}

export default User;