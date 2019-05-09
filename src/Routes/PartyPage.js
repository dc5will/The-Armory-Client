import React, { useEffect, useContext, useState } from "react";
import { Prompt } from "react-router-dom";
import TokenService from "../services/token-service";
import config from "../config";
import PartyContext from "../Contexts/partyContext";
import io from "socket.io-client";
import PartyChat from "../Components/PartyChat/PartyChat";
import './partyPage.css'
let socket;

export default function PartyPage(props) {
  const context = useContext(PartyContext);
  const [warning, setWarning] = useState(null);
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    getPartyById();

    socket = io("http://localhost:8000");
    socket.emit("join room", props.match.url);

    socket.on("update party", function(party) {
      context.setParty(party);
    });

    socket.on("update chat", function(messageData) {
      context.setPartyChat(messageData);
    });

    socket.on("delete chat message", function(messages) {
      context.setPartyChat(messages);
    });

    socket.on("left party", party => {
      context.setParty(party);
    });

    //block navigation
    window.addEventListener('beforeunload', (e) => {
      return 'Leaving this page will result in you leaving the squad. Continue?';
    });

    return () => {
      window.removeEventListener('beforeunload', (e) => {
        return 'Leaving this page will result in you leaving the squad. Continue?';
      });
      leave();
    };
  }, []);


  useEffect(() => {
    getChatLog()
  }, []);

  useEffect(() => {
    disableBack()
  },[])

  function disableBack(){
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
  }

  function getChatLog(){
    return fetch(`${config.API_ENDPOINT}/parties/messages/${props.match.params.partyId}`)
    .then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()))
    .then(respJson => {
      context.setPartyChat(respJson);
    });
  }

  function sendChatMessage(message) {
    // get new message data from user
    const { user_id, sub } = TokenService.parseJwt(TokenService.getAuthToken());
    const date = new Date();
    const timeStamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const unix_stamp = date.getTime();
    const messageData = {
      room_id: props.match.url,
      message,
      user_id,
      sub,
      timeStamp,
      unix_stamp
    };
    socket.emit("chat message", messageData);
  }

  function sendChatEdit(edittedMessage, id) {
    const { user_id, sub } = TokenService.parseJwt(TokenService.getAuthToken());
    const date = new Date();
    const timeStamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const unix_stamp = date.getTime();
    const edittedMessageData = {
      room_id: props.match.url,
      message: edittedMessage,
      id,
      user_id,
      sub,
      timeStamp,
      unix_stamp
    };
    socket.emit("edit chat message", edittedMessageData);
  }

  function deleteChatMessage(targetMessage) {
    const deletedMessage = {
      room_id: props.match.url,
      id: targetMessage.id,
      party_id: targetMessage.party_id
    };
    socket.emit("delete chat message", deletedMessage);
  }

  function getPartyById() {
    return fetch(
      `${config.API_ENDPOINT}/parties/${props.match.params.partyId}`, //this will need to change back to props.match when the join party functionality is ready
      {
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      }
    )
      .then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()))
      .then(respJson => {

        context.setParty(respJson);
      });
  }

  function leave() {
    socket.emit("leave party", {
      party_id: context.party.id,
      room_id: props.match.url,
      user_auth: TokenService.getAuthToken(),
      game_id: context.party.game_id
    });
    socket.disconnect();
  }

  function handleLeave() {
    leave();

    // clears party chat context when user leaves a party and joins a new one
    context.setPartyChat([]);

    props.history.replace(`/games/${context.party.game_id}`);
  }

  // Couldnt get prompt to work in a functional component
  // so this function confirms the exit of the party

  function displayWarning() {
    return warning ? (
      <div className='party-warning'>
        <p>Are you sure you want to leave this party?</p>
        <div className='leave-party'>
        <button onClick={e => handleLeave()}>Confirm</button>
        <button onClick={e => setWarning(!warning)}>Cancel</button>
        </div>
      </div>
    ) : (
      <div className='leave-party'>
      <button onClick={e => setWarning(!warning)}>Leave party</button>
      </div>
    );
  }

  function generateReqs(party) {
    return context.party.reqs.map((req, i) => {
      return <li key={i} className='party-reqs'>{req.name}</li>;
    });
  }

  function generateRoles(party) {
    return context.party.spots.map((spot, i) => {
      let roleStr = "";
      const user = spot.filled;
      spot.roles.forEach(role => {
        return(
          role.name ?
            roleStr +=role.name + ' ' :
            roleStr)
      });
      return (
        <li key={i}>
          {user !== null ? user.username : "Available"}
          <p>{roleStr ? " - " : ''}
          {roleStr}{" "}</p>
        </li>
      );
    });
  }

  function expandParty(){
    setExpand(!expand)
  }

  function generateDisplayParty(party) {
    return (
      <>
      <div className='party-info'>
        <h1>{context.party.title}</h1>
        <p>{context.party.description}</p>
      </div>
      <div className = {!expand ? 'party-props' : 'hidden'}>
        <h3>Spots:</h3>
        <ul>{generateRoles(party)}</ul>
        <h3>Requirements:</h3>
        <ul className='reqs-container'>{generateReqs(party)}</ul>
        {displayWarning()}
      </div>
      </>
    );
  }
  
  return (
    <>
      <Prompt
        when={true}
        message="Leaving this page will result in you leaving the squad. Continue?"
      />
      <div className='party-page-container'>
        <div className='display-party-info'>
            {context.party.title ? generateDisplayParty(context.party) : "Loading"}
          <button className='expand-party-info' onClick={e => expandParty()}>{!expand ? '˄' : '˅' }</button>
        </div>
        <PartyChat
          sendChatMessage={sendChatMessage}
          sendChatEdit={sendChatEdit}
          deleteChatMessage={deleteChatMessage}
        />
      </div>
    </>
  );
}
