import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
// import './Login-Form.css';

const LoginForm = ({ authenticated, setAuthenticated, setUser }) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        if (!user.errors) {
            setUser(user);
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
            setUser(user);
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    };

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="wrapper__signup">
            <div className="form__wrapper__signup animate__animated animate__zoomIn">
                <form className="form__signup" onSubmit={onLogin}>
                    <div>
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                    </div>
                    <h1 className="form_title">The Road is Lava</h1>
                    <h2>Login</h2>
                    <div className="input_wrapper">
                        <label className="input_label" htmlFor="email">
                            {" "}
                            Email
                        </label>
                        <input
                            className="input"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div className="input_wrapper">
                        <label className="input_label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                        />
                    </div>
                    <div className="login-form__buttons">
                        <button className="btn-grad" type="submit">
                            Login
                        </button>
                        <button onClick={loginDemo} className="btn-grad">
                            Demo User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
