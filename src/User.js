import React from 'react';
import axios from 'axios';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
    this.baseUrl = 'http://localhost:5000';
    axios.get(this.baseUrl + '/users')
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data.result
        })
      })
      .catch((err) => console.log(err))
  }

  componentWillUpdate(nextProps){
    console.log(this.props, nextProps);
    if(this.props.userName != nextProps.userName){
      this.setState({
        users: [...this.state.users, { userName: nextProps.userName, password: nextProps.password, mobileNo: nextProps.mobileNo }]
      })
    }
  }

  renderUserList = (users) => users.map((user, index) => <tr key={index}>
                                                          <td>{user.userName}</td>
                                                          <td>{user.mobileNo}</td>
                                                        </tr>)

  render(){
    return(
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {this.renderUserList(this.state.users)}
        </tbody>
      </table>
    )
  }
}

export default User;