import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './Nav-Bar.css';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar__grid-container">
        <div className="navbar__home">
          <NavLink className="navbar__grid-link" to="/" exact={true} activeClassName="active">
          <img className="img__icon" src='./images/favicon.ico' alt="volcano" size="50px"/> 
          </NavLink>
        </div>
          <div className="navbar__grid">
            <NavLink className="navbar__grid-link" to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div className="navbar__grid">
            <NavLink className="navbar__grid-link" to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
        </div>
        <div className="navbar__grid">
            <NavLink className="navbar__grid-link" to="/routes" exact={true} activeClassName="active">
              Routes
            </NavLink>
          </div>
          <div className="navbar__grid">
            <NavLink className="navbar__grid-link" to="/users" exact={true} activeClassName="active">
          
            </NavLink>
          </div>
          <div className="navbar__logout-button">
              <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
      </div>
    </nav>
  );
}

export default NavBar;