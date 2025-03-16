import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Main.css";

const Header = () => {
  return (
    <>
        <header className="navbar">
      <div className="logo">
        <h2>🏥Mahevi <span>HealthCare</span></h2>
      </div>
      <ul className="nav-links">
           <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
      </ul>
    </header>
    </>
  )
}

export default Header

