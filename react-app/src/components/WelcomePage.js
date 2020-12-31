import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp, login } from "../services/auth";

export default function WelcomePage({ authenticated, setAuthenticated }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = await signUp(username, email, password);
            if (!user.errors) {
                setAuthenticated(true);
            }
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
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
        <div className="welcomePage">
            <div className="welcomePage_form">
                <form className="welcomePage_form-container">
                    <h1 className="welcomePage_form-title"> Register Form</h1>
                    <input
                        className="form-import"
                        placeholder="   Username"
                        type="text"
                        name="username"
                        onChange={updateUsername}
                        value={username}
                    ></input>
                    <br />

                    <input
                        className="form-import"
                        placeholder="   Email"
                        type="text"
                        name="email"
                        onChange={updateEmail}
                        value={email}
                    ></input>
                    <br />
                    <input
                        className="form-import"
                        placeholder="    Password"
                        type="password"
                        name="password"
                        onChange={updatePassword}
                        value={password}
                    ></input>
                    <br />

                    <input
                        className="form-import"
                        placeholder="   Confimed Password"
                        type="password"
                        name="repeat_password"
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                    ></input>
                    <div className="welcomePage_form-buttons">
                        <button type="submit">Sign Up</button>
                        {/* onClick={logInDemo} */}
                        <button onClick={loginDemo} className="demo-button">
                            Log In as Demo User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
