import React from 'react';
import { Link } from 'react-router-dom'

class Digital extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        Digital
        <Link to="/about/digital/id/name">Ui Component</Link>
        <Link to="/about/digital/100/shubham">Digital params</Link>
      </div> 
    );
  }
}

export default Digital