import React from 'react'
import { Link } from 'react-router-dom'

class Contact extends React.Component {
  render() {
    return (
       <div>
         Contact Page
         <Link to="/contact/email">Email</Link>
         <Link to="/contact/feedback">Feedback</Link>
       </div>
    );
  }
}

export default Contact