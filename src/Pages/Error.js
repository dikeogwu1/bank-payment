import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h3 className='topic'>ERROR PAGE</h3>
      <div className='trans-container'>
        <Link to='/'>
          <button className='transactions'>Back home</button>
        </Link>
      </div>
    </div>
  )
}

export default Error
