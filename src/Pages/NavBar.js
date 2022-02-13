import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <header>
        <div className='logo-wrapper'>
          <img
            src='https://res.cloudinary.com/dikeogwu1/image/upload/r_100/v1641418646/portfolio%20images/Add_a_heading_vsmeys.png'
            alt='logo'
          />
        </div>
        <h2>Bank the easy way</h2>
        <Link to='/alltrans'>
          <button className='transactions'>All Transactions</button>
        </Link>
      </header>
    </div>
  )
}

export default NavBar
