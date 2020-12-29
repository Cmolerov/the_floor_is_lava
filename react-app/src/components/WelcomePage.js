import React from "react";

export default function WelcomePage() {
    return (
        <div className="welcomePage">
            <div className="welcomePage_form">
                <form>
                    <h1 className="welcomePage_form-title">Register Form</h1>
                    <label className="welcomePage_form-input">
                        Email
                        <input />
                    </label>
                    <br />
                    <label className="welcomePage_form-input">
                        Name
                        <input />
                    </label>
                    <br/>
                    <label className="welcomePage_form-input">
                        Password
                        <input />
                    </label>
                    <br />
                    <label className="welcomePage_form-input">
                        Confirmed Password
                        <input />
                    </label>
                    <button className="welcomePage_form-submit" type="submit">
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
}
