import React, { Component } from 'react';

const PartyContext = React.createContext({
  party: {},
  setParty: () => {}
});

export default PartyContext;

export class PartyProvider extends Component {
  constructor(props){
    super(props)
    const state = { party: {} };
    this.state = state;
  }
  setParty = party => {
    this.setState({party});
  }

  render(){
    const value = {
      party: this.state.party,
      setParty: this.setParty
    }
    return (
      <PartyContext.Provider value={value}>
        {this.props.children}
      </PartyContext.Provider>
    )
  }
}

  