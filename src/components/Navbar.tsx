import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <>
    <ul className="flex">
    <li className="flex-1 mr-3 ml-7">
      <Link className="text-blue-500 hover:text-blue-800" to="/">PageTwo</Link>
    </li>
    <li className="flex-1 mr-3">
      <Link className="text-blue-500 hover:text-blue-800" to="/saved-books">Saved Books</Link>
    </li>
    <li className="flex-1 mr-3">
      <Link className="text-blue-500 hover:text-blue-800" to="/about">About</Link>
    </li>
  </ul>
  </> 
  )
}

export default Navbar
