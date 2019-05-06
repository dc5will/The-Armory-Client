//avatar image, username, account preferences, logout
import React, { useEffect, useContext, useState } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import UserContext from '../Contexts/userContext';
import useModal from "./Modal/useModal";
import Modal from "./Modal/Modal";
import UserProfile from "./UserProfile";
import basicAvatar from '../resources/basicAvatar.png'

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

  console.log('nav bar user context: ', userContext);
  
  function onLogout(){
    TokenService.clearAuthToken();
    props.props.history.push('/')
  }

  function updatePage(){
    setUpdate(!update)
}

  function generateNavBar(user){
    return(
        <div>
            <img src={user.avatar_url ? user.avatar_url : basicAvatar} alt='avatar profile pic'></img>
            <h2>{user.username}</h2>
            <button type='button' onClick={e => toggle()}>Edit Profile</button>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              content={<UserProfile update={updatePage} toggle={toggle} />}
            />
            <button onClick={onLogout}>Logout</button>
        </div>
    )
  }

  return (
    <div>
      {generateNavBar(userContext.user)}
    </div>
  );
}
