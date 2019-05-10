import React, { useState } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './Login.css';

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
    <form className="login-form login-reg-form" onSubmit={e => handleLogin(e)}>
      <h2 className="registration-header">Log in</h2>
      <div className="login-form__inputs-container registration-input-container">
        <label htmlFor="email-input">Email or Username
          <input
            required
            type='text'
            name="email-input"
            id="email-input"
            placeholder="demo@email.com"
            onChange={e => setEmail(e.target.value)}
          />
         </label>
        <label htmlFor="password-input">Password
          <input
            required
            type="password"
            name="password-input"
            id="password-input"
            placeholder="Demo1234!"
            onChange={e => setPassword(e.target.value)}
          />
         </label>
      </div>
      <button type="submit" className="green-button login-reg-form__submit-button">
        Log in
      </button>
    </form>
  );
}
