import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GamesProvider } from "./Contexts/gamesContext";
import { GameProvider } from "./Contexts/gameContext";
import { UserProvider } from "./Contexts/userContext";
import { PartyProvider } from "./Contexts/partyContext";


ReactDOM.render(
  <Router>
    <UserProvider>
      <PartyProvider>
        <GamesProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </GamesProvider>
      </PartyProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
