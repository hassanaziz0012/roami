import React from 'react';
import FooterBottomText from '../../Components/Global/FooterBottomText/FooterBottomText';
import "./SignIn.scss";
import Header from './Header/Header';
import SignInForm from './SignInForm/SignInForm';

const SignIn = ({setUserInputEmail,userInputEmail}) => {
    return (
        <div id='sign_in'>
            <Header/>
            <SignInForm setUserInputEmail={setUserInputEmail} userInputEmail={userInputEmail}/>
           <FooterBottomText/> 
        </div>
    );
};

export default SignIn;