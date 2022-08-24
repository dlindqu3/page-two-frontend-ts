import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to='/'>PageTwo</Link>
      <ul>
        <li><Link to='/saved-books'>Saved Books</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
