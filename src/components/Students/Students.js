import React from 'react'
import AddStudent from './AddStudent'
import StudentList from './StudentList'

function Students() {
  return (
    <React.Fragment>
        <AddStudent/>
        <StudentList/>
    </React.Fragment>
  )
}

export default Students