import React from 'react';
import { NavLink } from 'react-router-dom';

import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton';
// import './Nav-Bar.css';

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar__grid-container">
        <div className="navbar__home">
          <NavLink className="navbar__grid-link" to="/" exact={true} activeClassName="active">
            <img className="img__icon" src='./favicon.ico' alt="volcano" size="50px"/> 
          </NavLink>
        </div>
        {authenticated ?
          <div className="navbar__grid">
            <div className="navbar__div__dropdown-container">
            <button className="navbar__button__dashboard">Dashboard<img alt="downarrow" className="navbar__img__down-arrow" src="https://image.flaticon.com/icons/png/512/19/19967.png" width="10" height="10"/></button>
              <div className="navbar__div__dropdown-content">
                <NavLink className="navbar__grid-link-1" to="/" exact={true} activeClassName="active">
                  <span className="navbar__dropdown__ label">Activity Feed</span>
                </NavLink>
                <NavLink className="navbar__grid-link-2" to="/routes" exact={true} activeClassName="active">
                <span className="navbar__dropdown__ label">Routes</span>
                </NavLink>
                <NavLink className="navbar__grid-link-3" to="/routes/new" exact={true} activeClassName="active">
                <span className="navbar__dropdown__ label">Create Route</span>
                </NavLink>
              </div>
            </div>
          </div>
          :
          <div></div>
          }
        {authenticated ? 
          <div className="navbar__logout-button">
            <div>
              <img className="navbar__img__running" src="https://i.gifer.com/7QUq.gif" width="120" height="120" />
            </div>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
          :
          <div className="navbar__logout-button">
            <LoginButton setAuthenticated={setAuthenticated} />
          </div>
      }
      </div>
    </nav>
  );
}

export default NavBar;