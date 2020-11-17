import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './views/Auth0Test/Landing';
import Auth0Test from './views/Auth0Test';
import Wrapper from './components/Wrapper/Wrapper';
import Challenges from './views/Challenges/Challenges';
import CharacterSelection from './views/CharacterSelection/CharacterSelection';
import Home from './views/Home/Home'
import Community from './views/Community/Community'
import PlantLog from './views/PlantLog/PlantLog';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Switch>
          <Route path="/" exact component={Auth0Test} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/home" exact component={Home} />
          <Route path="/challenges" exact component={Challenges} />
          <Route path="/community" exact component={Community} />
          <Route path="/plant-log" exact component={PlantLog} />
          <Route path="/character-selection" exact component={CharacterSelection} />
        </Switch>
      </Wrapper>
    </div>
  );
}

export default App;
