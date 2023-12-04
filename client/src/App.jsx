import React from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './pages/StudentDashboard/Home/Home'
import BookSlot from './pages/StudentDashboard/BookSlot/BookSlot'
import '../src/App.css'
import Assessment from './pages/StudentDashboard/Assessment'
import Login from './pages/Login'
import Game from './pages/Game/Game'
import Profile from './pages/Game/Profile'
import Story from './pages/Game/Story'
import StartGame from './pages/Game/StartGame'
import Que1 from './pages/Game/Que1'
import Done from './pages/Game/Done'
import Recommendation from './pages/Game/Recommendation'

import Pricing from './pages/InstituteDashboard/Pricing'
import Analytics from './pages/InstituteDashboard/Analytics'


export default function App() {
  return (
    
    <>

      <Router>

        <Routes>

          {/* Student Dashboard */}

          <Route path='/' element={ <Home/> } />
          <Route path='/student/' element={ <Home/> } />
          <Route path='/student/home' element={ <Home/> } />
          <Route path='/student/assesment' element={ <Assessment/> } />
          <Route path='/student/BookSlot' element={ <BookSlot/> } />

          <Route path='/student/game' element={ <Game/> } />
          <Route path='/student/game/profile' element={ <Profile/> } />
          <Route path='/student/game/story' element={ <Story/> } />
          <Route path='/student/game/start' element={ <StartGame/> } />

          <Route path='/student/game/Q1' element={ <Que1/> } />

          <Route path='/student/game/end' element={ <StartGame/> } />
          <Route path='/student/game/done' element={ <Done/> } />

          <Route path='/student/recommendation' element={ <Recommendation/> } />

          <Route path='/login' element={ <Login/> } />


          <Route path='/institute/' element={ <Pricing/> } />
          <Route path='/institute/pricing' element={ <Pricing/> } />
          <Route path='/institute/analytics' element={ <Analytics/> } />


        </Routes>
      </Router>

    </>
  )
}
