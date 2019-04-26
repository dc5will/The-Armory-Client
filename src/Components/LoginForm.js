import React, { useState } from 'react';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

export default function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin () {
    try {
      AuthApiService.postLogin({email, password})
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        props.onLoginSuccess();
      })
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form className="LoginForm" onSubmit={e => e.preventDefault()}>
        <label htmlFor="email-input">Email:</label>
        <input
          required
          type="email"
          name="email-input"
          id="email-input"
          placeholder="username@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password-input">Password:</label>
        <input
          required
          type="password"
          name="password-input"
          id="password-input"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-button" onClick={handleLogin}>
        Login 
        </button>
      </form>
    </div>
  );
}
