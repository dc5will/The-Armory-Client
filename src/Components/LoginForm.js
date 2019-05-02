import React, { useState } from 'react';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

export default function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  function handleLogin (e) {
      e.preventDefault();
      AuthApiService.postLogin({email, password})
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        props.onLoginSuccess();
      })
      .catch (error =>
      setError(error)
      )
  };


  return (
    <div>
      <h2>Login</h2>
      <p>{error.error}</p>
      <form className="LoginForm" onSubmit={e => handleLogin(e)}>
        <label htmlFor="email-input">Email or Username: </label>
        <input
          required
          type='text'
          name="email-input"
          id="email-input"
          placeholder="username@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password-input">Password: </label>
        <input
          required
          type="password"
          name="password-input"
          id="password-input"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-button">
        Login 
        </button>
      </form>
    </div>
  );
}
