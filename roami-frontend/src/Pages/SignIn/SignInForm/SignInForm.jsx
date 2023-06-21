import React, { useState } from "react";
import "./SignInForm.scss";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ setUserInputEmail, userInputEmail }) => {
    const [isWithEmail, setIsWithEmail] = useState(true);
    const [isEmailRegister, setIsEmailRegister] = useState(true);

    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleNavigate = () => {
        if (!isEmailRegister) {
            navigate("/email-sign-in");
        } else {
            navigate("/sign-up");
        }
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
                                {/* <span
                                    onClick={() => setIsWithEmail(false)}
                                    className="back_text"
                                >
                                    back
                                </span> */}
                            </>
                        ) : (
                            <>
                                <button className="continue_with_google">
                                    <img src="/images/social-icon/google.png" alt="" />
                                    Continue with Google
                                </button>
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
