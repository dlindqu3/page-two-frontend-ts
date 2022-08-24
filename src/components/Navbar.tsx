import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <>
    <ul className="flex">
    <li className="mr-6">
      <Link className="text-blue-500 hover:text-blue-800" to="/">PageTwo</Link>
    </li>
    <li className="mr-6">
      <Link className="text-blue-500 hover:text-blue-800" to="/saved-books">Saved Books</Link>
    </li>
    <li className="mr-6">
      <Link className="text-blue-500 hover:text-blue-800" to="/about">About</Link>
    </li>
  </ul>
  </> 
  )
}

export default Navbar
