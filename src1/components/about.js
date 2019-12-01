import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        About Page
        <Link to="/about/newit">New It</Link>
        <Link to="/about/digital">Digital</Link>
      </div>
    )
  }
}

export default About;