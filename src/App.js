import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import pages
import AllTrans from './Pages/AllTrans'
import FundTrans from './Pages/FundTrans'
import NavBar from './Pages/NavBar'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<FundTrans />} />
        <Route exact path='/alltrans' element={<AllTrans />} />
      </Routes>
    </Router>
  )
}

export default App
