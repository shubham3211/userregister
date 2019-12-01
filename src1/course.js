import React from 'react'
import { connect } from 'react-redux';
import * as CourseAction from './redux-action'

class Course extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addCourse({courseName: this.refs.courseName.value, coursePrice: this.refs.coursePrice.value});
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.deleteCourse(this.refs.dCourseName.value);
  } 

  renderCourse = (courses) => courses.map((course, index) => <tr key={index}>
    <td>{course.courseName}</td>
    <td>{course.coursePrice}</td>
  </tr> )

  render(){
    console.log(this.props.course);
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="courseName">Course Name</label>
                <input type="text" ref="courseName" className="form-control"/>
              </div>
              <div className="form-grop">
                <label htmlFor="coursePrice">Course Price</label>
                <input type="text" ref="coursePrice" className="form-control"/>
              </div>
              <button className="btn btn-success" type="submit">Submit</button>
            </form>
            <h1>Delete Product</h1>
            <form onSubmit={this.handleDelete}>
              <label htmlFor="dCourseName">Course Name</label>
              <input type="text" ref="dCourseName" className="form-control"/>
              <button className="btn btn-success" type="submit">Submit</button>
            </form>
            <table className="table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course Price</th>
                </tr>
              </thead>
              <tbody>
                {this.renderCourse(this.props.course)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    course: state.course
  }
}

let mapDispatchToPops = (dispatch) => {
  return {
    addCourse: (course) => dispatch(CourseAction.addProduct(course)),
    deleteCourse: (courseName) => dispatch(CourseAction.deleteProduct(courseName))
  }
}

export default connect(mapStateToProps, mapDispatchToPops)(Course);