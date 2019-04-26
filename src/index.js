import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GamesProvider } from "./Contexts/gamesContext";
import { UserProvider } from "./Contexts/userContext";

ReactDOM.render(
  <Router>
    <UserProvider>
      <GamesProvider>
        <App />
      </GamesProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
