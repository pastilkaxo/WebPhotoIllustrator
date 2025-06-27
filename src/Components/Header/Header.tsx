import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
      <div className='header'>
    <nav className="navbar bg-body-tertiary fixed-top">
    <div className="container-fluid">
                  <div className='d-flex justify-content-center align-items-center'>
                  <Link className='aLink' to="/"><img className='homeIcon' src='/Images/home.png' alt='Home' /></Link>
                  <Link className='aLink' to="/about"><img className='homeIcon' src='/Images/catalog.png' alt='Catalog' /></Link>
                  <Link className='aLink' to="/contact"><img className='homeIcon' src='/Images/create.png' alt='Create' /></Link>
                  </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            </ul>
        </div>
        </div>
    </div>
    </nav>
    </div>
  )
}

export default Header