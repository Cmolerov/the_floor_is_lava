import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp, login } from "../../services/auth";
// import './Signup-Form.css';

const SignUpForm = ({ authenticated, setAuthenticated, setUser }) => {
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
                setUser(user);
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
            {/* <img className="img__signup" src={process.env.PUBLIC_URL + './images/lava-field.jpg'} alt="lava"  />  */}
            <div className="form__wrapper__signup animate__animated animate__zoomIn">
                <form className="form__signup" onSubmit={onSignUp}>
                    <h1 className="form_title">The Road is Lava</h1>
                    <h2>Signup</h2>
                    <div className="input_wrapper">
                        <label className="input_label">User Name</label>
                        <input
                            className="input"
                            type="text"
                            name="username"
                            onChange={updateUsername}
                            value={username}
                        ></input>
                    </div>
                    <div className="input_wrapper">
                        <label className="input_label">Email</label>
                        <input
                            className="input"
                            type="text"
                            name="email"
                            onChange={updateEmail}
                            value={email}
                        ></input>
                    </div>
                    <div className="input_wrapper">
                        <label className="input_label">Password</label>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            onChange={updatePassword}
                            value={password}
                        ></input>
                    </div>
                    <div className="input_wrapper">
                        <label className="input_label">Confirm Password</label>
                        <input
                            className="input"
                            type="password"
                            name="repeat_password"
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required={true}
                        ></input>
                    </div>
                    <div className="login-form__buttons">
                        <button className="btn-grad" type="submit">
                            Sign Up
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

export default SignUpForm;
