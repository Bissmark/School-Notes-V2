import { useState } from 'react';
import { signUp } from '../utilities/users-service';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { RiLockPasswordFill } from 'react-icons/ri';
import { CgRename } from 'react-icons/cg';

const SignUpForm = ({ setUser, showSignup, setShowSignup }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
            error: ''
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signUp(userData);
            setUser(user);
        } catch {
            setError('Sign Up Failed - Try Again');
        }
    }

    const disable = userData.password !== userData.confirm;

    return (
        <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
            <div>
                <div className="signup-container">
                    <h1 style={{ marginBottom: '1em' }}>{showSignup ? 'Sign Up Page' : 'Log In Page'}</h1>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className='username'>
                            <CgRename />
                            <input type="text" name="name" value={userData.name} onChange={handleChange} required placeholder='Username' />
                        </div>
                        <div className='email'>
                            <AiOutlineMail />
                            <input type="email" name="email" value={userData.email} onChange={handleChange} required placeholder='Email' />
                        </div>
                        <div className='password'>
                            <RiLockPasswordLine />
                            <input type="password" name="password" value={userData.password} onChange={handleChange} required placeholder='Password' />
                        </div>
                        <div className='password-confirm'>
                            <RiLockPasswordFill />
                            <input type="password" name="confirm" value={userData.confirm} onChange={handleChange} required placeholder='Password Confirm' />
                        </div>
                        <button className='signup-button' type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                    <p>Already have an account and want to login, click <Link onClick={() => setShowSignup(!showSignup)}>here</Link></p>
                </div>
                <p className="error-message">&nbsp;{error}</p>
            </div>
        </IconContext.Provider>
    );
}

export default SignUpForm;