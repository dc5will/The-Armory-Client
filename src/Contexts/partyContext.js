import React, { Component } from 'react';

const PartyContext = React.createContext({
  party: {},
  partyChat: [],
  setParty: () => {},
  setPartyChat: () => {}
});

export default PartyContext;

export class PartyProvider extends Component {
  constructor(props){
    super(props)
    const state = { 
      party: {},
      partyChat: []
    };
    this.state = state;
  }
  setParty = party => {
    this.setState({party});
  }
  setPartyChat = partyChat => {
    this.setState({partyChat});
  }

  render(){
    const value = {
      party: this.state.party,
      partyChat: this.state.partyChat,
      setParty: this.setParty,
      setPartyChat: this.setPartyChat
    }
    return (
      <PartyContext.Provider value={value}>
        {this.props.children}
      </PartyContext.Provider>
    )
  }
}

  