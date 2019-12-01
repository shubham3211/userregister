import { combineReducers } from 'redux';

const courseReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_COURSE':
      return [...state, action.payload]
    case 'DELETE_COURSE':
      return state.filter((course) => course.courseName != action.payload)
    default:
      return state
  }
}

export default combineReducers({
  course: courseReducer
})