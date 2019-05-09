import React, { Component } from 'react';

const UserContext = React.createContext({

  user: [],
  tosCheck: [],
  setUser: () => {},
  setTosCheck: () => {}

})

export default UserContext

export class UserProvider extends Component {
  constructor(props){
    super(props)
    const state = { 
      user: [], 
      tosCheck: false 
    }
    this.state = state;
  }
  setUser = user => {
    this.setState({user});
  }
  setTosCheck = tosCheck => {
    this.setState({tosCheck});
  }

  render(){
    const value = {
      user: this.state.user,
      setUser: this.setUser,
      tosCheck: this.state.tosCheck,
      setTosCheck: this.setTosCheck
    }
    return (
      <UserContext.Provider value={value}>
      {this.props.children}
      </UserContext.Provider>
    )
  }
}

  