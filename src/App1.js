import React from 'react';
import axios from 'axios';
import User from './User'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userName: '',
      password: '',
      mobileNo: '',
      mobileNoError: false,
      userNameError: false,
      userNameRequired: false,
      passwordRequired: false,
      mobileNoRequired: false,
      formError: false,
      formSuccess: false,
      submittedUserName: '',
      submittedPassword: '',
      submittedMobileNo: ''
    }
    this.baseURL = 'http://localhost:5000'
  }

  handleUsername = (event) => {
    this.setState({
      userName: event.target.value,
      userNameRequired: false,
      userNameError: false
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
      passwordRequired: false,
    })
  }

  handleMobileNo = (event) => {
    this.setState({
      mobileNo: event.target.value,
      mobileNoRequired: false,
      mobileNoError: false
    })
    for(let i=0;i<event.target.value.length;i++){
      if(event.target.value[i].charCodeAt(i) < 48 || event.target.value[i].charCodeAt(i) > 57){
        this.setState({
          mobileNoError: true
        })
      }
    }
  }

  createUser = () => {
    let submitUser = {
      userName: this.state.userName,
      password: this.state.password,
      mobileNo: this.state.mobileNo
    }
    axios.post(this.baseURL + '/addUser', submitUser)
      .then((response) => {
        this.setState({
          formSuccess: true
        })
        this.setState({
          submittedUserName: this.state.userName,
          submittedPassword: this.state.password,
          submittedMobileNo: this.state.mobileNo
        })
      })
      .catch((err) => {
        this.setState({
          formError: true
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.mobileNoError){
      return;
    }
    //write condition for valid also
    if(this.state.userName.length == 0){
      this.setState({
        userNameRequired: true
      })
    }
    if(this.state.password.length == 0){
      this.setState({
        passwordRequired: true
      })
    }
    if(this.state.mobileNo.length == 0){
      this.setState({
        mobileNoRequired: true
      })
      return;
    }

    this.setState({
      userNameRequired: false,
      passwordRequired: false,
      mobileNoRequired: false,
      mobileNoError: false,
      userNameError: false,
      formError: false,
      formSuccess: false
    })
    let verfyUser = {
      userName: this.state.userName,
      password: this.state.password,
      mobileNo: this.state.mobileNo
    }
    axios.post(this.baseURL + '/user', verfyUser)
      .then((response) => {
        if(response.data.status){
          this.createUser()
        }else{
          this.setState({
            userNameError: true
          })
        }
      })
      .catch((err) => {
        this.setState({
          formError: true
        })
      })
  }

  removeAlert = () => {
    this.setState({
      formError: false,
      formSuccess: false
    })
  }
  
  invalidFeedback(text){
    return <div className="invalid-feedback">{text}</div>
  }

  render(){
    let formError = <div className="alert alert-danger alert-dismissible">
      Error occured while submitting the form
      <button className="close" onClick={this.removeAlert}>
        <span>&times;</span>
      </button>
    </div>

    let formSuccess = <div className="alert alert-success alert-dismissible">
      Form Submitted Successfully
      <button className="close" onClick={this.removeAlert}>
        <span>&times;</span>
      </button>
    </div>

    let userNameRequired = this.invalidFeedback('Username Required');
    let passwordRequired = this.invalidFeedback('Password Required')
    let mobileNoRequired = this.invalidFeedback('Mobile No Required');
    let mobileNoError = this.invalidFeedback('MobileNo should be a string');
    let userNameError = this.invalidFeedback('Username already exist');

    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
          { this.state.formError ? formError : '' }
          { this.state.formSuccess ? formSuccess : '' }
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input 
                type="text"
                value={this.state.userName} 
                onChange={this.handleUsername} 
                className={`form-control ${this.state.userNameError || this.state.userNameRequired ? 'is-invalid' : ''}`} />
              { this.state.userNameRequired ? userNameRequired : '' }
              { this.state.userNameError ? userNameError : '' }
            </div>
            <div className="form-group">
              <label htmlFor="mobileNo">Mobile Number</label>
              <input 
                type="text" 
                value={this.state.mobileNo} 
                onChange={this.handleMobileNo} 
                className={`form-control ${this.state.mobileNoError || this.state.mobileNoRequired ? 'is-invalid' : ''}`} />
                { this.state.mobileNoError ? mobileNoError : '' }
                { this.state.mobileNoRequired ? mobileNoRequired : '' }
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="text" 
                value={this.state.password}
                onChange={this.handlePassword} 
                className={`form-control ${this.state.passwordRequired ? 'is-invalid' : ''}`}/>
              { this.state.passwordRequired ? passwordRequired : '' }
            </div>
            <button className="btn btn-success" type="submit">Submit</button>
          </form>
          <User user={{ userName: this.state.submittedUserName, password: this.state.submittedPassword, mobileNo: this.state.submittedMobileNo }} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;