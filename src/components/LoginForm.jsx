import { useState } from 'react';
import * as usersService from '../utilities/users-service';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

export default function LoginForm({ setUser, showSignup, setShowSignup }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
    <div>
      <div className='login-container'>
        <h1 style={{ marginBottom: '1em'}}>{showSignup ? 'Sign Up Page' : 'Login Page'}</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className='email'>
            {/* <img src={AiOutlineMail} alt="" /> */}
            <AiOutlineMail />
            <input type="text" name="email" value={credentials.email} onChange={handleChange} required placeholder='Email'/>
          </div>
          <div className='password'>
            <RiLockPasswordLine />
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required placeholder='Password' />
          </div>
          <button className='login-button' type="submit">LOG IN</button>
        </form>
        <p>If you actually want to sign up for the website, click <Link onClick={() => setShowSignup(!showSignup)}>here</Link></p>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
    </IconContext.Provider>
  );
}