import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../Contexts/userContext';
import TokenService from '../services/token-service';
import config from '../config';
import AuthApiService from '../services/auth-api-service';

export default function UserProfile(props) {
  const [email, setEmail] = useState('');
  const [avatar_url, setAvatar_url] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfrimPass] = useState('');
  const [error, setError] = useState('');
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
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      return !res.ok ? TokenService.clearAuthToken() : res.json();
    });
  }

  function saveChanges(user) {
    console.log(user);
    const { user_id } = TokenService.parseAuthToken();
    return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(user)
    }).then(res => (!res.ok ? setError(res.error) : setError('Profile successfully updated')))
    .then(props.update());
  }

  console.log(props.update)

  function confirmNewPassword(newPass, confirmPass) {
    if (newPass) {
      if (newPass === confirmPass) {
        let user = { email, avatar_url, password: newPass };
        saveChanges(user);
      } else {
        setError('Passwords do not match');
        return; }
    } else {
      let user = { email, avatar_url };
      saveChanges(user); }
  }
  
  function authorizeChanges(e) {
    e.preventDefault();
    console.log(currentEmail, currentPass);
    AuthApiService.postLogin({ email: currentEmail, password: currentPass })
      .then(res => {
        console.log(res);
        confirmNewPassword(newPass, confirmPass);
      })
      .catch(error => setError(error));
  }

  console.log(avatar_url)

  return (
    <main>
      <div className="profileForm">
        <h2>Profile Settings</h2>
        <form className="profile-form" onSubmit={e => authorizeChanges(e)}>
          <p>{error}</p>

          <div className="input-field">
            <p>Choose a new avatar:</p>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKh4dv2ykYZJuJ7vSszU4Vozhm1UtFmKQ_dwIXbQLjBUAb-hVU'} alt="ninja" className="avatars" onClick={e => setAvatar_url(e.target.src)}/>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWdx9y2u5MR9pKaegRIT9WY3kbY6J_dB9qTxO2JIzHAkZCkYjQ'} alt="pikachu" className="avatars" onClick={e => setAvatar_url(e.target.src)}/>
            <img src={'https://s3-us-west-2.amazonaws.com/files.geekgirlauthority.com/wp-content/uploads/2016/05/CuteSprayAvatars-76_OW_JP_400x400-300x300.png'} alt="soldier" className="avatars" onClick={e => setAvatar_url(e.target.src)}/>
            <img src={'http://www.ffxivrealm.com/data/avatars/l/0/826.jpg?1371910121'} alt="ffcacti" className="avatars" onClick={e => setAvatar_url(e.target.src)}/>
            <img src={'http://steamavatars.co/?media_dl=308'} alt="dota" className="avatars" onClick={e => setAvatar_url(e.target.src)}/>
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
              Confirm New Password:{' '}
            </label>
            <input
              id="profile-password-input"
              type="password"
              placeholder="change password"
              value={confirmPass}
              onChange={e => setConfrimPass(e.target.value)}
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
