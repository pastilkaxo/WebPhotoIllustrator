import React from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'

function Header() {
  return (
    <div
      className="d-flex flex-md-column flex-row flex-shrink-0 p-3 bg-success bg-gradient text-white"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '120px', 
        zIndex: 1150, 
      }}
    >
      <ul className="nav nav-pills flex-md-column flex-row mb-auto w-100 justify-content-center align-items-center">
      <li className="nav-item">
          <Link className=" nav-link text-white" to="/">
            <img className='logoIcon' src='/Images/logo.png' alt='logo' />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            <img className='homeIcon' src='/Images/home.png' alt='Home' />
          </Link>
        </li>
        <li>
          <Link className="nav-link text-white" to="/about">
            <img className='homeIcon' src='/Images/catalog.png' alt='Catalog' />
          </Link>
        </li>
        <li>
          <Link className="nav-link text-white" to="/contact">
            <img className='homeIcon' src='/Images/edit.png' alt='Create' />
          </Link>
        </li>
      </ul>
      <img className='accountIcon ms-md-0 ms-auto' src='/Images/login.png' alt='login' data-bs-toggle="modal" data-bs-target="#loginModal" />
      <LoginModal />
    </div>
  )
}

export default Header