import React, { useEffect, useRef } from "react"
import { backendHost } from "../../../App"
import { useNavigate } from "react-router-dom"


const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    })

const GoogleAuth = () => {

    const googleButton = useRef(null);

    const navigate = useNavigate();

    const createFakeGoogleWrapper = () => {
        const googleLoginWrapper = document.createElement("div");
        // Or you can simple hide it in CSS rule for custom-google-button
        googleLoginWrapper.style.display = "none";
        googleLoginWrapper.classList.add("custom-google-button");

        // Add the wrapper to body
        document.body.appendChild(googleLoginWrapper);

        // Use GSI javascript api to render the button inside our wrapper
        // You can ignore the properties because this button will not appear
        window.google.accounts.id.renderButton(googleLoginWrapper, {
            type: "icon",
            width: "200",
        });

        const googleLoginWrapperButton =
            googleLoginWrapper.querySelector("div[role=button]");

        return {
            click: () => {
                googleLoginWrapperButton.click();
            },
        };
    };

    useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client'
        const id = "382629192485-jpc38o1bqvlucgj237fisiu3bhgna5o4.apps.googleusercontent.com"
        loadScript(src)
            .then(() => {

                /*global google*/

                google.accounts.id.initialize({
                    client_id: id,
                    callback: handleCredentialResponse,
                })
            })
            .catch(console.error)

        return () => {
            const scriptTag = document.querySelector(`script[src="${src}"]`)
            if (scriptTag) document.body.removeChild(scriptTag)
        }
    }, [])

    const handleGoogleLogin = () => {
        // Use wrapper click to prevent Illegal invocation exception
        const googleButtonWrapper = createFakeGoogleWrapper();
        googleButtonWrapper.click();
        // This will open GSI login and after success you will have
        // a response on googleLoginCallback method previously created
    };

    function handleCredentialResponse(response) {
        if (response.credential) {
            var data = { "auth_token": response.credential }
            console.log(data);
            fetch(`${backendHost}/account/google-sign-up/`,
                {
                    method: "post",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    localStorage.setItem("access", res.access);
                    localStorage.setItem("refresh", res.refresh);
                    navigate("/profile");
                })
        }
    }

    return (
        <div id='google-login-btn'>
            <button id="googleSignInBtn" className="continue_with_google" onClick={handleGoogleLogin}>
                <img src="/images/social-icon/google.png" alt="" />
                Continue with Google
            </button>
            <div ref={googleButton} id='google-ref'></div>
        </div>

    )
}

export default GoogleAuth;