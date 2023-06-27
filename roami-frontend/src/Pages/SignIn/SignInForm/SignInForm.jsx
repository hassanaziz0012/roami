import React, { useState } from "react";
import "./SignInForm.scss";
import { useNavigate } from "react-router-dom";
import { backendHost } from "../../../App";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const SignInForm = ({ setUserInputEmail, userInputEmail }) => {
    const [isWithEmail, setIsWithEmail] = useState(false);
    const [isEmailRegister, setIsEmailRegister] = useState(false);

    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const isEmailRegistered = () => {
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
        })
        .then(res => {
            res.json().then(data => {
                console.log(data);
                if (data.status === false) {
                    if (data.message === "User does not exist.") {
                        navigate('/sign-up');
                    } else {
                        navigate("/email-sign-in");
                    }
                }
                else {
                    navigate('/email-sign-in');
                }
            })
        })
    }

    const handleNavigate = (e) => {
        e.preventDefault();
        isEmailRegistered();
    };
    return (
        <div id="sign_in_form">
            <div className="container">
                <div className="form_wrapper">
                    <div className="form">
                        <div className="logo">
                            <img src="/images/logo.svg" alt="" />
                        </div>
                        <h1>Welcome!</h1>
                        <span>Login or sign up to continue.</span>

                        {isWithEmail ? (
                            <>
                                <form className="input_group" onSubmit={handleNavigate}>
                                    <input type="email" placeholder="Email" required onChange={(e) => setUserInputEmail(e.target.value)} />
                                    <input type="text" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

                                    <button className="submit_btn">continue</button>
                                </form>
                                <span
                                    onClick={() => setIsWithEmail(false)}
                                    className="back_text"
                                >
                                    back
                                </span>
                            </>
                        ) : (
                            <>
                                <GoogleAuth />
                                <div className="or">
                                    <div className="line"></div> or <div className="line"></div>
                                </div>

                                <button
                                    onClick={() => setIsWithEmail(true)}
                                    className="continue_with_email"
                                >
                                    Continue with Email
                                </button>
                            </>
                        )}

                        {/* shape */}
                        <div className="shape1">
                            <img src="/images/shape/location-shape.png" alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
