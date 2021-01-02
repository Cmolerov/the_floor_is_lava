import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import './WelcomePage.css';

export default function WelcomePage({ authenticated }) {
    if (authenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className="welcomePage">
            <h1 className='welcomePage__header'>The #1 app for avoiding hot lava</h1>
            <NavLink className="welcome__page__sign" to="/login" exact={true} activeClassName="active">
                <p> Sign in</p>
            </NavLink>
            <NavLink className="welcome__page__sign" to="/sign-up" exact={true} activeClassName="active">
                <p> Sign up</p>
            </NavLink>
        </div>
    );
}
