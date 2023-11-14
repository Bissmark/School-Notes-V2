import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./AuthPage.css";

const AuthPage = ({ setUser }) => {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <main>
            { showSignup ? 
                <SignUpForm setUser={setUser} showSignup={showSignup} setShowSignup={setShowSignup} /> 
                : 
                <LoginForm setUser={setUser} showSignup={showSignup} setShowSignup={setShowSignup} /> 
            }
        </main>
    );
}

export default AuthPage;