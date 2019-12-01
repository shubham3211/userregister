export const addProduct = (course) => {
  return {
    type: 'ADD_COURSE',
    payload: course
  }
}

export const deleteProduct = (courseName) => {
  return {
    type: 'DELETE_COURSE',
    payload: courseName
  }
}