import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/userContext";
import TokenService from "../services/token-service";
import config from "../config";
import AuthApiService from "../services/auth-api-service";

export default function UserProfile(props) {
  const [email, setEmail] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const context = useContext(UserContext);
  const curr = context.user;
  const currentEmail = curr.email;

  useEffect(() => {
    populateContext().then(user => {
      context.setUser(user.userInfo);
    });
  }, []);

  function populateContext() {
    const { user_id } = TokenService.parseAuthToken();
    return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      return !res.ok ? TokenService.clearAuthToken() : res.json();
    });
  }

  // console.log(props.update)
  
  function confirmNewPassword(newPass, confirmPass) {
    if (newPass) {
      if (newPass === confirmPass) {
        let user = { email, avatar_url, password: newPass };
        saveChanges(user);
        setNewPass("");
        setConfirmPass("");
        setCurrentPass("");
      } else {
        setError("Passwords do not match");
        return;
      }
    } else {
      let user = { email, avatar_url };
      console.log(user);
      saveChanges(user);
      setEmail('');
    }
  }
  
  function saveChanges(user) {
    console.log(user);
    const { user_id } = TokenService.parseAuthToken();
    return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(user)
    })
      .then(res =>
        !res.ok ? setError(res.error) : props.update() && props.toggle()
      )
  }

  function authorizeChanges(e) {
    e.preventDefault();
    console.log(currentEmail, currentPass);
    AuthApiService.postLogin({ email: currentEmail, password: currentPass })
      .then(res => {
        // console.log(res.authToken);
        TokenService.saveAuthToken(res.authToken);
        confirmNewPassword(newPass, confirmPass);
      })
      .catch(error => setError(error.error));
  }

  console.log(avatar_url);

  return (
    <main>
      <div className="profileForm">
        <h2>Profile Settings</h2>
        <form className="profile-form" onSubmit={e => authorizeChanges(e)}>
          <p>{error}</p>

          <div className="input-field">
            <p>Choose a new avatar:</p>
            <img
              src={
               require('../resources/ninja.jpg')
              }
              alt="ninja"
              className="avatars"
              onClick={e => setAvatar_url(e.target.src)}
            />
            <img
              src={
                require('../resources/pikachu.png')
              }
              alt="pikachu"
              className="avatars"
              onClick={e => setAvatar_url(e.target.src)}
            />
            <img
              src={
                require('../resources/soldier76.png')
              }
              alt="Soldier 76"
              className="avatars"
              onClick={e => setAvatar_url(e.target.src)}
            />
            <img
              src={
                require('../resources/Cactuar.jpg')
              }
              alt="Cactuar"
              className="avatars"
              onClick={e => setAvatar_url(e.target.src)}
            />
            <img
              src={require('../resources/axe.jpg')}
              alt="dota"
              className="avatars"
              onClick={e => setAvatar_url(e.target.src)}
            />
            <img
              src={require('../resources/TJICON.png')}
              alt="TJ"
              className="avatars"
              onClick={e => setAvatar_url(e.target.src)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="profile-email-input">Email: </label>
            <input
              id="profile-email-input"
              type="email"
              placeholder={curr.email}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="profile-password-input">New Password: </label>
            <input
              id="profile-password-input"
              type="password"
              placeholder="change password"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="profile-password-input">
              Confirm New Password:{" "}
            </label>
            <input
              id="profile-password-input"
              type="password"
              placeholder="change password"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="profile-password-input">Current Password: </label>
            <input
              id="profile-password-input"
              type="password"
              placeholder="current password"
              required
              value={currentPass}
              onChange={e => setCurrentPass(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Update Profile
          </button>
        </form>
      </div>
    </main>
  );
}
