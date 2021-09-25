import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Navbar from "./Pages/Navbar";
import SocialFeed from "./Components/SocialFeed";
import Visualizations from "./Components/Visualizations";
import Profile from "./Components/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/social-feed/profile">
          <Profile />
        </Route>
        <Route path="/social-feed">
          <SocialFeed />
        </Route>
        <Route exact path="/chatbot">
          <Chat />
        </Route>
        <Route exact path="/visualizations">
          <Visualizations />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
      <Navbar />
    </Router>
  );
}

export default App;
