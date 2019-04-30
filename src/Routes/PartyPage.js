import React, { useEffect, useContext, useState } from "react";
import { Prompt } from "react-router-dom";
import TokenService from "../services/token-service";
import config from "../config";
import PartyContext from "../Contexts/partyContext";
import io from "socket.io-client";
import UserContext from "../Contexts/userContext";
import PartyChat from "../Components/PartyChat/PartyChat";
import generate from "@babel/generator";
let socket;

export default function PartyPage(props) {
  const context = useContext(PartyContext);
  const userContext = useContext(UserContext);
  const [warning, setWarning] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getPartyById();

    socket = io("http://localhost:8000");
    socket.emit("join room", props.match.url);

    socket.on("update party", function() {
      getPartyById();
    });

    socket.on("update chat", function(msg) {
      const array = context.partyChat;
      array.push(msg);
      context.setPartyChat(array);
    });

    socket.on("left party", party => {
      context.setParty(party);
    });

    return () => {
      leave();
    };
  }, []);

  // function generateChatLog() {
  //   console.log(messages);
  //   return messages.map(message => {
  //     return <li>{message}</li>;
  //   });
  // }

  function sendChatMessage(message) {
    // get new message data from user
    const {user_id, sub} = TokenService.parseJwt(TokenService.getAuthToken());
    const messageData = {
      room_id: props.match.url,
      message,
      user_id,
      sub
    };
    socket.emit("chat message", messageData);
  }

  function generateChat() {
    return context.partyChat.map(message => {
      return <li key={message.message_id}>{message.sub}: {message.message}</li>
    })
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
      <div>
        <p>Are you sure you want to leave this party?</p>
        <button onClick={e => handleLeave()}>Confirm</button>
        <button onClick={e => setWarning(!warning)}>Cancel</button>
      </div>
    ) : (
      <button onClick={e => setWarning(!warning)}>Leave party</button>
    );
  }

  function generateReqs(party) {
    return context.party.reqs.map((req, i) => {
      return <li key={i}>{req.req_name}</li>;
    });
  }

  function generateRoles(party) {
    return context.party.spots.map((spot, i) => {
      let roleStr = "";
      const user = spot.filled;
      spot.roles.forEach(role => {
        roleStr += role.role_name + " | ";
      });
      return (
        <li key={i}>
          {user !== null ? user.username : "Available"}
          {" - "}
          {roleStr}{" "}
        </li>
      );
    });
  }

  function generateDisplayParty(party) {
    return (
      <div>
        <h1>{context.party.title}</h1>
        <p>{context.party.description}</p>
        <h3>Spots:</h3>
        <ul>{generateRoles(party)}</ul>
        <h3>Requirements:</h3>
        <ul>{generateReqs(party)}</ul>
      </div>
    );
  }

  return (
    <div>
      <div>
        {context.party.title ? generateDisplayParty(context.party) : "Loading"}
      </div>
      {displayWarning()}
      <ul>{generateChat()}</ul>
      <PartyChat sendChatMessage={sendChatMessage} />
    </div>
  );
}
