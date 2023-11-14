import { Component } from 'react';
import { signUp } from '../utilities/users-service';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { RiLockPasswordFill } from 'react-icons/ri';
import { CgRename } from 'react-icons/cg';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
      <div>
        <div className="signup-container">
          <h1 style={{ marginBottom: '1em'}}>{this.props.showSignup ? 'Sign Up Page' : 'Log In Page'}</h1>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className='username'>
              <CgRename />
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required placeholder='Username' />
            </div>
            <div className='email'>
              <AiOutlineMail />
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required placeholder='Email'/>
            </div>
            <div className='password'>
              <RiLockPasswordLine />
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required placeholder='Password'/>
            </div>
            <div className='password-confirm'>
              <RiLockPasswordFill />
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required placeholder='Password Confirm' />
            </div>
            <button className='signup-button' type="submit" disabled={disable}>SIGN UP</button>
          </form>
          <p>Already have an account and want to login, click <Link onClick={() => this.props.setShowSignup(!this.props.showSignup)}>here</Link></p>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
      </IconContext.Provider>
    );
  }
}