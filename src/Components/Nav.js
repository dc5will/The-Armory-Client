//avatar image, username, account preferences, logout
import React, { useEffect, useContext } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import UserContext from '../Contexts/userContext';

export default function Nav(props) {
  const userContext = useContext(UserContext)
  const userAvatarImg = 'http://www.exiledkingdoms.com/forum/download/file.php?avatar=540_1457933885.jpg'

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
  }, []);

  console.log('nav bar user context: ', userContext);
  
  function onLogout(){
    TokenService.clearAuthToken();
    props.props.history.push('/')
  }
  function generateNavBar(user){
    return(
        <div>
            <img src={user.avatar_url ? user.avatar_url : userAvatarImg} alt='avatar profile pic'></img>
            <h2>{user.username}</h2>
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
