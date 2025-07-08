import React from 'react'
import { Link } from 'react-router-dom'
export default function NavBar() {
    return (
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header">
        <Link className="offcanvas-title nav-link text-white" to="/">
                            <img className='logoIcon' src='/Images/logo.png' alt='logo'  style={{width:"40px"}}/>
                          </Link>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
            <div className="offcanvas-body">
                <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                <li className='nav-item'>
                      </li>
                      <li className="nav-item">
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link text-white" to="/">
                            <img className='homeIcon' src='/Images/home.png' alt='Home' />
                            <p>Главная</p>
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link text-white" to="/about">
                            <img className='homeIcon' src='/Images/catalog.png' alt='Catalog' />
                            <p>Каталог</p>

                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link text-white" to="/contact">
                            <img className='homeIcon' src='/Images/edit.png' alt='Create' />
                            <p>Редактор</p>

                          </Link>
                        </li>
            </ul>
        </div>
  </div>
  )
}
