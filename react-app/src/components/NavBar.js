import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar__grid-container">
        <div className="navbar__home">
          <NavLink to="/" exact={true} activeClassName="active">
          <img className="img__icon" src='./images/favicon.ico' alt="volcano" size="50px"/> 
          </NavLink>
        </div>
          <div className="navbar__grid">
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div className="navbar__grid">
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
          <div className="navbar__grid">
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
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