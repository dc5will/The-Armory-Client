import React, { useEffect, useContext, useState } from "react";
import { Prompt } from "react-router-dom";
import TokenService from "../services/token-service";
import config from "../config";
import PartyContext from "../Contexts/partyContext";
import io from "socket.io-client";
import PartyChat from "../Components/PartyChat/PartyChat";
let socket;

export default function PartyPage(props) {
  const context = useContext(PartyContext);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    getPartyById();

    socket = io("http://localhost:8000");
    socket.emit("join room", props.match.url);

    socket.on("update party", function() {
      getPartyById();
    });

    socket.on("update chat", function(messageData) {
      // const array = context.partyChat;
      // for (let i = 0; i < array.length; i++) {
      //   if (array[i].message_id === messageData.message_id) {
      //     array[i] = messageData;
      //     const date = new Date();
      //     const timeStamp = date.toLocaleTimeString();

      //     array[i].timeStamp = timeStamp;

      //     array[i].edited = true;

      //     context.setPartyChat(array);
      //     return;
      //   }
      // }
      // array.push(messageData);
      // context.setPartyChat(array);
      console.log(messageData);
      context.setPartyChat(messageData);
    });

    socket.on("delete chat message", function(messageId) {
      const array = context.partyChat;
      for (let i = 0; i < array.length; i++) {
        if (array[i].message_id === messageId) {
          array.splice(i, 1);
        }
      }
      context.setPartyChat(array);
    });

    socket.on("left party", party => {
      context.setParty(party);
    });

    return () => {
      leave();
    };
  }, []);


  useEffect(() => {
    getChatLog()
  }, []);

  function getChatLog(){
    return fetch(`${config.API_ENDPOINT}/parties/messages/${props.match.params.partyId}`)
    .then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()))
    .then(respJson => {
      context.setPartyChat(respJson);
      console.log(respJson);
    });
  }

  function sendChatMessage(message) {
    // get new message data from user
    const { user_id, sub } = TokenService.parseJwt(TokenService.getAuthToken());
    const date = new Date();
    const timeStamp = date.toLocaleTimeString();
    const messageData = {
      room_id: props.match.url,
      message,
      user_id,
      sub,
      timeStamp
    };
    socket.emit("chat message", messageData);
  }

  function sendChatEdit(edittedMessage, id) {
    const { user_id, sub } = TokenService.parseJwt(TokenService.getAuthToken());
    const edittedMessageData = {
      room_id: props.match.url,
      message: edittedMessage,
      message_id: id,
      user_id,
      sub
    };
    socket.emit("chat message", edittedMessageData);
  }

  function deleteChatMessage(messageId) {
    const deletedMessage = {
      room_id: props.match.url,
      message_id: messageId
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
      <PartyChat
        sendChatMessage={sendChatMessage}
        sendChatEdit={sendChatEdit}
        deleteChatMessage={deleteChatMessage}
      />
    </div>
  );
}
