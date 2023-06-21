import React, { useState } from "react";
import "./EmailSignInForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { backendHost } from "../../../App";

const EmailSignInForm = ({ userInputEmail, setUserInputEmail }) => {
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${backendHost}/account/login/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userInputEmail,
                password,
            })
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                if (data.status === false) {
                    setErrorMsg(data.message);
                } else {
                    localStorage.setItem('access', data.access);
                    localStorage.setItem('refresh', data.refresh);
                    setErrorMsg("Success.");
                    navigate("/profile");
                }
            })
        })
    };

    return (
        <div id="email_sign_in_form">
            <div className="container">
                <div className="form_wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="logo">
                            <img src="/images/logo.svg" alt="" />
                        </div>
                        <h1>Glad to have you back!</h1>
                        <span>Login with your password</span>
                        <input
                            type="email"
                            className="input_email"
                            placeholder="Email"
                            value={userInputEmail}
                            required
                            onChange={(e) => setUserInputEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="input_password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p>{errorMsg}</p>
                        <button type="submit" className="submit_btn">
                            continue
                        </button>
                        <button type="button" className="forgot_btn">
                            Forgot password?
                        </button>

                        <br />

                        {/* shape */}
                        <div className="shape1">
                            <img src="/images/shape/location-shape.png" alt="" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailSignInForm;
