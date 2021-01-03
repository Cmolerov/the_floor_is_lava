import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
// import './Login-Form.css';

const LoginForm = ({ authenticated, setAuthenticated }) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        if (!user.errors) {
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };
    const loginDemo = async (e) => {
        e.preventDefault();
        const user = await login("demo_user@aa.com", "password");
        if (!user.errors) {
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    };

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="wrapper__login">
            <div className="form__wrapper__login">
                <form className="form__login" onSubmit={onLogin}>
                    <div>
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                    </div>
                    <h2>Login</h2>
                    <div>
                        <label htmlFor="email"></label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                        />
                        <button type="submit">Login</button>
                        <button onClick={loginDemo} className="demo-button">
                            Demo User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
