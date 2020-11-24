import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StoreProvider } from './state/GlobalState';

import './App.css';

import Login from './views/Login/Login';
import Challenges from './views/Challenges/Challenges';
import ChallengeDetail from './views/Challenges/ChallengeDetail';
import Community from './views/Community/Community'
import Home from './views/Home/Home'
import Landing from './views/Login/Landing';
import PlantLog from './views/PlantLog/PlantLog';
import Register from './views/Register/Register';
import Wrapper from './components/Wrapper/Wrapper';
import PlayerDetails from './views/PlayerDetails/PlayerDetails'
import Winner from './views/Winner/Winner';
// import GameBoard from './views/GameBoard/GameBoard';
import Menu from './components/Menu/Menu';
import NewView from './views/Test/TestNewView';

function App() {
  return (
    <div className="App">
      {/* <div className="app-container"> */}
        <StoreProvider>
          <Wrapper>
            <Switch>
              <Route path="/keith-dev" exact component={PlayerDetails} />
              <Route path="/" exact component={Login} />
              <Route path="/challenges" exact component={Challenges} />
              <Route path="/challengeDetail" exact component={ChallengeDetail} />
              <Route path="/community" exact component={Community} />
              <Route path="/home" exact component={Home} />
              <Route path="/landing" exact component={Landing} />
              <Route path="/plant-log" exact component={PlantLog} />
              <Route path="/register" exact component={Register} />
              <Route path="/winner" exact component={Winner} />
              <Route path="/test" exact component={NewView} />
            </Switch>
            {/* <Menu /> */}
          </Wrapper>
        </StoreProvider>
        {/* </div> */}
    </div>
  );
}

export default App;
