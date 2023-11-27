import React from 'react'
import Header from '../../components/Header/Header'
import TaskBodyImg from '../../assets/Img/TaskBodyImg.png'
import '../StudentDashboard/Tasks.css'
export default function Tasks() {
  return (
    <div >
      <div>
        <Header/>
      </div>
      <div className="TaskBody">
        <img src={TaskBodyImg} alt="My Image" />
      </div>
    </div>
  )
}
