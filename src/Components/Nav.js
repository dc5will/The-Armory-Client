//avatar image, username, account preferences, logout
import React, { useEffect, useContext, useState } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import UserContext from '../Contexts/userContext';
import useModal from "./Modal/useModal";
import Modal from "./Modal/Modal";
import UserProfile from "./UserProfile";
import basicAvatar from '../resources/basicAvatar.png';
import SAPNG from '../resources/SAPNG.png';
import './nav.css'

export default function Nav(props) {
  const userContext = useContext(UserContext)
  const { isShowing, toggle } = useModal();
  const [update, setUpdate] = useState(false)

  function getUserInfo() {
    const { user_id } = TokenService.parseAuthToken();
    return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        return !res.ok ? TokenService.clearAuthToken() : res.json();
      });
  }


  useEffect(() => {
    getUserInfo().then(user => {
      userContext.setUser(user.userInfo);
    });
  }, [update]);

  function onLogout(){
    TokenService.clearAuthToken();
    props.history.push('/')
  }

  function updatePage(){
    setUpdate(!update)
}

  function generateNavBar(user){
    return(
        <div className='nav-content-container'>
            <img className='avatar-nav-main' src={user.avatar_url ? user.avatar_url : basicAvatar} alt='avatar profile pic' onClick={e => toggle()}></img>
            <h2>{user.username}</h2>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              content={<UserProfile update={updatePage} toggle={toggle} />}
            />
            <button className='nav-button green-button-flat' onClick={onLogout}>Logout</button>
        </div>
    )
  }

  return (
    <div className='mobile-nav-container'>
      <div className='nav-container'>
        {generateNavBar(userContext.user)}
      </div>
      <div className='nav-icon-bar'>
        <img className='logo' src={SAPNG} alt='Squad Armory Logo' onClick={e => props.history.push('/')}/>
      </div>
    </div>
  );
}
