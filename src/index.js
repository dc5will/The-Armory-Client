import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GamesProvider } from "./Contexts/gamesContext";
import { UserProvider } from "./Contexts/userContext";
import { PartyProvider } from "./Contexts/partyContext";


ReactDOM.render(
  <Router>
    <UserProvider>
      <PartyProvider>
        <GamesProvider>
          <App />
        </GamesProvider>
      </PartyProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
