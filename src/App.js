import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import pages
import AllTrans from './Pages/AllTrans'
import FundTrans from './Pages/FundTrans'
import NavBar from './Pages/NavBar'
import Error from './Pages/Error'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<FundTrans />} />
        <Route path='/alltrans' element={<AllTrans />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
