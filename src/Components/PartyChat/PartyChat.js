import React, { useState } from 'react';
import io from 'socket.io-client';
import UserContext from '../../Contexts/userContext';
import PartyContext from '../../Contexts/partyContext';



export default function PartyChat(props){

    const [message, setMessage] = useState('')

    function generateForm(){
        return(
            <form onSubmit={e => handleSubmit(e)}>
                <input type='text' value={message} onChange={e => handleChatChange(e)}></input>
                <button type='submit'>Send</button>
            </form>
        )
    }

    function handleSubmit(e){
        e.preventDefault();
        props.sendChatMessage(message);
        setMessage('');
    }

    function handleChatChange(e){
        setMessage(e.target.value);
    }

    return(
        <div>
            <p></p>
            {generateForm()}
        </div>
    )
}
