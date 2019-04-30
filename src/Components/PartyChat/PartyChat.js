import React, { useState, useContext } from "react";
import PartyContext from "../../Contexts/partyContext";
import TokenService from "../../services/token-service";

export default function PartyChat(props) {
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState("");
  const [editNewMessage, setEditNewMessage] = useState('');
  const context = useContext(PartyContext);

  function generateForm() {
    return (
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={message}
          onChange={e => handleChatChange(e)}
        />
        <button type="submit">Send</button>
      </form>
    );
  }

  function generateChat() {
    const { sub } = TokenService.parseJwt(TokenService.getAuthToken());
    return (
      <ul>
        {context.partyChat.map(message => {
          return (
            <li
              className="chat-message"
              key={message.message_id}
              id={message.message_id}
            >
              {edit !== message.message_id ? (
                <p>
                  {message.sub}: {message.message}
                  {message.sub === sub ? (
                <button className='edit-chat-button' id={message.message_id} onClick={e => editMessage(e)}>
                  Edit
                </button>
              ) : (
                ""
              )}
                </p>
              ) : (
                <>
                <input
                  value={editNewMessage}
                  id={message.message_id}
                  onChange={e => handleEditChange(e)}
                />
                <button className='save-edit-button' id={message.message_id} onClick={e => handleEditSubmit(e)}>Save</button>
                </>
              )}
              
            </li>
          );
        })}
      </ul>
    );
  }

  function handleEditChange(e) {
      setEditNewMessage(e.target.value)
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    for(let i = 0; i < context.partyChat.length; i++){
        if(context.partyChat[i].message_id === e.target.id){
            context.partyChat[i].message = editNewMessage
        }
    }
    console.log(context.partyChat);
    setEdit('');
  }

  function editMessage(e) {
    console.log(e.target.id);
    setEdit(e.target.id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.sendChatMessage(message);
    setMessage("");
  }

  function handleChatChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div>
      {generateChat()}
      {generateForm()}
    </div>
  );
}
