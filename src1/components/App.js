import React, { Component } from 'react';

let counter = (Button) => class extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render(){
    return (
      <div>
        <Button count={this.state.count} incrementCount={this.incrementCount} />
      </div>
    )
  }
}

let button = (props) => {
  return (
    <div>
      {props.count}
      <button className="btn btn-success" onClick={props.incrementCount}>Increase Counter</button>
    </div>
  )
}

let Cbutton = counter(button); 

class App extends Component {
  constructor(){
    super();
    this.state = {
      country: 'bhutan'
    }
  }

  handleCountry = (event) =>{
    this.setState({
      country: event.target.value
    })
  }

  render() { 
    return ( 
      <div className="container">
      {this.state.country}
        <div className="row">
          <div className="col-12">
            <Cbutton />
            <select name="" id="" value={this.state.country} onChange={this.handleCountry} className="form-control"> 
              <option value="india">India</option>
              <option value="china">China</option>
              <option value="pakistan">Pakistan</option>
              <option value="bhutan">Bhutan</option>
            </select>
          </div>
        </div>
      </div>
     );
  }
}
 
export default App;