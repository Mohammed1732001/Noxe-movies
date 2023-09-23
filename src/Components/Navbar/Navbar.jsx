import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ userData, logOut }) {
  return <>
    <nav className="navbar navbar-expand-sm nav-bac navbar-dark bg-transparent fixed-top">
      <div className="container">
        <Link className="navbar-brand " to='/'><h3 className='noxe'>Noxe</h3></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">

          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='movies'>Movies</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='tvShow'>TvShow</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='people'>People</NavLink>
            </li>
          </ul> : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <Link target='_blank' to={'https://www.facebook.com/rahman.osama'}
                className='text-decoration-none '><i className='fab me-2 fa-facebook'></i>
              </Link>
              <Link target='_blank' to={'https://www.linkedin.com/in/mohamed-osos-512964227/'}
                className='text-decoration-none '><i class="fa-brands fa-linkedin mx-1 "></i>
              </Link>
              <Link target='_blank' to={'https://instagram.com/medoosama1?igshid=NGExMmI2YTkyZg=='}
                className='text-decoration-none '><i className='fab mx-2 fa-instagram mx-1'></i>
              </Link>
              <Link target='_blank' to={'https://github.com/Mohammed1732001?tab=repositories'}
                className='text-decoration-none '><i class="fa-brands fa-github mx-1"></i>
              </Link>
              <Link target='_blank' to={"http://twitter.com/https://twitter.com/MohamedOso31713"}
                className='text-decoration-none '><i className='fab mx-2 fa-twitter mx-1 '></i>
              </Link>
              <Link target='_blank' to={"http://youtube.com"}
                className='text-decoration-none '><i className="fab fa-youtube me-2 ms-1 "></i>
              </Link>
            </li>

            {userData === null ? <>
              <li className="nav-item product">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item product">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  to="register">Register
                </NavLink>
              </li></> : <>
              <li className="nav-item product">
                <Link onClick={logOut} className="cursor-pointer nav-link">Logout</Link>
              </li>
            </>}
          </ul>

        </div>
      </div>
    </nav>
  </>
}
