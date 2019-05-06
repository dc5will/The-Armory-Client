import React from 'react';
import { GameProvider } from "../../Contexts/gameContext";
import GamePage from './GamePage';

export default function GameContextRoute(props) {
  return (
    <GameProvider>
      <GamePage {...props}/>
    </GameProvider>
  )
}