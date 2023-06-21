import React from 'react';
import Header from './Header/Header';
import FooterBottomText from '../../Components/Global/FooterBottomText/FooterBottomText';
import "./EmailSignIn.scss";
import EmailSignInForm from './SignInForm/EmailSignInForm';

const EmailSignIn = ({userInputEmail,setUserInputEmail}) => {
    return (
        <div id='email_sign_in'>
            <Header/>
            <EmailSignInForm setUserInputEmail={setUserInputEmail} userInputEmail={userInputEmail}/>
            <FooterBottomText/>
        </div>
    );
};

export default EmailSignIn;