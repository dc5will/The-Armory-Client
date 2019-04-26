//avatar image, username, account preferences, logout
import React, { useState, useEffect, useContext } from "react";
import config from "../config";
import TokenService from "../services/token-service";
import UserContext from '../Contexts/userContext';

export default function Nav() {
  const userContext = useContext(UserContext)

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

  function generateNavBar(user){
    return(
        <div>
            <img src={user.avatar_url}></img>
            <h2>{user.username}</h2>
        </div>
    )
  }

  return (
    <div>
      {generateNavBar(userContext.user)}
    </div>
  );
}
