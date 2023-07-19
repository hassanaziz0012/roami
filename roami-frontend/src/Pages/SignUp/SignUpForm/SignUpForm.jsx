import React, { useState } from "react";
import "./SignUpForm.scss";
import { backendHost } from "../../../App";
import { useNavigate } from "react-router-dom";


const EmailSignInForm = ({ userInputEmail, setUserInputEmail }) => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const login = () => {
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
                    setErrorMsg("Account created successfully! Logging you in...");
                    navigate("/profile");
                }
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, userInputEmail, password);
        fetch(`${backendHost}/account/create/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                first_name: firstName,
                email: userInputEmail,
                password,
            })
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                if (data.status === false) {
                    const errorList = Object.keys(data.message).map(key => data.message[key][0]).join(" ");
                    setErrorMsg(errorList);
                }
                else if (data.status === true) {
                    setErrorMsg("Success.");
                    login();
                }
            })
        })
    };

    return (
        <div id="sign_up_form">
            <div className="container">
                <div className="form_wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="logo">
                            <img src="/images/logo.svg" alt="" />
                        </div>
                        <h1>Can’t wait to have you join us!</h1>

                        <div className="input_group">
                            <input type="text" placeholder="First Name" required  onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Username" required  onChange={(e) => setUsername(e.target.value)} />
                            <input
                                type="email"
                                placeholder="Email"
                                value={userInputEmail}
                                onChange={(e) => setUserInputEmail(e.target.value)}
                                required
                            />
                            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

                            <p className="error">{errorMsg}</p>
                            <button className="submit_btn" type="submit">continue</button>
                        </div>

                        <div className="form_bottom">
                            <input type="checkbox" name="" id="" required />
                            <p>Agree to terms & Conditions to continue</p>
                        </div>
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
