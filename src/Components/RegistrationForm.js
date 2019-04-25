import React, { useState } from "react";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";

export default function RegisterForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onRegister() {
    try {
      AuthApiService.postUser({ email, username, password })
      .then(res => {
        console.log(res.email)
        AuthApiService.postLogin({email, password})
        .then(res => {
          TokenService.saveAuthToken(res.saveToken);
        })
        props.onLoginSuccess();
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <main>
      <div className="registrationForm">
        <h2>Register</h2>
        <form className="registration-form" onSubmit={e => e.preventDefault()}>
          <div className="input-field">
            <label htmlFor="registration-name-input">Username: </label>
            <input
              id="registration-name-input"
              type="text"
              placeholder="username"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="registration-email-input">Email: </label>
            <input
              id="registration-email-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="registration-password-input">Password: </label>
            <input
              id="registration-password-input"
              type="password"
              placeholder="password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button" onClick={onRegister}>
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
