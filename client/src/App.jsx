import React from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './pages/StudentDashboard/Home/Home'
import BookSlot from './pages/StudentDashboard/BookSlot/BookSlot'
import '../src/App.css'
import Assessment from './pages/StudentDashboard/Assessment'
export default function App() {
  return (
    
    <>


      <Router>

        <Routes>

          {/* Student Dashboard */}

          <Route path='/student/' element={ <Home/> } />
          <Route path='/student/home' element={ <Home/> } />
          <Route path='/student/assesment' element={ <Assessment/> } />
          <Route path='/student/BookSlot' element={ <BookSlot/> } />


        </Routes>
      </Router>

    </>
  )
}