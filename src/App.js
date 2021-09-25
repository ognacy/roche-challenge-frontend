import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
import Chat from './Components/Chat';
import Navbar from './Pages/Navbar';
import './App.css';
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

function App() {  
  return (
    <Router>
      <Switch>
        <Route exact path="/chatbot">
          <Chat />
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
