import React, { Component } from 'react';

const GameContext = React.createContext({
  game: {},
  setGame: () => {}
});

export default GameContext;

export class GameProvider extends Component {
  constructor(props){
    super(props)
    const state = { game: {} };
    this.state = state;
  }
  setGame = game => {
    this.setState({game});
  }

  render(){
    const value = {
      game: this.state.game,
      setGame: this.setGame
    }
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    )
  }
}

  