import React, { useState } from "react";
import SignUpForm from "../components/user/SignUpForm";
import LoginForm from "../components/user/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpSuccess = () => {
        setIsRightPanelActive(false);
    };

    return (
        <main className="flex-shrink-0">
            <div className="login-container pb-5">
                <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                    <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                    <LoginForm />

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>Already have an Account?</p>
                                <button className="ghost" id="signIn" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Don't have an account?</p>
                                <button className="ghost" id="signUp" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;