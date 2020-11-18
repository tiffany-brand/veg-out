import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StoreProvider } from './state/GlobalState';

import './App.css';

import Auth0Test from './views/Auth0Test';
import Challenges from './views/Challenges/Challenges';
import CharacterSelection from './views/CharacterSelection/CharacterSelection';
import Community from './views/Community/Community'
import Home from './views/Home/Home'
import Landing from './views/Auth0Test/Landing';
import PlantLog from './views/PlantLog/PlantLog';
import Register from './views/Register/Register';
import Wrapper from './components/Wrapper/Wrapper';
import PlayerDetails from './views/PlayerDetails/PlayerDetails'

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Wrapper>
          <Switch>
            <Route path="/keith-dev" exact component={PlayerDetails} />
            <Route path="/" exact component={Auth0Test} />
            <Route path="/challenges" exact component={Challenges} />
            <Route path="/character-selection" exact component={CharacterSelection} />
            <Route path="/community" exact component={Community} />
            <Route path="/home" exact component={Home} />
            <Route path="/landing" exact component={Landing} />
            <Route path="/plant-log" exact component={PlantLog} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Wrapper>
      </StoreProvider>
    </div>
  );
}

export default App;
