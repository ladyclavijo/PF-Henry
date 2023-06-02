// import { postUser } from "../../redux/actions/index"
import React, { useState } from 'react';
import './FormLanding.css';

function FormLanding() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showSignup, setShowSignup] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    const handleSignupClick = () => {
        setShowSignup(true);
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowSignup(false);
        setShowLogin(true);
    };


    const handleSubmitSignup = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor.
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor.
        }
    };

    const validateForm = () => {
        if (!firstName || !lastName || !username || !email || !password) {
            alert('Please, fill in the missing fields');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Put a valid email');
            return false;
        }

        return true;
    };

    const validateLoginForm = () => {
        if (!email || !password) {
            alert('Please, fill in the missing fields');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Put a valid email');
            return false;
        }

        return true;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div id='Forms'>
            <button id="signup-button" className={showSignup ? 'active' : ''} onClick={handleSignupClick} >
                Sign Up
            </button>
            <button id="login-button" className={showLogin ? 'active' : ''} onClick={handleLoginClick}>
                Log In
            </button>
            {showSignup && (
                <form id="signup-form" onSubmit={handleSubmitSignup}>
                    {/* Sign Up form fields */}
                    <div className='texto-form'>Sign Up for Free</div>
                    <div className="row">
                        <div className="col-12">
                            <div className="Juntos">
                                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='row-1'>
                        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='row-1'>
                        <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='row-1'>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button id="signup-button-action" type="submit">Sign Up</button>
                </form>
            )}
            {showLogin && (
                <form id="login-form" onSubmit={handleSubmitLogin}>
                    {/* Log In form fields */}
                    <div className='texto-form'>Welcome back</div>
                    <div className='row-1'>
                        <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='row-1'>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button id="login-button-action" type="submit">Log In</button>
                </form>
            )}
        </div>
    );
}

export default FormLanding;
