import React from 'react';
import axios from 'axios'
import User from './User';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      userName: '',
      mobileNo: '',
      password: '',
      formError: false,
      formSuccess: false,
      userNameError: false,
      mobileNoError: false,
      userNameRequired: false,
      passwordRequired: false,
      mobileNoRequired: false,
      submittedUserName: '',
      submittedPassword: '',
      submittedMobileNo: ''
    }
    this.baseUrl =  'http://localhost:5000'
  }

  handleUserName = (evevnt) => {
    this.setState({
      userName: evevnt.target.value,
      formError: false,
      formSuccess: false,
      userNameRequired: false,
      userNameError: false,
    })
  }

  handleMobileNo = (event) => {
    this.setState({
      mobileNo: event.target.value,
      formError: false,
      formSuccess: false,
      userNameError: false,
      mobileNoError: false,
      mobileNoRequired: false
    })
    event.target.value.split().forEach((element) => {
      if(element.charCodeAt(0) <48 || element.charCodeAt(0)>57){
        this.setState({
          mobileNoError: true
        })
      }
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
      formError: false,
      formSuccess: false,
      passwordRequired: false,
      userNameError: false,
    })
  }

  handleAlertBox = () => {
    this.setState({
      formSuccess: false,
      formError: false
    })
  }

  handelSubmit = (event) => {
    event.preventDefault();
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
      userNameError: false,
      userNameRequired: false,
      mobileNoError: false,
      mobileNoRequired: false,
      passwordRequired: false,
      formError: false,
      formSuccess: false
    })

    axios.post(this.baseUrl+ '/addUser', {  userName: this.state.userName, password: this.state.password, mobileNo: this.state.mobileNo })
      .then((response) => {
        if(response.data.status){
          this.setState({
            formSuccess: true,
            submittedPassword: this.state.password,
            submittedUserName: this.state.userName,
            submittedMobileNo: this.state.mobileNo
          })
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

  invalidfedback = (text) => {
    return <div className="invalid-feedback">{text}</div>
  }

  render(){
    let userNameRequired = this.invalidfedback('Username is required');
    let passwordRequired = this.invalidfedback('Password is required');
    let mobileNoRequired = this.invalidfedback('Mobile is required');
    let mobileNoError = this.invalidfedback('Mobiole no should not contain characters');
    let userNameError = this.invalidfedback('Username already exist');
    let formError = <div className="alert alert-dismissible alert-danger">
      Error occured while submitting the form
      <button className="close" onClick={this.handleAlertBox}> 
        <span>&times;</span>
      </button>
    </div>
    let formSucccess =  <div className="alert alert-success alert-dismissible">
      From submitted successfully
      <button className="close" onClick={this.handleAlertBox}>
        <span>&times;</span>
      </button>
    </div>
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            { this.state.formError ? formError: '' }
            { this.state.formSuccess ? formSucccess: '' }
            <form  onSubmit={this.handelSubmit}>
              <div className="from-group">
                <label htmlFor="userName">Useranme</label>
                <input 
                  type="text" 
                  value={this.state.userName} 
                  onChange={this.handleUserName} 
                  className={`form-control ${this.state.userNameError || this.state.userNameRequired ? 'is-invalid' : ''}`}/>
                { this.state.userNameError ? userNameError : '' }
                { this.state.userNameRequired ? userNameRequired : '' }
              </div>
              <div className="form-group">
                <label htmlFor="mobileNo">Mobile no</label>
                <input 
                  type="text"
                  value={this.state.mobileNo}
                  onChange={this.handleMobileNo} 
                  className={`form-control ${this.state.mobileNoError || this.state.mobileNoRequired ? 'is-invalid' : ''}`}/>
                { this.state.mobileNoError ? mobileNoError : '' }
                { this.state.mobileNoRequired ? mobileNoRequired : '' }
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="text" 
                  value={this.state.password} 
                  onChange={this.handlePassword} 
                  className={`form-control ${this.state.passwordRequired || this.state.passwordRequired ? 'is-invalid': ''}`}/>
                { this.state.passwordRequired ? passwordRequired : '' }
              </div>
              <button className="btn btn-success">Submit</button>
            </form>
            <User userName={this.state.submittedUserName} passwod={this.state.submittedPassword} mobileNo={this.state.submittedMobileNo} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;