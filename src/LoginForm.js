import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm(props) {

  const {email, setEmail} = useState('');
  const {password, setPassword} = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    //send (email, password) to authenication endpoint
  };

  return(
    <div>
      <h2>Login</h2>
      <form className='LoginForm' onSubmit={e => handleSubmit(e)}>
      <label htmlFor='email-input'>Email:</label>
      <input 
      required 
      type='email' 
      name='email-input' 
      id='email-input'
      placeholder='username@example.com'
      onChange={e => setEmail({ email: e.target.value })}/>
      <label htmlFor='password-input'>Password:</label>
      <input 
      required 
      type='password' 
      name='password-input' 
      id='password-input'
      onChange={e => setPassword({ password: e.target.value })}/>
      <input type='submit' />
      </form>
      <Link to= '/(registration route name)'>Not a member? Sign up here.</Link>
    </div>
  )

}