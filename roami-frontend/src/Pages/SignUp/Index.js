import React from 'react';
import Header from './Header/Header';
import FooterBottomText from '../../Components/Global/FooterBottomText/FooterBottomText';
import "./SignUp.scss"
import EmailSignInForm from './SignUpForm/SignUpForm';

const SignUp = ({ userInputEmail, setUserInputEmail }) => {
    return (
        <div id='sign_up'>
            <Header />
            <EmailSignInForm setUserInputEmail={setUserInputEmail} userInputEmail={userInputEmail} />
            <FooterBottomText />
        </div>
    );
};

export default SignUp;